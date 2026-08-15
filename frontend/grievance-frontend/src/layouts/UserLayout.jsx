import { Outlet } from "react-router-dom";

import Sidebar from "../components/layout/Sidebar";
import Navbar from "../components/layout/Navbar";

function UserLayout() {
  return (
    <div className="flex h-screen bg-[linear-gradient(135deg,#020817_0%,#0f172a_18%,#111827_32%,#1e3a8a_62%,#312e81_100%)] text-slate-100">
      <Sidebar />

      <div className="flex flex-1 flex-col">
        <Navbar />

        <main className="flex-1 overflow-auto p-4 md:p-5">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default UserLayout;
