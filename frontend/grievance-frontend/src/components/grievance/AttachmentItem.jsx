import { Download } from "lucide-react";
import { downloadAttachment } from "../../services/attachments/attachments.service";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const AttachmentItem = ({ attachment }) => {
  const handleDownload = async () => {
    try {
      const response = await downloadAttachment(attachment.id);

      window.open(response.data.url, "_blank");
    } catch (err) {
      console.error(err);

      alert("Unable to download attachment.");
    }
  };

  return (
    <div className="flex items-center justify-between rounded-lg border bg-white p-4">
      <div>
        <p className="font-medium">{attachment.file_name}</p>

        <p className="text-sm text-gray-500">{attachment.file_type}</p>

        <p className="text-xs text-gray-400">
          {formatFileSize(attachment.file_size)}
        </p>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-3 py-2 text-white hover:bg-blue-700"
      >
        <Download size={16} />
        Download
      </button>
    </div>
  );
};

export default AttachmentItem;
