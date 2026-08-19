import { useEffect, useState } from "react";
import {
  WalletCards,
  Plus,
  RefreshCw,
  CheckCircle2,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

const Accounts = () => {
  const [accounts, setAccounts] = useState([]);
  const [balances, setBalances] = useState({});
  const [loading, setLoading] = useState(true);
  const [creating, setCreating] = useState(false);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch user's accounts
  // ==========================================

  const fetchAccounts = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/accounts");

      const fetchedAccounts = response.data.accounts || [];

      setAccounts(fetchedAccounts);

      // Fetch balance for every account
      const balanceResults = await Promise.all(
        fetchedAccounts.map(async (account) => {
          try {
            const balanceResponse = await api.get(
              `/accounts/balance/${account._id}`
            );

            return {
              id: account._id,
              balance: balanceResponse.data.balance,
            };
          } catch (error) {
            console.error(
              `Failed to fetch balance for account ${account._id}`,
              error
            );

            return {
              id: account._id,
              balance: 0,
            };
          }
        })
      );

      const balanceMap = {};

      balanceResults.forEach((item) => {
        balanceMap[item.id] = item.balance;
      });

      setBalances(balanceMap);
    } catch (error) {
      console.error("Failed to fetch accounts:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your accounts."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // Create new account
  // ==========================================

  const handleCreateAccount = async () => {
    try {
      setCreating(true);
      setError("");

      await api.post("/accounts");

      await fetchAccounts();
    } catch (error) {
      console.error("Failed to create account:", error);

      setError(
        error.response?.data?.message ||
          "Unable to create account."
      );
    } finally {
      setCreating(false);
    }
  };

  // ==========================================
  // Initial load
  // ==========================================

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ==========================================
  // Loading state
  // ==========================================

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Accounts
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your bank accounts and balances.
          </p>
        </div>

        <div className="flex min-h-[300px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900">
          <div className="flex items-center gap-3 text-slate-400">
            <RefreshCw
              size={20}
              className="animate-spin"
            />
            Loading accounts...
          </div>
        </div>

      </div>
    );
  }

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <div className="mx-auto max-w-6xl space-y-6">

      {/* ======================================
          Page Header
      ====================================== */}

      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Accounts
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Manage your bank accounts and balances.
          </p>
        </div>

        <button
          onClick={handleCreateAccount}
          disabled={creating}
          className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {creating ? (
            <>
              <RefreshCw
                size={17}
                className="animate-spin"
              />
              Creating...
            </>
          ) : (
            <>
              <Plus size={18} />
              Create Account
            </>
          )}
        </button>

      </div>

      {/* ======================================
          Error
      ====================================== */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">
          <AlertCircle size={18} />
          {error}
        </div>
      )}

      {/* ======================================
          No Accounts
      ====================================== */}

      {accounts.length === 0 ? (
        <div className="flex min-h-[350px] flex-col items-center justify-center rounded-2xl border border-white/10 bg-slate-900 px-6 text-center">

          <div className="mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/10 text-blue-400">
            <WalletCards size={30} />
          </div>

          <h2 className="text-lg font-semibold text-white">
            No accounts yet
          </h2>

          <p className="mt-2 max-w-md text-sm leading-6 text-slate-400">
            Create your first bank account to start
            using the banking system.
          </p>

          <button
            onClick={handleCreateAccount}
            disabled={creating}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:opacity-60"
          >
            <Plus size={18} />
            Create Your Account
          </button>

        </div>
      ) : (
        /* ====================================
           Accounts List
        ==================================== */

        <div className="grid gap-5 lg:grid-cols-2">

          {accounts.map((account) => {
            const balance = balances[account._id] ?? 0;

            return (
              <div
                key={account._id}
                className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900"
              >

                {/* Account Header */}
                <div className="flex items-center justify-between border-b border-white/10 p-6">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-blue-500/10 text-blue-400">
                      <WalletCards size={22} />
                    </div>

                    <div>
                      <p className="text-sm font-medium text-white">
                        Bank Account
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        ID: {account._id}
                      </p>
                    </div>

                  </div>

                  <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                    <CheckCircle2 size={14} />
                    {account.status || "ACTIVE"}
                  </div>

                </div>

                {/* Balance */}
                <div className="p-6">

                  <p className="text-sm text-slate-400">
                    Available Balance
                  </p>

                  <p className="mt-2 text-3xl font-semibold text-white">
                    ₹{Number(balance).toLocaleString("en-IN")}
                  </p>

                  <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                    <span>Account ID</span>

                    <span className="max-w-[220px] truncate font-mono">
                      {account._id}
                    </span>
                  </div>

                </div>

              </div>
            );
          })}

        </div>
      )}

    </div>
  );
};

export default Accounts;