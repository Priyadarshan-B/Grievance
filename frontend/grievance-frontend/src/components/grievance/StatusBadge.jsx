import Badge from "../ui/Badge";

const StatusBadge = ({ status }) => {
    const value = (status || "").toLowerCase();

    const variants = {
        submitted: "info",
        assigned: "warning",
        "in_progress": "primary",
        resolved: "success",
        closed: "secondary",
        rejected: "danger",
    };

    return (
        <Badge variant={variants[value] || "secondary"}>
            {status
                ?.replaceAll("_", " ")
                .replace(/\b\w/g, (c) => c.toUpperCase())}
        </Badge>
    );
};

export default StatusBadge;