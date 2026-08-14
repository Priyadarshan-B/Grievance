import pool from "../../config/db.js";
import { generateResolutionSuggestion } from "../../services/ai/resolution.service.js";
import { analyzeGrievance } from "../../services/ai/ai.service.js";
import { saveAIAnalysis } from "../../services/ai/saveAIAnalysis.js";
import { updateTrustScore } from "../../services/ai/trust.service.js";

export const getAISuggestion = async (req, res) => {
  try {
    const { id } = req.params;

    const result = await pool.query(
      `
      SELECT
        title,
        description
      FROM grievances
      WHERE id = $1
      `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found.",
      });
    }

    const grievance = result.rows[0];

    const suggestion = await generateResolutionSuggestion(
      grievance.title,
      grievance.description,
    );

    return res.json({
      success: true,
      data: suggestion,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

export const reAnalyzeGrievance = async (req, res) => {
  try {
    const { id } = req.params;

    // Get Grievance 

    const grievanceResult = await pool.query(
      `
      SELECT
        g.id,
        g.user_id,
        g.title,
        g.description,
        u.user_type
      FROM grievances g
      JOIN users u
        ON u.id = g.user_id
      WHERE g.id = $1
      `,
      [id],
    );

    if (grievanceResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Grievance not found.",
      });
    }

    const grievance = grievanceResult.rows[0];

    // ==========================================
    // Validate User Type
    // ==========================================

    const validUserTypes = ["student", "faculty"];

    if (!validUserTypes.includes(grievance.user_type)) {
      return res.status(400).json({
        success: false,
        message: "Invalid grievance user type.",
      });
    }

    // ==========================================
    // Fetch Allowed Departments
    // student -> student + both
    // faculty -> faculty + both
    // ==========================================

    const departmentResult = await pool.query(
      `
      SELECT
        id,
        department_name,
        department_code,
        department_type
      FROM departments
      WHERE department_type IN ($1, 'both')
        AND is_active = 1
      ORDER BY department_name
      `,
      [grievance.user_type],
    );

    const departments = departmentResult.rows;

    if (departments.length === 0) {
      return res.status(400).json({
        success: false,
        message: `No active departments available for ${grievance.user_type} users.`,
      });
    }

    console.log(
      `========== RE-ANALYSIS: ${grievance.user_type.toUpperCase()} DEPARTMENTS ==========`,
    );

    console.log(
      departments.map((d) => ({
        id: d.id,
        name: d.department_name,
        code: d.department_code,
        type: d.department_type,
      })),
    );

    // ==========================================
    // AI Re-Analysis
    // ==========================================

    const analysis = await analyzeGrievance(
      grievance.title,
      grievance.description,
      departments.map((d) => ({
        name: d.department_name,
        code: d.department_code,
      })),
    );

    console.log("========== AI RE-ANALYSIS ==========");
    console.log(JSON.stringify(analysis, null, 2));

    // ==========================================
    // Validate AI Department
    // ==========================================

    const aiDepartmentCode = (analysis.department_code || "")
      .trim()
      .toLowerCase();

    const selectedDepartment = departments.find(
      (d) => d.department_code.trim().toLowerCase() === aiDepartmentCode,
    );

    if (!selectedDepartment) {
      console.warn(`Unknown AI Department Code: ${analysis.department_code}`);

      return res.status(400).json({
        success: false,
        message: "AI could not determine a valid department.",
      });
    }

    // ==========================================
    // Update Grievance
    // ==========================================

    await pool.query(
      `
      UPDATE grievances
      SET
        department_id = $1,
        priority = $2,
        updated_at = NOW()
      WHERE id = $3
      `,
      [selectedDepartment.id, analysis.priority.toLowerCase(), id],
    );

    await pool.query(
      `
      DELETE FROM grievance_ai_analysis
      WHERE grievance_id = $1
      `,
      [id],
    );

    // Save New AI Analysis
    await saveAIAnalysis(grievance.id, grievance.user_id, analysis);

    // Update Trust Score
    await updateTrustScore(grievance.user_id, analysis);

    return res.json({
      success: true,
      message: "AI analysis updated successfully.",
      data: {
        ...analysis,
        department_id: selectedDepartment.id,
      },
    });
  } catch (err) {
    console.error("Re-analysis error:", err);

    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
