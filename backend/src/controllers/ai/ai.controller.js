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
            SELECT title, description
            FROM grievances
            WHERE id=$1
            `,
      [id],
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        message: "Grievance not found.",
      });
    }

    const grievance = result.rows[0];

    const suggestion = await generateResolutionSuggestion(
      grievance.title,
      grievance.description,
    );

    res.json(suggestion);
  } catch (err) {
    res.status(500).json({
      message: err.message,
    });
  }
};

export const reAnalyzeGrievance = async (req, res) => {
  try {
    const { id } = req.params;

    const grievanceResult = await pool.query(
      `
      SELECT
        g.id,
        g.user_id,
        g.title,
        g.description
      FROM grievances g
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

    const analysis = await analyzeGrievance(
      grievance.title,
      grievance.description,
    );

    await pool.query(
      `
      DELETE FROM grievance_ai_analysis
      WHERE grievance_id=$1
      `,
      [id],
    );

    await saveAIAnalysis(grievance.id, grievance.user_id, analysis);

    await updateTrustScore(grievance.user_id, analysis);

    return res.json({
      success: true,
      message: "AI analysis updated successfully.",
      data: analysis,
    });
  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};
