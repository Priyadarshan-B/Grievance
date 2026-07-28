export const getStatusVariant = (status = "") => {
  switch (status.toLowerCase()) {
    case "submitted":
      return "info";

    case "under review":
      return "warning";

    case "in progress":
      return "primary";

    case "resolved":
      return "success";

    case "rejected":
      return "danger";

    case "closed":
      return "secondary";

    default:
      return "default";
  }
};