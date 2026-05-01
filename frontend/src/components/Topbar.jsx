import { LogOut, Moon, Sun } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { useTheme } from "../context/ThemeContext";

const Topbar = () => {
  const { user, logout } = useAuth();
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="glass mx-3 mt-3 flex items-center justify-between rounded-2xl px-5 py-3">
      <p className="text-sm text-slate-500 dark:text-slate-300">Welcome back, <span className="font-semibold text-indigo-400">{user?.name}</span></p>
      <div className="flex items-center gap-3">
        <button onClick={toggleTheme} className="rounded-xl bg-slate-100 p-2 transition hover:scale-105 dark:bg-slate-800">
          {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
        </button>
        <button onClick={logout} className="rounded-xl bg-rose-500/90 p-2 text-white transition hover:bg-rose-500">
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
};

export default Topbar;
