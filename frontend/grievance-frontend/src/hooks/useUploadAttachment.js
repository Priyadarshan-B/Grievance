import { useMutation } from "@tanstack/react-query";
import { uploadAttachment } from "../services/attachments/attachment.service";

export const useUploadAttachment = () => {
  return useMutation({
    mutationFn: ({ grievanceId, file }) => uploadAttachment(grievanceId, file),
  });
};
