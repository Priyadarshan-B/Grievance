import api from "../../api/axios";

export const uploadAttachment = async (
    grievanceId,
    file
) => {

    const formData = new FormData();

    formData.append("file", file);

    const response = await api.post(
        `/attachments/${grievanceId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        }
    );

    return response.data;
};

/**
 * Get attachments
 */
export const getAttachments = async (
    grievanceId
) => {

    const response = await api.get(
        `/attachments/${grievanceId}`
    );

    return response.data;
};

/**
 * Download attachment
 */
export const downloadAttachment = async (
    attachmentId
) => {

    const response = await api.get(
        `/attachments/download/${attachmentId}`
    );

    return response.data;
};

/**
 * Delete attachment
 */
export const deleteAttachment = async (
    attachmentId
) => {

    const response = await api.delete(
        `/attachments/${attachmentId}`
    );

    return response.data;
};