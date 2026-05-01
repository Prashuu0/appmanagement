import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const SignupPage = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "", role: "member" });
  const { signup } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (form.password.length < 6) return toast.error("Password must be at least 6 chars");
    try {
      await signup(form);
      toast.success("Account created");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Signup failed");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-950 lg:grid-cols-2">
      <div className="hidden items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 p-10 text-white lg:flex">
        <h1 className="text-5xl font-bold">Build high-performing teams.</h1>
      </div>
      <div className="grid place-items-center p-6">
        <motion.form initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-8">
          <h2 className="mb-6 text-2xl font-semibold">Create account</h2>
          <div className="space-y-4">
            <input required placeholder="Full name" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.name} onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))} />
            <input required type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            <input required type="password" placeholder="Password" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
            <select className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.role} onChange={(e) => setForm((p) => ({ ...p, role: e.target.value }))}>
              <option value="member">Member</option>
              <option value="admin">Admin</option>
            </select>
            <button className="w-full rounded-xl bg-indigo-500 py-2 font-semibold text-white transition hover:bg-indigo-600">Sign up</button>
          </div>
          <p className="mt-4 text-sm">Already have an account? <Link className="text-indigo-400" to="/login">Login</Link></p>
        </motion.form>
      </div>
    </div>
  );
};

export default SignupPage;
