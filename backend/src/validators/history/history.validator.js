export const validateHistoryRequest = (req, res, next) => {

    const { grievanceId } = req.params;

    if (!grievanceId) {
        return res.status(400).json({
            success: false,
            message: "Grievance ID is required."
        });
    }

    next();

};