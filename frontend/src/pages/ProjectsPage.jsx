import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import ProjectModal from "../components/ProjectModal";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const ProjectsPage = () => {
  const { user } = useAuth();
  const [projects, setProjects] = useState([]);
  const [members, setMembers] = useState([]);
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({ title: "", description: "" });
  const [selectedByProject, setSelectedByProject] = useState({});

  const loadProjects = async () => {
    const { data } = await api.get("/projects");
    setProjects(data);
    if (user?.role === "admin") {
      const usersRes = await api.get("/users");
      setMembers(usersRes.data.filter((u) => u.role === "member"));
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const createProject = async () => {
    try {
      await api.post("/projects", form);
      setForm({ title: "", description: "" });
      setOpen(false);
      toast.success("Project created");
      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Failed");
    }
  };

  const addMemberToProject = async (projectId) => {
    const selectedUserId = selectedByProject[projectId];
    if (!selectedUserId) return;
    try {
      await api.post(`/projects/${projectId}/add-member`, { userId: selectedUserId });
      toast.success("Member added");
      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not add member");
    }
  };

  const removeMemberFromProject = async (projectId, memberId) => {
    try {
      await api.patch(`/projects/${projectId}/members/remove`, { userId: memberId });
      toast.success("Member removed");
      loadProjects();
    } catch (error) {
      toast.error(error.response?.data?.message || "Could not remove member");
    }
  };

  return (
    <div className="space-y-4">
      {user?.role === "admin" && <button onClick={() => setOpen(true)} className="rounded-xl bg-indigo-500 px-4 py-2 text-white">+ Create Project</button>}
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
        {projects.map((project) => (
          <div key={project._id} className="glass rounded-2xl p-4">
            <h3 className="text-lg font-semibold">{project.title}</h3>
            <p className="mt-1 text-sm text-slate-500 dark:text-slate-300">{project.description || "No description"}</p>
            <p className="mt-3 text-sm">Members: {project.members?.length || 0}</p>
            {user?.role === "admin" && (
              <>
                <div className="mt-3 flex gap-2">
                  <select
                    className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2"
                    value={selectedByProject[project._id] || ""}
                    onChange={(e) => setSelectedByProject((prev) => ({ ...prev, [project._id]: e.target.value }))}
                  >
                    <option value="">Select member</option>
                    {members.map((member) => (
                      <option key={member._id} value={member._id}>{member.name}</option>
                    ))}
                  </select>
                  <button onClick={() => addMemberToProject(project._id)} className="rounded-xl bg-indigo-500 px-3 py-2 text-white">Add</button>
                </div>
                <div className="mt-3 flex flex-wrap gap-2">
                  {project.members?.filter((m) => m.role === "member").map((member) => (
                    <button key={member._id} onClick={() => removeMemberFromProject(project._id, member._id)} className="rounded-full border border-rose-400/50 px-3 py-1 text-xs text-rose-500">
                      Remove {member.name}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        ))}
      </div>
      <ProjectModal open={open} onClose={() => setOpen(false)} onSubmit={createProject} values={form} setValues={setForm} />
    </div>
  );
};

export default ProjectsPage;
