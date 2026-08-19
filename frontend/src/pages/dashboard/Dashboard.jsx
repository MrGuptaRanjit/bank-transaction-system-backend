import { useEffect, useState } from "react";
import {
  WalletCards,
  Send,
  ArrowLeftRight,
  Plus,
  RefreshCw,
  TrendingUp,
} from "lucide-react";
import { Link } from "react-router-dom";

import api from "../../services/api";
import { useAuth } from "../../context/AuthContext";

const Dashboard = () => {
  const { user } = useAuth();

  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchDashboardData = async () => {
    try {
      setIsLoading(true);
      setError("");

      const response = await api.get("/accounts");

      const userAccounts = response.data.accounts || [];

      setAccounts(userAccounts);

      const balanceResults = await Promise.all(
        userAccounts.map(async (account) => {
          try {
            const balanceResponse = await api.get(
              `/accounts/balance/${account._id}`
            );

            return {
              accountId: account._id,
              balance: Number(balanceResponse.data.balance) || 0,
            };
          } catch (error) {
            console.error(
              `Failed to fetch balance for account ${account._id}`,
              error
            );

            return {
              accountId: account._id,
              balance: 0,
            };
          }
        })
      );

      const balanceMap = {};

      balanceResults.forEach((item) => {
        balanceMap[item.accountId] = item.balance;
      });

      setBalances(balanceMap);
    } catch (error) {
      console.error("Failed to load dashboard:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load dashboard data."
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const totalBalance = accounts.reduce((total, account) => {
    return total + (balances[account._id] || 0);
  }, 0);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl space-y-6">
        <div>
          <div className="h-8 w-56 animate-pulse rounded-lg bg-slate-800" />
          <div className="mt-2 h-4 w-72 animate-pulse rounded bg-slate-800" />
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((item) => (
            <div
              key={item}
              className="h-36 animate-pulse rounded-2xl border border-white/10 bg-slate-900"
            />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-7xl">
        <div className="rounded-2xl border border-red-500/20 bg-red-500/10 p-6">
          <h2 className="font-semibold text-red-400">
            Unable to load dashboard
          </h2>

          <p className="mt-2 text-sm text-slate-400">
            {error}
          </p>

          <button
            onClick={fetchDashboardData}
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-500/10 px-4 py-2 text-sm font-medium text-red-400 transition hover:bg-red-500/20"
          >
            <RefreshCw size={16} />
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl space-y-8">

      {/* ================= HEADER ================= */}

      <section>
        <p className="text-sm text-slate-400">
          Welcome back
        </p>

        <h1 className="mt-1 text-2xl font-semibold text-white sm:text-3xl">
          {user?.name || "User"}
        </h1>

        <p className="mt-2 text-sm text-slate-400">
          Here's an overview of your banking activity.
        </p>
      </section>

      {/* ================= OVERVIEW CARDS ================= */}

      <section className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">

        {/* Total Balance */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Total Balance
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">
                ₹{totalBalance.toLocaleString("en-IN")}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <TrendingUp size={21} />
            </div>

          </div>

          <p className="mt-4 text-xs text-slate-500">
            Across all your accounts
          </p>
        </div>

        {/* Accounts */}

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-6">
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Accounts
              </p>

              <p className="mt-3 text-3xl font-semibold text-white">
                {accounts.length}
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <WalletCards size={21} />
            </div>

          </div>

          <p className="mt-4 text-xs text-slate-500">
            Active banking accounts
          </p>
        </div>

        {/* Quick Transfer */}

        <Link
          to="/send-money"
          className="group rounded-2xl border border-white/10 bg-slate-900 p-6 transition hover:border-blue-500/30 hover:bg-slate-900/80"
        >
          <div className="flex items-center justify-between">

            <div>
              <p className="text-sm text-slate-400">
                Quick Transfer
              </p>

              <p className="mt-3 font-semibold text-white">
                Send Money
              </p>
            </div>

            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400 transition group-hover:bg-blue-500/20">
              <Send size={21} />
            </div>

          </div>

          <p className="mt-4 text-xs text-slate-500">
            Transfer money securely
          </p>
        </Link>

      </section>

      {/* ================= QUICK ACTIONS ================= */}

      <section>

        <div className="mb-4">
          <h2 className="text-lg font-semibold text-white">
            Quick Actions
          </h2>

          <p className="mt-1 text-sm text-slate-400">
            Common banking actions
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

          <Link
            to="/accounts"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-white/20 hover:bg-slate-800"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
              <WalletCards size={20} />
            </div>

            <div>
              <p className="font-medium text-white">
                View Accounts
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Manage your accounts
              </p>
            </div>
          </Link>

          <Link
            to="/send-money"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-white/20 hover:bg-slate-800"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10 text-emerald-400">
              <Send size={20} />
            </div>

            <div>
              <p className="font-medium text-white">
                Send Money
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Make a secure transfer
              </p>
            </div>
          </Link>

          <Link
            to="/transactions"
            className="flex items-center gap-4 rounded-2xl border border-white/10 bg-slate-900 p-5 transition hover:border-white/20 hover:bg-slate-800"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-purple-500/10 text-purple-400">
              <ArrowLeftRight size={20} />
            </div>

            <div>
              <p className="font-medium text-white">
                Transactions
              </p>

              <p className="mt-1 text-xs text-slate-500">
                View transaction activity
              </p>
            </div>
          </Link>

        </div>
      </section>

      {/* ================= ACCOUNTS ================= */}

      <section>

        <div className="mb-4 flex items-center justify-between">
          <div>
            <h2 className="text-lg font-semibold text-white">
              Your Accounts
            </h2>

            <p className="mt-1 text-sm text-slate-400">
              Overview of your bank accounts
            </p>
          </div>

          <Link
            to="/accounts"
            className="text-sm font-medium text-blue-400 hover:text-blue-300"
          >
            View all
          </Link>
        </div>

        {accounts.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-white/10 bg-slate-900 p-10 text-center">

            <WalletCards
              className="mx-auto text-slate-600"
              size={32}
            />

            <h3 className="mt-4 font-medium text-white">
              No accounts yet
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Create a bank account to start using the system.
            </p>

            <Link
              to="/accounts"
              className="mt-5 inline-flex items-center gap-2 rounded-xl bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-500"
            >
              <Plus size={16} />
              Create Account
            </Link>

          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">

            {accounts.map((account) => (
              <div
                key={account._id}
                className="rounded-2xl border border-white/10 bg-slate-900 p-6"
              >
                <div className="flex items-start justify-between">

                  <div>
                    <p className="text-sm text-slate-400">
                      Bank Account
                    </p>

                    <p className="mt-2 font-medium text-white">
                      •••• {account._id.slice(-4)}
                    </p>
                  </div>

                  <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    {account.status || "ACTIVE"}
                  </span>

                </div>

                <div className="mt-6">
                  <p className="text-xs text-slate-500">
                    Available Balance
                  </p>

                  <p className="mt-1 text-2xl font-semibold text-white">
                    ₹
                    {(balances[account._id] || 0).toLocaleString(
                      "en-IN"
                    )}
                  </p>
                </div>
              </div>
            ))}

          </div>
        )}

      </section>

    </div>
  );
};

export default Dashboard;