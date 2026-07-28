import AttachmentItem from "./AttachmentItem";

const AttachmentList = ({ attachments }) => {
  if (!attachments?.length) {
    return (
      <div className="rounded-lg border border-dashed p-8 text-center text-gray-500">
        No attachments uploaded.
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {attachments.map((attachment) => (
        <AttachmentItem key={attachment.id} attachment={attachment} />
      ))}
    </div>
  );
};

export default AttachmentList;
