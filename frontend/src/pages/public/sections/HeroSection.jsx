import {
  ArrowRight,
  CheckCircle2,
  ShieldCheck,
  TrendingUp,
} from "lucide-react";
import Button from "../../../components/ui/Button";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden bg-slate-950">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute left-1/2 top-0 h-[500px] w-[500px] -translate-x-1/2 rounded-full bg-blue-600/10 blur-3xl" />

        <div className="absolute -right-40 top-40 h-80 w-80 rounded-full bg-blue-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-36 sm:px-8 sm:pb-24 sm:pt-40 lg:px-10 lg:pb-28 lg:pt-44">
        <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">

          {/* Content */}
          <div className="max-w-2xl">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-sm font-medium text-blue-200 backdrop-blur-sm">
              <ShieldCheck size={16} className="text-blue-400" />
              Secure digital banking
            </div>

            {/* Heading */}
            <h1 className="mt-7 text-4xl font-bold leading-[1.05] tracking-tight text-white sm:text-5xl lg:text-6xl">
              Banking that puts
              <span className="block text-blue-500">
                you in control.
              </span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-xl text-base leading-7 text-slate-400 sm:text-lg">
              Manage your accounts, move money securely, and keep track
              of every transaction from one simple banking platform.
            </p>

            {/* Actions */}
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                to="/register"
                variant="primary"
                className="group"
              >
                Open an account
                <ArrowRight
                  size={18}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </Button>

              <Button
                to="/login"
                variant="secondary"
              >
                Sign in
              </Button>
            </div>

            {/* Trust points */}
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Secure access
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Easy transfers
              </div>

              <div className="flex items-center gap-2 text-sm text-slate-400">
                <CheckCircle2
                  size={16}
                  className="text-emerald-400"
                />
                Transaction tracking
              </div>
            </div>
          </div>

          {/* Banking Card */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">

            {/* Glow */}
            <div className="absolute -inset-5 rounded-[2rem] bg-blue-500/10 blur-3xl" />

            <div className="relative rounded-[2rem] border border-white/10 bg-white/[0.06] p-5 shadow-2xl backdrop-blur-xl sm:p-6">

              {/* Card Header */}
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-slate-400">
                    Total balance
                  </p>

                  <p className="mt-2 text-3xl font-bold tracking-tight text-white">
                    ₹84,250.00
                  </p>
                </div>

                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                  <TrendingUp size={21} />
                </div>
              </div>

              {/* Balance chart */}
              <div className="mt-8 rounded-2xl border border-white/10 bg-slate-950/50 p-4">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-slate-500">
                    Monthly activity
                  </p>

                  <p className="text-xs font-medium text-emerald-400">
                    +12.8%
                  </p>
                </div>

                <div className="mt-5 flex h-28 items-end gap-2">
                  {[35, 48, 42, 62, 55, 72, 68, 84, 76, 92].map(
                    (height, index) => (
                      <div
                        key={index}
                        className="flex-1 rounded-t-md bg-blue-500/70 transition-all duration-300 hover:bg-blue-400"
                        style={{ height: `${height}%` }}
                      />
                    )
                  )}
                </div>
              </div>

              {/* Recent activity */}
              <div className="mt-5">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-white">
                    Recent activity
                  </p>

                  <span className="text-xs text-slate-500">
                    Today
                  </span>
                </div>

                <div className="mt-4 space-y-3">

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-400">
                        <TrendingUp size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Money received
                        </p>

                        <p className="text-xs text-slate-500">
                          Today, 10:42 AM
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-emerald-400">
                      +₹5,000
                    </p>
                  </div>

                  <div className="flex items-center justify-between rounded-xl border border-white/5 bg-white/[0.03] p-3">
                    <div className="flex items-center gap-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-blue-500/10 text-blue-400">
                        <ArrowRight size={16} />
                      </div>

                      <div>
                        <p className="text-sm font-medium text-white">
                          Transfer sent
                        </p>

                        <p className="text-xs text-slate-500">
                          Today, 09:18 AM
                        </p>
                      </div>
                    </div>

                    <p className="text-sm font-semibold text-white">
                      -₹2,500
                    </p>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;