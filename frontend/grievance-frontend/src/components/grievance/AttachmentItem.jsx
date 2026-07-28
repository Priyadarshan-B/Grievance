import { Download, File, FileImage, FileText } from "lucide-react";

import { downloadAttachment } from "../../services/attachments/attachment.service";

const formatFileSize = (bytes) => {
  if (!bytes) return "0 KB";

  const sizes = ["Bytes", "KB", "MB", "GB"];

  const i = Math.floor(Math.log(bytes) / Math.log(1024));

  return `${(bytes / Math.pow(1024, i)).toFixed(2)} ${sizes[i]}`;
};

const getFileIcon = (type) => {
  if (!type) return <File size={22} />;

  if (type.startsWith("image/")) {
    return <FileImage size={22} className="text-green-600" />;
  }

  if (type === "application/pdf") {
    return <FileText size={22} className="text-red-600" />;
  }

  if (type.includes("word") || type.includes("document")) {
    return <FileText size={22} className="text-blue-600" />;
  }

  return <File size={22} className="text-gray-600" />;
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
    <div className="flex items-center justify-between rounded-lg border border-slate-200 bg-white p-4 shadow-sm">
      <div className="flex items-center gap-4">
        {getFileIcon(attachment.file_type)}

        <div>
          <p className="font-medium text-slate-800">{attachment.file_name}</p>

          <p className="text-sm text-slate-500">{attachment.file_type}</p>

          <p className="text-xs text-slate-400">
            {formatFileSize(attachment.file_size)}
          </p>

          {attachment.uploaded_at && (
            <p className="text-xs text-slate-400">
              Uploaded: {new Date(attachment.uploaded_at).toLocaleString()}
            </p>
          )}
        </div>
      </div>

      <button
        onClick={handleDownload}
        className="flex items-center gap-2 rounded-lg bg-blue-600 px-4 py-2 text-white transition hover:bg-blue-700"
      >
        <Download size={16} />
        Download
      </button>
    </div>
  );
};

export default AttachmentItem;
