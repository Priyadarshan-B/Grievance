import { Outlet } from "react-router-dom";
import Sidebar from "../components/admin/Sidebar";
import Navbar from "../components/admin/Navbar";

function AdminLayout() {
  return (
    <div className="flex h-screen bg-[#0B0F19] text-slate-100">
      <Sidebar />

      <div className="min-w-0 flex flex-1 flex-col overflow-hidden bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),transparent_30%)]">
        <Navbar />

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default AdminLayout;