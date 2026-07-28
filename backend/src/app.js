import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";
import cookieParser from "cookie-parser";

// middlewares
import errorMiddleware from "./middleware/error.middleware.js";

// routes
import authRoutes from "./routes/auth.routes.js";
import userRoutes from "./routes/user.routes.js";
import departmentRoutes from "./routes/departments/department.routes.js";
import categoryRoutes from "./routes/categories/category.routes.js";
import grievanceRoutes from "./routes/grievances/grievance.routes.js";
import departmentAdminRoutes from "./routes/departmentAdmins/departmentAdmin.routes.js";
import attachmentRoutes from "./routes/attachments/attachment.routes.js";
import historyRoutes from "./routes/history/history.routes.js";
import dashboardRoutes from "./routes/dashboard/dashboard.routes.js";
import adminDashboardRoutes from "./routes/admin/dashboard.routes.js";


const app = express();

app.use(cors({

    origin: "http://localhost:5173",

    credentials: true

}));

app.use(helmet());

app.use(morgan("dev"));

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/", (req, res) => {

    res.json({

        success: true,

        message: "AI Grievance Backend Running"

    });

});

app.use(errorMiddleware);
app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/departments", departmentRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/grievances", grievanceRoutes);
app.use("/api/department-admins", departmentAdminRoutes);
app.use("/api/attachments", attachmentRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/api/admin", adminDashboardRoutes);
app.use("/api/history", historyRoutes);
app.use("/uploads", express.static("uploads"));

export default app;