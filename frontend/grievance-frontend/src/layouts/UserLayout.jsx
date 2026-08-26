import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function UserLayout() {
  return (
    <div className="flex h-screen bg-[#0B0F19] text-slate-100">
      <Sidebar />

      <div className="min-w-0 flex flex-1 flex-col bg-[radial-gradient(circle_at_top_right,_rgba(14,165,233,0.08),transparent_30%)]">
        <Navbar />

        <main className="flex-1 overflow-auto p-4 md:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
