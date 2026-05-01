import { motion } from "framer-motion";
import { FolderKanban, LayoutDashboard, ListTodo, UserCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const links = [
  { to: "/", icon: LayoutDashboard, label: "Dashboard" },
  { to: "/projects", icon: FolderKanban, label: "Projects" },
  { to: "/tasks", icon: ListTodo, label: "Tasks" },
  { to: "/profile", icon: UserCircle, label: "Profile" },
];

const Sidebar = () => (
  <motion.aside initial={{ x: -12, opacity: 0 }} animate={{ x: 0, opacity: 1 }} className="glass m-3 w-64 rounded-2xl p-4">
    <h1 className="mb-8 bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-2xl font-bold text-transparent">Team Task Manager</h1>
    <nav className="space-y-2">
      {links.map(({ to, icon: Icon, label }) => (
        <NavLink
          key={to}
          to={to}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-xl px-4 py-3 transition ${
              isActive ? "bg-indigo-500 text-white shadow-lg" : "hover:bg-white/30 dark:hover:bg-slate-800/40"
            }`
          }
        >
          <Icon size={18} />
          {label}
        </NavLink>
      ))}
    </nav>
  </motion.aside>
);

export default Sidebar;
