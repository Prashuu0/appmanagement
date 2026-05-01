import { motion } from "framer-motion";
import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const LoginPage = () => {
  const [form, setForm] = useState({ email: "", password: "" });
  const { login } = useAuth();
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form);
      toast.success("Logged in");
      navigate("/");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="grid min-h-screen grid-cols-1 bg-slate-950 lg:grid-cols-2">
      <div className="hidden items-center justify-center bg-gradient-to-br from-indigo-600 to-purple-600 p-10 text-white lg:flex">
        <h1 className="text-5xl font-bold">Manage teams with clarity.</h1>
      </div>
      <div className="grid place-items-center p-6">
        <motion.form initial={{ y: 14, opacity: 0 }} animate={{ y: 0, opacity: 1 }} onSubmit={submit} className="glass w-full max-w-md rounded-2xl p-8">
          <h2 className="mb-6 text-2xl font-semibold">Login</h2>
          <div className="space-y-4">
            <input required type="email" placeholder="Email" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.email} onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))} />
            <input required type="password" placeholder="Password" className="w-full rounded-xl border border-slate-300 bg-transparent px-3 py-2" value={form.password} onChange={(e) => setForm((p) => ({ ...p, password: e.target.value }))} />
            <button className="w-full rounded-xl bg-indigo-500 py-2 font-semibold text-white transition hover:bg-indigo-600">Login</button>
          </div>
          <p className="mt-4 text-sm">No account? <Link className="text-indigo-400" to="/signup">Create one</Link></p>
        </motion.form>
      </div>
    </div>
  );
};

export default LoginPage;
