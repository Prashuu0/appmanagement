import { useAuth } from "../context/AuthContext";

const ProfilePage = () => {
  const { user, logout } = useAuth();
  return (
    <div className="glass max-w-xl rounded-2xl p-6">
      <h2 className="mb-1 text-xl font-semibold">Profile</h2>
      <p className="mb-5 text-sm text-slate-500 dark:text-slate-300">Your account details and access role.</p>
      <div className="space-y-3 text-sm">
        <p><span className="font-medium">Name:</span> {user?.name}</p>
        <p><span className="font-medium">Email:</span> {user?.email}</p>
        <p><span className="font-medium">Role:</span> <span className="capitalize">{user?.role}</span></p>
      </div>
      <button onClick={logout} className="mt-6 rounded-xl bg-rose-500 px-4 py-2 text-sm font-medium text-white transition hover:bg-rose-600">Logout</button>
    </div>
  );
};

export default ProfilePage;
