import {
  ArrowRight,
  CheckCircle2,
  Eye,
  LockKeyhole,
  ReceiptText,
  ShieldCheck,
  TrendingUp,
  Wallet,
} from "lucide-react";

const FeaturesSection = () => {
  return (
    <div>
       <section
        id="features"
        className="bg-white py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Section heading */}
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              Banking made simple
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Everything you need to manage your money.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
              A focused banking experience built around accounts,
              transfers, and complete transaction visibility.
            </p>
          </div>

          {/* Feature cards */}
          <div className="mt-14 grid gap-5 md:grid-cols-3">

            {/* Account Management */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors duration-300 group-hover:bg-blue-600">
                <Wallet size={21} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Account management
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                View your accounts, monitor balances, and keep your
                banking information organized from one dashboard.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
                Manage accounts
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>

            {/* Transfers */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors duration-300 group-hover:bg-blue-600">
                <ArrowRight size={21} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Secure transfers
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Send money between accounts through a clear and
                secure transfer workflow with proper transaction tracking.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
                Send money
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>

            {/* Transactions */}
            <div className="group rounded-2xl border border-slate-200 bg-white p-7 transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-xl hover:shadow-slate-200/50 sm:p-8">

              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-950 text-white transition-colors duration-300 group-hover:bg-blue-600">
                <TrendingUp size={21} />
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Transaction visibility
              </h3>

              <p className="mt-3 text-sm leading-6 text-slate-500">
                Review your transaction history and understand exactly
                where your money is moving.
              </p>

              <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-slate-900">
                View transactions
                <ArrowRight
                  size={16}
                  className="transition-transform duration-200 group-hover:translate-x-1"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default FeaturesSection
