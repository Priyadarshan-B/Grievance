import {
    createGrievanceService,
    getGrievancesService,
    getGrievanceByIdService,
    getMyGrievancesService,
    updateGrievanceStatusService,
    deleteGrievanceService,
    assignGrievanceService
} from "../../services/grievances/grievance.service.js";

import { addHistory } from "../../services/history/history.service.js";

export const createGrievance = async (req, res, next) => {
    try {

        const grievance = await createGrievanceService(
            req.body,
            req.user.id
        );

        await addHistory({
            grievanceId: grievance.id,
            changedBy: req.user.id,
            action: "GRIEVANCE_CREATED",
            remarks: "Grievance submitted."
        });

        res.status(201).json({
            success: true,
            message: "Grievance submitted successfully.",
            data: grievance
        });

    } catch (err) {
        next(err);
    }
};

export const getGrievances = async (req, res, next) => {
    try {

        const grievances = await getGrievancesService();

        res.json({
            success: true,
            data: grievances
        });

    } catch (err) {
        next(err);
    }
};

export const getGrievanceById = async (req, res, next) => {
    try {

        const grievance = await getGrievanceByIdService(
            req.params.id
        );

        res.json({
            success: true,
            data: grievance
        });

    } catch (err) {
        next(err);
    }
};

export const getMyGrievances = async (req, res, next) => {
    try {

        const grievances = await getMyGrievancesService(
            req.user.id
        );

        res.json({
            success: true,
            data: grievances
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
            req.user.id
        );

        await addHistory({
            grievanceId: grievance.id,
            changedBy: req.user.id,
            action: "STATUS_CHANGED",
            oldStatus: grievance.old_status,
            newStatus: grievance.status,
            remarks: req.body.remarks || null
        });

        res.json({
            success: true,
            message: "Grievance status updated.",
            data: grievance
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
            message: "Grievance deleted successfully."
        });

    } catch (err) {
        next(err);
    }
};

export const assignGrievance = async (req, res, next) => {
    try {

        const { resolved_by } = req.body;

        const grievance = await assignGrievanceService(
            req.params.id,
            resolved_by
        );

        res.status(200).json({
            success: true,
            message: "Grievance assigned successfully.",
            data: grievance
        });

    } catch (err) {
        next(err);
    }
};