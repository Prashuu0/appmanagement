import { motion } from "framer-motion";

const TaskModal = ({ open, onClose, onSubmit, values, setValues, members, projects }) => {
  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <motion.form initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onSubmit={submit} className="glass w-full max-w-lg rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-semibold">Create Task</h2>
        <div className="space-y-3">
          <input className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" placeholder="Title" value={values.title} onChange={(e) => setValues((p) => ({ ...p, title: e.target.value }))} />
          <textarea className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" placeholder="Description" value={values.description} onChange={(e) => setValues((p) => ({ ...p, description: e.target.value }))} />
          <select className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={values.projectId} onChange={(e) => setValues((p) => ({ ...p, projectId: e.target.value }))}>
            <option value="">Select project</option>
            {projects.map((project) => <option key={project._id} value={project._id}>{project.title}</option>)}
          </select>
          <select className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={values.assignedTo} onChange={(e) => setValues((p) => ({ ...p, assignedTo: e.target.value }))}>
            <option value="">Assign member</option>
            {members.map((member) => <option key={member._id} value={member._id}>{member.name}</option>)}
          </select>
          <input type="date" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={values.deadline} onChange={(e) => setValues((p) => ({ ...p, deadline: e.target.value }))} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2">Cancel</button>
          <button type="submit" className="rounded-xl bg-indigo-500 px-4 py-2 font-medium text-white">Create</button>
        </div>
      </motion.form>
    </div>
  );
};

export default TaskModal;
