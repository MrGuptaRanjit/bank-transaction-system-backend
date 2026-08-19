import { Mail, User, ShieldCheck } from "lucide-react";
import { useAuth } from "../../context/AuthContext";

const Profile = () => {
  const { user } = useAuth();

  return (
    <div className="-m-6 min-h-screen bg-slate-950 p-6 pb-24 text-white lg:pb-6">

      <div className="mx-auto max-w-4xl space-y-6">

        {/* ==================== PAGE HEADER ==================== */}
        <div>
          <h1 className="text-2xl font-semibold text-white">
            Profile
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your personal account information.
          </p>
        </div>

        {/* ==================== PROFILE CARD ==================== */}
        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-xl">

          {/* Profile Header */}
          <div className="border-b border-white/10 p-6">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">

              {/* Avatar */}
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-2xl font-semibold text-blue-400 ring-1 ring-blue-500/20">
                {user?.name?.charAt(0)?.toUpperCase() || "U"}
              </div>

              {/* User Information */}
              <div className="min-w-0">

                <h2 className="text-xl font-semibold text-white">
                  {user?.name || "User"}
                </h2>

                <p className="mt-1 break-all text-sm text-slate-400">
                  {user?.email || "No email available"}
                </p>

                {/* Account Status */}
                <div className="mt-3 inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <ShieldCheck size={14} />
                  Account Active
                </div>

              </div>

            </div>
          </div>

          {/* ==================== PERSONAL INFORMATION ==================== */}
          <div className="p-6">

            <h3 className="mb-5 text-lg font-semibold text-white">
              Personal Information
            </h3>

            <div className="grid gap-4 sm:grid-cols-2">

              {/* Full Name */}
              <div className="rounded-xl border border-white/10 bg-slate-950 p-4 transition hover:border-blue-500/20">

                <div className="mb-2 flex items-center gap-2 text-slate-400">

                  <User size={16} />

                  <span className="text-xs font-medium">
                    Full Name
                  </span>

                </div>

                <p className="font-medium text-white">
                  {user?.name || "Not available"}
                </p>

              </div>

              {/* Email */}
              <div className="rounded-xl border border-white/10 bg-slate-950 p-4 transition hover:border-blue-500/20">

                <div className="mb-2 flex items-center gap-2 text-slate-400">

                  <Mail size={16} />

                  <span className="text-xs font-medium">
                    Email Address
                  </span>

                </div>

                <p className="break-all font-medium text-white">
                  {user?.email || "Not available"}
                </p>

              </div>

            </div>

          </div>

        </div>

        {/* ==================== SECURITY CARD ==================== */}
        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6 shadow-xl">

          <div className="flex items-start gap-4">

            {/* Icon */}
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 ring-1 ring-blue-500/10">
              <ShieldCheck size={20} />
            </div>

            {/* Content */}
            <div>

              <h3 className="font-semibold text-white">
                Account Security
              </h3>

              <p className="mt-1 text-sm leading-6 text-slate-400">
                Your account is protected using authenticated sessions.
                Sensitive authentication information is not displayed here.
              </p>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Profile;