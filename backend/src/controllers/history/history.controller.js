import { getHistoryService } from "../../services/history/history.service.js";

export const getHistory = async (req, res, next) => {

    try {

        const history = await getHistoryService(
            req.params.grievanceId
        );

        return res.status(200).json({
            success: true,
            count: history.length,
            data: history
        });

    } catch (err) {
        next(err);
    }

};