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
const HowItWorks = () => {
  return (
    <div>
            <section
        id="how-it-works"
        className="bg-slate-50 py-24 sm:py-28"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-10">

          {/* Heading */}
          <div className="mx-auto max-w-2xl text-center">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
              How it works
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight text-slate-950 sm:text-4xl lg:text-5xl">
              Start banking in three simple steps.
            </h2>

            <p className="mt-5 text-base leading-7 text-slate-500 sm:text-lg">
              Everything is designed to keep your banking experience
              straightforward from registration to transaction.
            </p>
          </div>

          {/* Steps */}
          <div className="relative mt-16 grid gap-10 md:grid-cols-3 md:gap-8">

            {/* Connecting line - desktop */}
            <div className="absolute left-[16.67%] right-[16.67%] top-7 hidden h-px bg-slate-200 md:block" />

            {/* Step 1 */}
            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-950 text-sm font-bold text-white shadow-lg">
                01
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Create your account
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Register with your details and securely create your
                banking account.
              </p>

            </div>

            {/* Step 2 */}
            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-blue-600 text-sm font-bold text-white shadow-lg">
                02
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Manage your account
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Access your dashboard, view balances, and keep track
                of your banking activity.
              </p>

            </div>

            {/* Step 3 */}
            <div className="relative text-center">

              <div className="relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 border-slate-50 bg-slate-950 text-sm font-bold text-white shadow-lg">
                03
              </div>

              <h3 className="mt-6 text-xl font-bold text-slate-950">
                Transfer & track
              </h3>

              <p className="mx-auto mt-3 max-w-sm text-sm leading-6 text-slate-500">
                Send money securely and review every transaction
                from your transaction history.
              </p>

            </div>

          </div>
        </div>
      </section>
    </div>
  )
}

export default HowItWorks
