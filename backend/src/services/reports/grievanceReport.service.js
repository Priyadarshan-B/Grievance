import ExcelJS from "exceljs";
import pool from "../../config/db.js";
import { getGrievanceByIdService } from "../grievances/grievance.service.js";

export const generateGrievanceReport = async (grievanceId) => {
  // Get complete grievance details
  const data = await getGrievanceByIdService(grievanceId);

  const { grievance, attachments, history } = data;

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AI Grievance Redressal System";
  workbook.created = new Date();

  // =========================================================
  // SHEET 1 - GRIEVANCE DETAILS
  // =========================================================

  const grievanceSheet = workbook.addWorksheet("Grievance Report");

  grievanceSheet.columns = [
    { header: "Field", key: "field", width: 30 },
    { header: "Details", key: "value", width: 80 },
  ];

  grievanceSheet.addRows([
    {
      field: "Grievance Number",
      value: grievance.grievance_no || "-",
    },
    {
      field: "Title",
      value: grievance.title || "-",
    },
    {
      field: "Description",
      value: grievance.description || "-",
    },
    {
      field: "Department",
      value: grievance.department_name || "-",
    },
    {
      field: "Priority",
      value: grievance.priority ? grievance.priority.toUpperCase() : "-",
    },
    {
      field: "Status",
      value: grievance.status ? grievance.status.toUpperCase() : "-",
    },
    {
      field: "Submitted At",
      value: grievance.submitted_at ? new Date(grievance.submitted_at) : "-",
    },
    {
      field: "Resolved At",
      value: grievance.resolved_at ? new Date(grievance.resolved_at) : "-",
    },
    {
      field: "Resolution",
      value: grievance.resolution || "-",
    },
  ]);

  // =========================================================
  // SHEET 2 - USER INFORMATION
  // =========================================================

  const userSheet = workbook.addWorksheet("User Information");

  userSheet.columns = [
    { header: "Field", key: "field", width: 30 },
    { header: "Details", key: "value", width: 50 },
  ];

  userSheet.addRows([
    {
      field: "User Name",
      value: grievance.full_name || "-",
    },
    {
      field: "Trust Score",
      value: grievance.trust_score ?? "-",
    },
    {
      field: "AI Flags",
      value: grievance.ai_flag_count ?? 0,
    },
    {
      field: "Warnings",
      value: grievance.warning_count ?? 0,
    },
  ]);

  // =========================================================
  // SHEET 3 - AI ANALYSIS
  // =========================================================

  const aiSheet = workbook.addWorksheet("AI Analysis");

  aiSheet.columns = [
    { header: "AI Analysis Field", key: "field", width: 35 },
    { header: "Result", key: "value", width: 80 },
  ];

  aiSheet.addRows([
    {
      field: "AI Department",
      value: grievance.department || "-",
    },
    {
      field: "Department Confidence",
      value:
        grievance.department_confidence != null
          ? `${grievance.department_confidence}%`
          : "-",
    },
    {
      field: "Department Reason",
      value: grievance.department_reason || "-",
    },
    {
      field: "AI Priority",
      value: grievance.priority ? grievance.priority.toUpperCase() : "-",
    },
    {
      field: "Priority Reason",
      value: grievance.priority_reason || "-",
    },
    {
      field: "Severity Score",
      value: grievance.severity_score ?? "-",
    },
    {
      field: "Legitimacy Score",
      value: grievance.legitimacy_score ?? "-",
    },
    {
      field: "Spam Score",
      value: grievance.spam_score ?? "-",
    },
    {
      field: "Abuse Score",
      value: grievance.abuse_score ?? "-",
    },
    {
      field: "Sentiment",
      value: grievance.sentiment || "-",
    },
    {
      field: "Verdict",
      value: grievance.verdict || "-",
    },
    {
      field: "AI Summary",
      value: grievance.summary || "-",
    },
    {
      field: "Suggested Resolution",
      value: grievance.suggested_resolution || "-",
    },
  ]);

  // =========================================================
  // SHEET 4 - TIMELINE / HISTORY
  // =========================================================

  const historySheet = workbook.addWorksheet("Timeline");

  historySheet.columns = [
    { header: "Date", key: "created_at", width: 24 },
    { header: "Action", key: "action", width: 28 },
    { header: "Old Status", key: "old_status", width: 18 },
    { header: "New Status", key: "new_status", width: 18 },
    { header: "Remarks", key: "remarks", width: 50 },
    { header: "Changed By", key: "full_name", width: 30 },
    { header: "Role", key: "role", width: 20 },
  ];

  history.forEach((item) => {
    historySheet.addRow({
      created_at: item.created_at ? new Date(item.created_at) : "-",
      action: item.action || "-",
      old_status: item.old_status ? item.old_status.toUpperCase() : "-",
      new_status: item.new_status ? item.new_status.toUpperCase() : "-",
      remarks: item.remarks || "-",
      full_name: item.full_name || "-",
      role: item.role || "-",
    });
  });

  // =========================================================
  // SHEET 5 - ATTACHMENTS
  // =========================================================

  const attachmentSheet = workbook.addWorksheet("Attachments");

  attachmentSheet.columns = [
    { header: "File Name", key: "file_name", width: 40 },
    { header: "File Type", key: "file_type", width: 25 },
    { header: "File Size", key: "file_size", width: 18 },
    { header: "Uploaded By", key: "uploaded_by", width: 35 },
    { header: "Uploaded At", key: "uploaded_at", width: 24 },
  ];

  attachments.forEach((file) => {
    attachmentSheet.addRow({
      file_name: file.file_name || "-",
      file_type: file.file_type || "-",
      file_size: file.file_size || "-",
      uploaded_by: file.uploaded_by || "-",
      uploaded_at: file.uploaded_at ? new Date(file.uploaded_at) : "-",
    });
  });

  // =========================================================
  // FORMAT ALL SHEETS
  // =========================================================

  workbook.worksheets.forEach((sheet) => {
    // Header formatting
    const headerRow = sheet.getRow(1);

    headerRow.font = {
      bold: true,
      size: 12,
    };

    headerRow.alignment = {
      vertical: "middle",
      horizontal: "center",
    };

    headerRow.height = 25;

    // Borders + alignment
    sheet.eachRow((row) => {
      row.eachCell((cell) => {
        cell.border = {
          top: { style: "thin" },
          left: { style: "thin" },
          bottom: { style: "thin" },
          right: { style: "thin" },
        };

        cell.alignment = {
          vertical: "top",
          wrapText: true,
        };
      });
    });

    // Freeze header
    sheet.views = [
      {
        state: "frozen",
        ySplit: 1,
      },
    ];
  });

  // Date formatting
  [grievanceSheet, historySheet, attachmentSheet].forEach((sheet) => {
    sheet.eachRow((row, rowNumber) => {
      if (rowNumber === 1) return;

      row.eachCell((cell) => {
        if (cell.value instanceof Date) {
          cell.numFmt = "dd-mm-yyyy hh:mm";
        }
      });
    });
  });

  return {
    workbook,
    grievanceNo: grievance.grievance_no,
  };
};

export const generateAllGrievancesReport = async (user, filters = {}) => {
  const {
    search = "",
    department = "",
    status = "",
    priority = "",
    sentiment = "",
  } = filters;

  const conditions = ["g.is_active = 1"];
  const params = [];

  // =========================================================
  // ROLE BASED ACCESS
  // =========================================================

  if (user.role === "dept_admin") {
    const departmentResult = await pool.query(
      `
      SELECT department_id
      FROM department_admins
      WHERE user_id = $1
      AND is_active = 1
      `,
      [user.id],
    );

    if (departmentResult.rows.length === 0) {
      throw new Error("Department admin is not assigned to a department.");
    }

    params.push(departmentResult.rows[0].department_id);

    conditions.push(`g.department_id = $${params.length}`);
  }

  // =========================================================
  // SEARCH
  // =========================================================

  if (search.trim()) {
    params.push(`%${search.trim().toLowerCase()}%`);

    conditions.push(`
      (
        LOWER(g.grievance_no) LIKE $${params.length}
        OR LOWER(g.title) LIKE $${params.length}
        OR LOWER(u.full_name) LIKE $${params.length}
      )
    `);
  }

  // =========================================================
  // DEPARTMENT
  // =========================================================

  if (department.trim()) {
    params.push(department.trim().toLowerCase());

    conditions.push(`
      LOWER(d.department_name) = $${params.length}
    `);
  }

  // =========================================================
  // STATUS
  // =========================================================

  if (status.trim()) {
    params.push(status.trim().toLowerCase());

    conditions.push(`
      LOWER(g.status) = $${params.length}
    `);
  }

  // =========================================================
  // PRIORITY
  // =========================================================

  if (priority.trim()) {
    params.push(priority.trim().toLowerCase());

    conditions.push(`
      LOWER(g.priority) = $${params.length}
    `);
  }

  // =========================================================
  // SENTIMENT
  // =========================================================

  if (sentiment.trim()) {
    params.push(sentiment.trim().toLowerCase());

    conditions.push(`
      LOWER(ai.sentiment) = $${params.length}
    `);
  }

  const whereClause = conditions.join(" AND ");

  // =========================================================
  // GET FILTERED GRIEVANCES
  // =========================================================

  const result = await pool.query(
    `
    SELECT
      g.grievance_no,
      g.title,
      g.description,
      g.status,
      g.priority,
      g.submitted_at,
      g.resolved_at,
      g.closed_at,
      g.resolution,

      u.full_name AS student_name,

      d.department_name,
      d.department_code,

      ai.department AS ai_department,
      ai.department_confidence,
      ai.department_reason,

      ai.priority AS ai_priority,
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

    LEFT JOIN departments d
      ON g.department_id = d.id

    LEFT JOIN grievance_ai_analysis ai
      ON ai.grievance_id = g.id

    WHERE ${whereClause}

    ORDER BY
      g.submitted_at DESC,
      ai.severity_score DESC NULLS LAST
    `,
    params,
  );

  // =========================================================
  // CREATE WORKBOOK
  // =========================================================

  const workbook = new ExcelJS.Workbook();

  workbook.creator = "AI Grievance Redressal System";
  workbook.created = new Date();

  const sheet = workbook.addWorksheet("All Grievances");

  // =========================================================
  // COLUMNS
  // =========================================================

  sheet.columns = [
    { header: "Grievance No", key: "grievance_no", width: 18 },
    { header: "Title", key: "title", width: 35 },
    { header: "Student Name", key: "student_name", width: 25 },
    { header: "Department", key: "department_name", width: 25 },
    { header: "Priority", key: "priority", width: 14 },
    { header: "Severity", key: "severity_score", width: 12 },
    { header: "Sentiment", key: "sentiment", width: 16 },
    { header: "Verdict", key: "verdict", width: 16 },
    { header: "Status", key: "status", width: 16 },
    { header: "Submitted At", key: "submitted_at", width: 22 },
    { header: "Resolved At", key: "resolved_at", width: 22 },
    { header: "Description", key: "description", width: 60 },
    { header: "Resolution", key: "resolution", width: 60 },
    { header: "AI Department", key: "ai_department", width: 25 },
    {
      header: "Department Confidence",
      key: "department_confidence",
      width: 22,
    },
    {
      header: "AI Department Reason",
      key: "department_reason",
      width: 50,
    },
    { header: "AI Priority", key: "ai_priority", width: 15 },
    {
      header: "AI Priority Reason",
      key: "priority_reason",
      width: 50,
    },
    { header: "Spam Score", key: "spam_score", width: 14 },
    { header: "Abuse Score", key: "abuse_score", width: 14 },
    {
      header: "Legitimacy Score",
      key: "legitimacy_score",
      width: 18,
    },
    { header: "AI Summary", key: "summary", width: 60 },
    {
      header: "Suggested Resolution",
      key: "suggested_resolution",
      width: 60,
    },
  ];

  // =========================================================
  // ADD ROWS
  // =========================================================

  result.rows.forEach((g) => {
    sheet.addRow({
      grievance_no: g.grievance_no || "-",

      title: g.title || "-",

      student_name: g.student_name || "-",

      department_name: g.department_name || "Unassigned",

      priority: g.priority ? g.priority.toUpperCase() : "-",

      severity_score: g.severity_score ?? 0,

      sentiment: g.sentiment || "-",

      verdict: g.verdict ? g.verdict.toUpperCase() : "-",

      status: g.status ? g.status.toUpperCase() : "-",

      submitted_at: g.submitted_at ? new Date(g.submitted_at) : null,

      resolved_at: g.resolved_at ? new Date(g.resolved_at) : null,

      description: g.description || "-",

      resolution: g.resolution || "-",

      ai_department: g.ai_department || "-",

      department_confidence:
        g.department_confidence != null ? `${g.department_confidence}%` : "-",

      department_reason: g.department_reason || "-",

      ai_priority: g.ai_priority ? g.ai_priority.toUpperCase() : "-",

      priority_reason: g.priority_reason || "-",

      spam_score: g.spam_score ?? 0,

      abuse_score: g.abuse_score ?? 0,

      legitimacy_score: g.legitimacy_score ?? 0,

      summary: g.summary || "-",

      suggested_resolution: g.suggested_resolution || "-",
    });
  });

  // =========================================================
  // HEADER FORMAT
  // =========================================================

  const headerRow = sheet.getRow(1);

  headerRow.font = {
    bold: true,
    size: 12,
  };

  headerRow.alignment = {
    horizontal: "center",
    vertical: "middle",
  };

  headerRow.height = 28;

  // =========================================================
  // CELL FORMAT
  // =========================================================

  sheet.eachRow((row, rowNumber) => {
    row.eachCell((cell) => {
      cell.alignment = {
        vertical: "top",
        wrapText: true,
      };

      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });

    if (rowNumber > 1) {
      const submittedCell = row.getCell(10);
      const resolvedCell = row.getCell(11);

      if (submittedCell.value instanceof Date) {
        submittedCell.numFmt = "dd-mm-yyyy hh:mm";
      }

      if (resolvedCell.value instanceof Date) {
        resolvedCell.numFmt = "dd-mm-yyyy hh:mm";
      }
    }
  });

  // =========================================================
  // FREEZE HEADER
  // =========================================================

  sheet.views = [
    {
      state: "frozen",
      ySplit: 1,
    },
  ];

  // =========================================================
  // EXCEL FILTER
  // =========================================================

  sheet.autoFilter = {
    from: "A1",
    to: "W1",
  };

  return {
    workbook,
    count: result.rows.length,
  };
};
