import { ShieldCheck } from "lucide-react";
import Logo from "../ui/Logo";

const AuthLayout = ({ children, title, subtitle }) => {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Background */}
      <div className="fixed inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute -right-40 bottom-0 h-96 w-96 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative flex min-h-screen flex-col">

        {/* Header */}
        <header className="border-b border-white/10">
          <div className="mx-auto flex w-full max-w-7xl items-center px-5 py-5 sm:px-8 lg:px-10">
            <Logo light />
          </div>
        </header>

        {/* Main */}
        <main className="flex flex-1 items-center justify-center px-5 py-12 sm:px-8">
          <div className="w-full max-w-md">

            {/* Heading */}
            <div className="mb-8 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
                <ShieldCheck size={24} />
              </div>

              <h1 className="mt-5 text-3xl font-bold tracking-tight">
                {title}
              </h1>

              <p className="mt-3 text-sm leading-6 text-slate-400">
                {subtitle}
              </p>
            </div>

            {/* Auth Card */}
            <div className="rounded-3xl border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur-xl sm:p-8">
              {children}
            </div>

          </div>
        </main>

        {/* Footer */}
        <footer className="px-5 py-6 text-center">
          <p className="text-xs text-slate-500">
            Your security and privacy are our priority.
          </p>
        </footer>

      </div>
    </div>
  );
};

export default AuthLayout;