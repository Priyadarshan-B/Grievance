import pool from "../../config/db.js";
import { analyzeGrievance } from "../ai/ai.service.js";
import { saveAIAnalysis } from "../ai/saveAIAnalysis.js";
import { updateTrustScore } from "../ai/trust.service.js";
import { checkDuplicateGrievance } from "../ai/duplicate.service.js";

// Generate Grievance Number
const generateGrievanceNumber = async () => {
  const year = new Date().getFullYear();

  const result = await pool.query(
    `
        SELECT grievance_no
        FROM grievances
        ORDER BY submitted_at DESC
        LIMIT 1
        `,
  );

  let sequence = 1;

  if (result.rows.length > 0) {
    const lastNo = result.rows[0].grievance_no;
    sequence = parseInt(lastNo.slice(-4)) + 1;
  }

  return `GRV-${year}-${String(sequence).padStart(4, "0")}`;
};

// Create
export const createGrievanceService = async (data, userId) => {
  const { title, description } = data;

  // ------------------------------------
  // Generate Grievance Number
  // ------------------------------------

  const grievance_no = await generateGrievanceNumber();

  // ------------------------------------
  // Duplicate Check
  // ------------------------------------

  const duplicate = await checkDuplicateGrievance(userId, title, description);

  if (duplicate.duplicate === true && Number(duplicate.similarity) >= 95) {
    throw new Error(
      `Similar grievance already exists (${duplicate.grievance_no}).`,
    );
  }

  // ------------------------------------
  // Fetch Active Departments
  // ------------------------------------

  const departmentResult = await pool.query(
    `
    SELECT
      id,
      department_name
    FROM departments
    WHERE is_active = 1
    ORDER BY department_name
    `,
  );

  const departments = departmentResult.rows;

  if (departments.length === 0) {
    throw new Error("No active departments found.");
  }

  // ------------------------------------
  // AI Analysis
  // ------------------------------------

  const analysis = await analyzeGrievance(
    title,
    description,
    departments.map((d) => d.department_name),
  );

  console.log("========== GEMINI ANALYSIS ==========");
  console.log(JSON.stringify(analysis, null, 2));

  // ------------------------------------
  // Match Department
  // ------------------------------------

  const aiDepartment = (analysis.department || "").trim().toLowerCase();

  let selectedDepartment = departments.find(
    (d) => d.department_name.trim().toLowerCase() === aiDepartment,
  );

  if (!selectedDepartment) {
    console.warn(`Unknown AI Department: ${analysis.department}`);

    throw new Error("AI could not determine a valid department.");
  }

  const department_id = selectedDepartment.id;

  // ------------------------------------
  // Save Grievance
  // ------------------------------------

  const grievanceResult = await pool.query(
    `
    INSERT INTO grievances
    (
      grievance_no,
      user_id,
      department_id,
      title,
      description,
      priority
    )
    VALUES
    ($1,$2,$3,$4,$5,$6)
    RETURNING *
    `,
    [
      grievance_no,
      userId,
      department_id,
      title,
      description,
      analysis.priority.toLowerCase(),
    ],
  );

  const grievance = grievanceResult.rows[0];

  // ------------------------------------
  // Save AI Analysis
  // ------------------------------------

  await saveAIAnalysis(grievance.id, userId, analysis);

  // ------------------------------------
  // Update Trust Score
  // ------------------------------------

  const trustScore = await updateTrustScore(userId, analysis);

  return {
    grievance,
    ai: analysis,
    trustScore,
  };
};
export const getGrievancesService = async (user) => {
  // Super Admin
  if (user.role === "super_admin") {
    const result = await pool.query(`
      SELECT
        g.*,

        u.full_name AS student_name,
        d.department_name,

        ai.department,
        ai.department_confidence,
        ai.department_reason,

        ai.priority,
        ai.priority_reason,

        ai.severity_score,

        ai.summary,
        ai.sentiment,
        ai.verdict,

        ai.spam_score,
        ai.abuse_score,
        ai.legitimacy_score,

        ai.suggested_resolution

      FROM grievances g

      JOIN users u
        ON g.user_id = u.id

      JOIN departments d
        ON g.department_id = d.id

      LEFT JOIN grievance_ai_analysis ai
        ON ai.grievance_id = g.id

      WHERE g.is_active = 1

      ORDER BY
        ai.severity_score DESC NULLS LAST,
        g.submitted_at DESC
    `);

    return result.rows;
  }

  // Department Admin
  if (user.role === "dept_admin") {
    const department = await pool.query(
      `
      SELECT department_id
      FROM department_admins
      WHERE user_id=$1
      AND is_active=1
      `,
      [user.id],
    );

    if (department.rows.length === 0) {
      return [];
    }

    const departmentId = department.rows[0].department_id;

    const result = await pool.query(
      `
      SELECT
        g.*,

        u.full_name AS student_name,
        d.department_name,

        ai.department,
        ai.department_confidence,
        ai.department_reason,

        ai.priority,
        ai.priority_reason,

        ai.severity_score,

        ai.summary,
        ai.sentiment,
        ai.verdict,

        ai.spam_score,
        ai.abuse_score,
        ai.legitimacy_score,

        ai.suggested_resolution

      FROM grievances g

      JOIN users u
        ON g.user_id = u.id

      JOIN departments d
        ON g.department_id = d.id

      LEFT JOIN grievance_ai_analysis ai
        ON ai.grievance_id = g.id

      WHERE
        g.department_id = $1
        AND g.is_active = 1

      ORDER BY
        ai.severity_score DESC NULLS LAST,
        g.submitted_at DESC
      `,
      [departmentId],
    );

    return result.rows;
  }

  return [];
};

export const getGrievanceByIdService = async (id) => {
  const grievanceResult = await pool.query(
    `
    SELECT
      g.*,

      u.full_name,
      u.trust_score,
      u.warning_count,
      u.ai_flag_count,

      d.department_name,

      ai.department,
      ai.department_confidence,
      ai.department_reason,

      ai.priority,
      ai.priority_reason,

      ai.severity_score,

      ai.spam_score,
      ai.abuse_score,
      ai.legitimacy_score,

      ai.summary,
      ai.sentiment,
      ai.verdict,

      ai.suggested_resolution

    FROM grievances g

    JOIN users u
      ON g.user_id = u.id

    JOIN departments d
      ON g.department_id = d.id

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id = g.id

    WHERE g.id = $1
    `,
    [id],
  );

  if (grievanceResult.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  const attachmentResult = await pool.query(
    `
    SELECT
      id,
      grievance_id,
      file_name,
      file_type,
      file_size,
      uploaded_by,
      uploaded_at
    FROM grievance_attachments
    WHERE grievance_id = $1
    ORDER BY uploaded_at DESC
    `,
    [id],
  );

  const historyResult = await pool.query(
    `
    SELECT
      gh.id,
      gh.action,
      gh.old_status,
      gh.new_status,
      gh.remarks,
      gh.metadata,
      gh.created_at,

      u.id AS user_id,
      u.full_name,
      u.role

    FROM grievance_history gh

    LEFT JOIN users u
      ON gh.changed_by = u.id

    WHERE gh.grievance_id = $1

    ORDER BY gh.created_at DESC
    `,
    [id],
  );

  return {
    grievance: grievanceResult.rows[0],
    attachments: attachmentResult.rows,
    history: historyResult.rows,
  };
};

// Get My Grievances
export const getMyGrievancesService = async (userId) => {
  const result = await pool.query(
    `
    SELECT
      g.id,
      g.grievance_no,
      g.title,
      g.description,
      g.status,
      g.priority,
      g.submitted_at,

      d.id AS department_id,
      d.department_name,

      ai.department,
      ai.department_confidence,
      ai.department_reason,

      ai.priority,
      ai.priority_reason,

      ai.severity_score,

      ai.summary,
      ai.sentiment,
      ai.verdict,

      ai.spam_score,
      ai.abuse_score,
      ai.legitimacy_score,

      ai.suggested_resolution

    FROM grievances g

    JOIN departments d
      ON g.department_id = d.id

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id = g.id

    WHERE
      g.user_id = $1
      AND g.is_active = 1

    ORDER BY
      g.submitted_at DESC
    `,
    [userId],
  );

  return result.rows;
};
// Update Status
export const updateGrievanceStatusService = async (
  id,
  status,
  resolved_by = null,
) => {
  const result = await pool.query(
    `
        UPDATE grievances
        SET
            status = $1,
            resolved_by = $2,
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
    [status, resolved_by, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return result.rows[0];
};

// Delete
export const deleteGrievanceService = async (id) => {
  const result = await pool.query(
    `
        DELETE FROM grievances
        WHERE id = $1
        RETURNING id
        `,
    [id],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return {
    success: true,
  };
};

// Assign Grievance
export const assignGrievanceService = async (grievanceId, resolved_by) => {
  const userResult = await pool.query(
    `
        SELECT id, role
        FROM users
        WHERE id = $1
        `,
    [resolved_by],
  );

  if (userResult.rows.length === 0) {
    throw new Error("Department admin not found.");
  }

  if (
    userResult.rows[0].role !== "dept_admin" &&
    userResult.rows[0].role !== "super_admin"
  ) {
    throw new Error("Invalid assignee.");
  }

  const result = await pool.query(
    `
        UPDATE grievances
        SET
            resolved_by = $1,
            status = 'assigned',
            updated_at = CURRENT_TIMESTAMP
        WHERE id = $2
        RETURNING *
        `,
    [resolved_by, grievanceId],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return result.rows[0];
};

/// Get Department Grievances
export const getDepartmentGrievancesService = async (departmentId) => {
  const result = await pool.query(
    `
    SELECT
      g.id,
      g.grievance_no,
      g.title,
      g.description,
      g.status,
      g.priority,
      g.submitted_at,

      u.id AS student_id,
      u.full_name,

      d.id AS department_id,
      d.department_name,

      ai.department,
      ai.department_confidence,
      ai.department_reason,

      ai.priority,
      ai.priority_reason,

      ai.severity_score,

      ai.summary,
      ai.sentiment,
      ai.verdict,

      ai.spam_score,
      ai.abuse_score,
      ai.legitimacy_score,

      ai.suggested_resolution

    FROM grievances g

    JOIN users u
      ON g.user_id = u.id

    JOIN departments d
      ON g.department_id = d.id

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id = g.id

    WHERE
      g.department_id = $1
      AND g.is_active = 1

    ORDER BY
      ai.severity_score DESC NULLS LAST,
      g.submitted_at DESC
    `,
    [departmentId],
  );

  return result.rows;
};
// Review Grievance
export const reviewGrievanceService = async (id, reviewedBy) => {
  const result = await pool.query(
    `
        UPDATE grievances
        SET
            status = 'in_progress',
            resolved_by = $1,
            updated_at = NOW()
        WHERE id = $2
        RETURNING *
        `,
    [reviewedBy, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return result.rows[0];
};

// Resolve Grievance
export const resolveGrievanceService = async (id, resolvedBy, resolution) => {
  const result = await pool.query(
    `
        UPDATE grievances
        SET
            status = 'resolved',
            resolution = $1,
            resolved_by = $2,
            resolved_at = NOW(),
            updated_at = NOW()
        WHERE id = $3
        RETURNING *
        `,
    [resolution, resolvedBy, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return result.rows[0];
};

// Reject Grievance
export const rejectGrievanceService = async (id, rejectedBy) => {
  const result = await pool.query(
    `
        UPDATE grievances
        SET
            status='rejected',
            resolved_by=$1,
            updated_at=NOW()
        WHERE id=$2
        RETURNING *
        `,
    [rejectedBy, id],
  );

  if (result.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  return result.rows[0];
};

export const changeDepartmentService = async (
  grievanceId,
  departmentId,
  changedBy,
  reason,
) => {
  const grievanceResult = await pool.query(
    `
    SELECT *
    FROM grievances
    WHERE id = $1
    `,
    [grievanceId],
  );

  if (grievanceResult.rows.length === 0) {
    throw new Error("Grievance not found.");
  }

  const grievance = grievanceResult.rows[0];

  const departmentResult = await pool.query(
    `
    SELECT id
    FROM departments
    WHERE id = $1
      AND is_active = 1
    `,
    [departmentId],
  );

  if (departmentResult.rows.length === 0) {
    throw new Error("Department not found.");
  }

  const result = await pool.query(
    `
    UPDATE grievances
    SET
      department_id = $1,
      updated_at = NOW()
    WHERE id = $2
    RETURNING *
    `,
    [departmentId, grievanceId],
  );

  return {
    ...result.rows[0],
    old_department_id: grievance.department_id,
    changed_by: changedBy,
    reason,
  };
};
