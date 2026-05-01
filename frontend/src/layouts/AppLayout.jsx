import { NavLink, Outlet } from "react-router-dom";
import { FolderKanban, LayoutDashboard, ListTodo } from "lucide-react";
import Sidebar from "../components/Sidebar";
import Topbar from "../components/Topbar";

const AppLayout = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100/70 via-purple-100/50 to-slate-100 p-2 dark:from-slate-950 dark:via-indigo-950/40 dark:to-slate-950">
      <div className="mx-auto flex max-w-7xl gap-3">
        <div className="hidden lg:block">
          <Sidebar />
        </div>
        <main className="flex-1">
          <Topbar />
          <nav className="glass mx-3 mt-3 flex items-center justify-around rounded-2xl p-2 lg:hidden">
            <NavLink to="/" className={({ isActive }) => `rounded-xl p-2 ${isActive ? "bg-indigo-500 text-white" : ""}`}>
              <LayoutDashboard size={18} />
            </NavLink>
            <NavLink to="/projects" className={({ isActive }) => `rounded-xl p-2 ${isActive ? "bg-indigo-500 text-white" : ""}`}>
              <FolderKanban size={18} />
            </NavLink>
            <NavLink to="/tasks" className={({ isActive }) => `rounded-xl p-2 ${isActive ? "bg-indigo-500 text-white" : ""}`}>
              <ListTodo size={18} />
            </NavLink>
          </nav>
          <div className="p-3">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default AppLayout;
