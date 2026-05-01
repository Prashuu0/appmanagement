import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import TaskModal from "../components/TaskModal";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const statusColors = {
  pending: "bg-amber-500/20 text-amber-600",
  "in-progress": "bg-blue-500/20 text-blue-600",
  completed: "bg-emerald-500/20 text-emerald-600",
};

const TasksPage = () => {
  const { user } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "", projectId: "", assignedTo: "", deadline: "" });
  const availableMembers = useMemo(() => {
    const selectedProject = projects.find((project) => project._id === form.projectId);
    if (!selectedProject) return members;
    return members.filter((member) => selectedProject.members?.some((pMember) => pMember._id === member._id));
  }, [form.projectId, members, projects]);

  const load = async () => {
    const [tasksRes, projectsRes] = await Promise.all([api.get("/tasks"), api.get("/projects")]);
    setTasks(tasksRes.data);
    setProjects(projectsRes.data);
    if (user.role === "admin") {
      const usersRes = await api.get("/users");
      setMembers(usersRes.data.filter((u) => u.role === "member"));
    }
  };

  useEffect(() => {
    load();
  }, []);

  const overdueMap = useMemo(() => {
    const now = Date.now();
    return Object.fromEntries(tasks.map((task) => [task._id, task.deadline && task.status !== "completed" && new Date(task.deadline).getTime() < now]));
  }, [tasks]);

  const createTask = async () => {
    try {
      await api.post("/tasks", form);
      toast.success("Task created");
      setOpen(false);
      setForm({ title: "", description: "", projectId: "", assignedTo: "", deadline: "" });
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to create task");
    }
  };

  const updateStatus = async (taskId, status) => {
    await api.put(`/tasks/${taskId}`, { status });
    load();
  };

  const deleteTask = async (taskId) => {
    try {
      await api.delete(`/tasks/${taskId}`);
      toast.success("Task deleted");
      load();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed to delete task");
    }
  };

  return (
    <div className="space-y-4">
      {user?.role === "admin" && <button onClick={() => setOpen(true)} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">+ Create Task</button>}
      <div className="grid gap-4 md:grid-cols-2">
        {tasks.map((task) => (
          <div key={task._id} className={`glass rounded-2xl p-4 ${overdueMap[task._id] ? "border-rose-500/70" : ""}`}>
            <div className="flex items-start justify-between">
              <h3 className="text-lg font-semibold">{task.title}</h3>
              <span className={`rounded-lg px-2 py-1 text-xs font-semibold ${statusColors[task.status]}`}>{task.status.replace("-", " ")}</span>
            </div>
            <p className="mt-2 text-sm text-slate-500 dark:text-slate-300">{task.description || "No description"}</p>
            <p className="mt-2 text-sm">Project: {task.projectId?.title}</p>
            <p className="mt-1 text-sm">Assignee: {task.assignedTo?.name}</p>
            {task.deadline && <p className={`mt-1 text-sm ${overdueMap[task._id] ? "text-rose-500" : ""}`}>Deadline: {new Date(task.deadline).toLocaleDateString()}</p>}
            <select className="mt-3 w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={task.status} onChange={(e) => updateStatus(task._id, e.target.value)} disabled={user?.role !== "member"}>
              <option value="pending">pending</option>
              <option value="in-progress">in-progress</option>
              <option value="completed">completed</option>
            </select>
            {user?.role === "admin" && (
              <button onClick={() => deleteTask(task._id)} className="mt-3 w-full rounded-xl bg-rose-500 px-3 py-2 text-white">
                Delete Task
              </button>
            )}
          </div>
        ))}
      </div>
      <TaskModal open={open} onClose={() => setOpen(false)} onSubmit={createTask} values={form} setValues={setForm} members={availableMembers} projects={projects} />
    </div>
  );
};

export default TasksPage;
