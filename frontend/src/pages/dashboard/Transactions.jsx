import { useEffect, useState } from "react";
import {
  ArrowDownLeft,
  ArrowUpRight,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import api from "../../services/api";

const Transactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ==========================================
  // Fetch transactions
  // ==========================================

  const fetchTransactions = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await api.get("/transaction");

      setTransactions(
        response.data.transactions || []
      );

    } catch (error) {
      console.error(
        "Failed to fetch transactions:",
        error
      );

      setError(
        error.response?.data?.message ||
          "Unable to load transactions."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, []);

  // ==========================================
  // Format date
  // ==========================================

  const formatDate = (date) => {
    return new Date(date).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  // ==========================================
  // Loading
  // ==========================================

  if (loading) {
    return (
      <div className="mx-auto max-w-6xl">

        <div className="flex min-h-[400px] items-center justify-center">

          <div className="flex items-center gap-3 text-slate-400">

            <RefreshCw
              size={20}
              className="animate-spin"
            />

            Loading transactions...

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

      {/* Header */}

      <div className="flex items-center justify-between">

        <div>

          <h1 className="text-2xl font-semibold text-white">
            Transactions
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            View your recent money transfers.
          </p>

        </div>

        <button
          onClick={fetchTransactions}
          className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-slate-900 px-4 py-2.5 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white"
        >
          <RefreshCw size={16} />
          Refresh
        </button>

      </div>

      {/* Error */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

          <AlertCircle size={18} />

          {error}

        </div>
      )}

      {/* Empty State */}

      {!error && transactions.length === 0 && (
        <div className="flex min-h-[350px] items-center justify-center rounded-2xl border border-white/10 bg-slate-900">

          <div className="text-center">

            <p className="text-lg font-medium text-white">
              No transactions yet
            </p>

            <p className="mt-2 text-sm text-slate-400">
              Your transactions will appear here.
            </p>

          </div>

        </div>
      )}

      {/* Transactions */}

      {transactions.length > 0 && (

        <div className="overflow-hidden rounded-2xl border border-white/10 bg-slate-900">

          {/* Table Header */}

          <div className="grid grid-cols-12 border-b border-white/10 px-6 py-4 text-xs font-medium uppercase tracking-wide text-slate-500">

            <div className="col-span-4">
              Transaction
            </div>

            <div className="col-span-2">
              Amount
            </div>

            <div className="col-span-2">
              Status
            </div>

            <div className="col-span-4 text-right">
              Date
            </div>

          </div>

          {/* Rows */}

          {transactions.map((transaction) => {

            const isReceived =
              transaction.direction === "RECEIVED";

            return (

              <div
                key={transaction._id}
                className="grid grid-cols-12 items-center border-b border-white/5 px-6 py-5 last:border-b-0 hover:bg-white/[0.02]"
              >

                {/* Transaction */}

                <div className="col-span-4 flex items-center gap-3">

                  <div
                    className={`flex h-10 w-10 items-center justify-center rounded-xl ${
                      isReceived
                        ? "bg-emerald-500/10 text-emerald-400"
                        : "bg-blue-500/10 text-blue-400"
                    }`}
                  >

                    {isReceived ? (
                      <ArrowDownLeft size={19} />
                    ) : (
                      <ArrowUpRight size={19} />
                    )}

                  </div>

                  <div>

                    <p className="text-sm font-medium text-white">
                      {isReceived
                        ? "Money Received"
                        : "Money Sent"}
                    </p>

                    <p className="mt-1 max-w-[180px] truncate font-mono text-xs text-slate-500">
                      {transaction._id}
                    </p>

                  </div>

                </div>

                {/* Amount */}

                <div className="col-span-2">

                  <p
                    className={`text-sm font-semibold ${
                      isReceived
                        ? "text-emerald-400"
                        : "text-white"
                    }`}
                  >
                    {isReceived ? "+" : "-"}₹
                    {Number(
                      transaction.amount
                    ).toLocaleString("en-IN")}
                  </p>

                </div>

                {/* Status */}

                <div className="col-span-2">

                  <span
                    className={`rounded-full px-3 py-1 text-xs font-medium ${
                      transaction.status ===
                      "COMPLETED"
                        ? "bg-emerald-500/10 text-emerald-400"
                        : transaction.status ===
                          "PENDING"
                        ? "bg-yellow-500/10 text-yellow-400"
                        : "bg-red-500/10 text-red-400"
                    }`}
                  >
                    {transaction.status}
                  </span>

                </div>

                {/* Date */}

                <div className="col-span-4 text-right">

                  <p className="text-sm text-slate-300">
                    {formatDate(
                      transaction.createdAt
                    )}
                  </p>

                </div>

              </div>

            );
          })}

        </div>

      )}

    </div>
  );
};

export default Transactions;