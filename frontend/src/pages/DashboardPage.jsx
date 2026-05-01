import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import StatCard from "../components/StatCard";
import api from "../services/api";

const DashboardPage = () => {
  const [stats, setStats] = useState({ totalTasks: 0, completedTasks: 0, pendingTasks: 0, overdueTasks: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        const { data } = await api.get("/dashboard");
        setStats(data);
      } catch (error) {
        toast.error(error.response?.data?.message || "Failed to load dashboard");
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  if (loading) {
    return <div className="glass rounded-2xl p-6 text-sm text-slate-500 dark:text-slate-300">Loading dashboard...</div>;
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      <StatCard title="Total Tasks" value={stats.totalTasks} accent="text-indigo-500" />
      <StatCard title="Completed" value={stats.completedTasks} accent="text-emerald-500" />
      <StatCard title="Pending" value={stats.pendingTasks} accent="text-amber-500" />
      <StatCard title="Overdue" value={stats.overdueTasks} accent="text-rose-500" />
    </div>
  );
};

export default DashboardPage;
