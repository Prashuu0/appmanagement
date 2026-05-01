import { motion } from "framer-motion";

const ProjectModal = ({ open, onClose, onSubmit, values, setValues }) => {
  if (!open) return null;

  const submit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-4">
      <motion.form initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} onSubmit={submit} className="glass w-full max-w-lg rounded-2xl p-6">
        <h2 className="mb-4 text-xl font-semibold">Create Project</h2>
        <div className="space-y-3">
          <input className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" placeholder="Project title" value={values.title} onChange={(e) => setValues((p) => ({ ...p, title: e.target.value }))} />
          <textarea className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" placeholder="Description" value={values.description} onChange={(e) => setValues((p) => ({ ...p, description: e.target.value }))} />
        </div>
        <div className="mt-5 flex justify-end gap-2">
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-300 px-4 py-2">Cancel</button>
          <button type="submit" className="rounded-xl bg-indigo-500 px-4 py-2 font-medium text-white">Create</button>
        </div>
      </motion.form>
    </div>
  );
};

export default ProjectModal;
