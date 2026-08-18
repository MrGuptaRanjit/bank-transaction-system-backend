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
import { Link } from "react-router-dom";


const FinalCTA = () => {
  return (
    <div>
      <section className="bg-slate-50 px-5 py-20 sm:px-8 sm:py-24">
        <div className="mx-auto max-w-5xl overflow-hidden rounded-3xl bg-blue-600 px-6 py-14 text-center shadow-xl shadow-blue-600/10 sm:px-12 sm:py-16">

          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-100">
            Ready to get started?
          </p>

          <h2 className="mx-auto mt-4 max-w-2xl text-3xl font-bold tracking-tight text-white sm:text-4xl lg:text-5xl">
            Take control of your banking today.
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-sm leading-6 text-blue-100 sm:text-base">
            Create your account and manage your money through a
            simple, secure digital banking experience.
          </p>

          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link
              to="/register"
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-blue-700 transition-colors duration-200 hover:bg-blue-50"
            >
              Create an account

              <ArrowRight
                size={18}
                className="transition-transform duration-200 group-hover:translate-x-1"
              />
            </Link>

            <Link
              to="/login"
              className="inline-flex items-center justify-center rounded-xl border border-white/20 bg-white/10 px-6 py-3.5 font-semibold text-white transition-colors duration-200 hover:bg-white/20"
            >
              Sign in
            </Link>
          </div>

        </div>
      </section>
    </div>
  )
}

export default FinalCTA
