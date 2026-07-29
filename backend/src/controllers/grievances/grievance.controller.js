import {
  createGrievanceService,
  getGrievancesService,
  getGrievanceByIdService,
  getMyGrievancesService,
  updateGrievanceStatusService,
  deleteGrievanceService,
  assignGrievanceService,
  getDepartmentGrievancesService,
  reviewGrievanceService,
  resolveGrievanceService,
  rejectGrievanceService,
} from "../../services/grievances/grievance.service.js";

import { addHistory } from "../../services/history/history.service.js";

// =========================
// Create Grievance
// =========================
export const createGrievance = async (req, res, next) => {
  try {
    const result = await createGrievanceService(req.body, req.user.id);

    await addHistory({
      grievanceId: result.grievance.id,
      changedBy: req.user.id,
      action: "GRIEVANCE_CREATED",
      newStatus: result.grievance.status,
      remarks: "Grievance submitted.",
    });

    res.status(201).json({
      success: true,
      message: "Grievance submitted successfully.",
      data: result,
    });
  } catch (err) {
    next(err);
  }
};

export const getGrievances = async (req, res) => {
  try {
    const grievances = await getGrievancesService(req.user);

    return res.json({
      success: true,
      data: grievances,
    });
  } catch (err) {
    console.error(err);

    return res.status(500).json({
      success: false,
      message: "Failed to fetch grievances.",
    });
  }
};

export const getGrievanceById = async (req, res, next) => {
  try {
    const grievance = await getGrievanceByIdService(req.params.id);

    res.json({
      success: true,
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

export const getMyGrievances = async (req, res, next) => {
  try {
    const grievances = await getMyGrievancesService(req.user.id);

    res.json({
      success: true,
      data: grievances,
    });
  } catch (err) {
    next(err);
  }
};

export const updateGrievanceStatus = async (req, res, next) => {
  try {
    const grievance = await updateGrievanceStatusService(
      req.params.id,
      req.body.status,
      req.user.id,
    );

    await addHistory({
      grievanceId: grievance.id,
      changedBy: req.user.id,
      action: "STATUS_CHANGED",
      oldStatus: grievance.old_status,
      newStatus: grievance.status,
      remarks: req.body.remarks || null,
    });

    res.json({
      success: true,
      message: "Grievance status updated.",
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

export const deleteGrievance = async (req, res, next) => {
  try {
    await deleteGrievanceService(req.params.id);

    res.json({
      success: true,
      message: "Grievance deleted successfully.",
    });
  } catch (err) {
    next(err);
  }
};

export const assignGrievance = async (req, res, next) => {
  try {
    const { resolved_by } = req.body;

    const grievance = await assignGrievanceService(req.params.id, resolved_by);

    res.status(200).json({
      success: true,
      message: "Grievance assigned successfully.",
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

export const getDepartmentGrievances = async (req, res, next) => {
  try {
    const grievances = await getDepartmentGrievancesService(
      req.user.department_id,
    );

    res.json({
      success: true,
      data: grievances,
    });
  } catch (err) {
    next(err);
  }
};

export const reviewGrievance = async (req, res, next) => {
  try {
    const grievance = await reviewGrievanceService(req.params.id, req.user.id);

    await addHistory({
      grievanceId: grievance.id,
      changedBy: req.user.id,
      action: "UNDER_REVIEW",
      newStatus: "in_progress",
      remarks: req.body.remarks || null,
    });

    res.json({
      success: true,
      message: "Grievance is under review.",
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

export const resolveGrievance = async (req, res, next) => {
  try {
    const grievance = await resolveGrievanceService(
      req.params.id,
      req.user.id,
      req.body.resolution,
    );

    await addHistory({
      grievanceId: grievance.id,
      changedBy: req.user.id,
      action: "GRIEVANCE_RESOLVED",
      newStatus: "resolved",
      remarks: req.body.remarks || null,
    });

    res.json({
      success: true,
      message: "Grievance resolved successfully.",
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};

export const rejectGrievance = async (req, res, next) => {
  try {
    const grievance = await rejectGrievanceService(req.params.id, req.user.id);

    await addHistory({
      grievanceId: grievance.id,
      changedBy: req.user.id,
      action: "GRIEVANCE_REJECTED",
      newStatus: "rejected",
      remarks: req.body.remarks || null,
    });

    res.json({
      success: true,
      message: "Grievance rejected.",
      data: grievance,
    });
  } catch (err) {
    next(err);
  }
};
