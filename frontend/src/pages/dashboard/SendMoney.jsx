import { useEffect, useState } from "react";
import {
  Send,
  WalletCards,
  ArrowRight,
  AlertCircle,
  RefreshCw,
  X,
  CheckCircle2,
  Loader2,
} from "lucide-react";

import api from "../../services/api";

const SendMoney = () => {
  const [accounts, setAccounts] = useState([]);
  const [loadingAccounts, setLoadingAccounts] = useState(true);

  const [fromAccount, setFromAccount] = useState("");
  const [toAccount, setToAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [note, setNote] = useState("");

  const [error, setError] = useState("");

  // Confirmation modal
  const [showConfirmation, setShowConfirmation] = useState(false);

  // Transaction state
  const [processing, setProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [transaction, setTransaction] = useState(null);

  // ==========================================
  // Fetch accounts
  // ==========================================

  const fetchAccounts = async () => {
    try {
      setLoadingAccounts(true);
      setError("");

      const response = await api.get("/accounts");

      const fetchedAccounts = response.data.accounts || [];

      setAccounts(fetchedAccounts);

      if (fetchedAccounts.length > 0) {
        const activeAccount = fetchedAccounts.find(
          (account) => account.status === "ACTIVE"
        );

        if (activeAccount) {
          setFromAccount(activeAccount._id);
        }
      }
    } catch (error) {
      console.error("Failed to fetch accounts:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load your accounts."
      );
    } finally {
      setLoadingAccounts(false);
    }
  };

  useEffect(() => {
    fetchAccounts();
  }, []);

  // ==========================================
  // Validation
  // ==========================================

  const validateForm = () => {
    if (!fromAccount) {
      setError("Please select a sender account.");
      return false;
    }

    if (!toAccount.trim()) {
      setError("Please enter the recipient account.");
      return false;
    }

    if (fromAccount === toAccount.trim()) {
      setError(
        "Sender and recipient accounts cannot be the same."
      );
      return false;
    }

    if (!amount) {
      setError("Please enter an amount.");
      return false;
    }

    if (Number(amount) <= 0) {
      setError("Amount must be greater than ₹0.");
      return false;
    }

    return true;
  };

  // ==========================================
  // Continue transfer
  // ==========================================

  const handleSubmit = (event) => {
    event.preventDefault();

    setError("");

    if (!validateForm()) {
      return;
    }

    setShowConfirmation(true);
  };

  // ==========================================
  // Confirm transaction
  // ==========================================

  const handleConfirmTransfer = async () => {
    try {
      setProcessing(true);
      setError("");

      /*
       * Generate a unique idempotency key.
       *
       * This prevents accidental duplicate
       * transactions if the request is retried.
       */
      const idempotencyKey =
        `${Date.now()}-${crypto.randomUUID()}`;

      const response = await api.post("/transaction", {
        fromAccount,
        toAccount: toAccount.trim(),
        amount: Number(amount),
        idempotencyKey,
      });

      setTransaction(response.data.transaction);

      setShowConfirmation(false);
      setSuccess(true);

    } catch (error) {
      console.error("Transaction failed:", error);

      setShowConfirmation(false);

      setError(
        error.response?.data?.message ||
          "Transaction failed. Please try again."
      );
    } finally {
      setProcessing(false);
    }
  };

  // ==========================================
  // Reset form
  // ==========================================

  const handleNewTransfer = () => {
    setSuccess(false);
    setTransaction(null);
    setToAccount("");
    setAmount("");
    setNote("");
    setError("");
  };

  // ==========================================
  // Loading accounts
  // ==========================================

  if (loadingAccounts) {
    return (
      <div className="mx-auto max-w-3xl space-y-6">

        <div>
          <h1 className="text-2xl font-semibold text-white">
            Send Money
          </h1>

          <p className="mt-1 text-sm text-slate-400">
            Transfer money securely between bank accounts.
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
  // Success screen
  // ==========================================

  if (success) {
    return (
      <div className="mx-auto max-w-2xl">

        <div className="rounded-2xl border border-white/10 bg-slate-900 p-8 text-center">

          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
            <CheckCircle2 size={34} />
          </div>

          <h1 className="mt-5 text-2xl font-semibold text-white">
            Transfer Successful
          </h1>

          <p className="mt-2 text-sm text-slate-400">
            Your money transfer has been completed successfully.
          </p>

          <div className="mt-6 rounded-xl border border-white/10 bg-slate-950 p-5 text-left">

            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-sm text-slate-400">
                Amount
              </span>

              <span className="text-lg font-semibold text-white">
                ₹{Number(amount).toLocaleString("en-IN")}
              </span>
            </div>

            <div className="mt-4 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-400">
                Transaction ID
              </span>

              <span className="max-w-[220px] truncate font-mono text-xs text-slate-300">
                {transaction?._id || "N/A"}
              </span>
            </div>

            <div className="mt-3 flex items-center justify-between gap-4">
              <span className="text-sm text-slate-400">
                Status
              </span>

              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                COMPLETED
              </span>
            </div>

          </div>

          <button
            onClick={handleNewTransfer}
            className="mt-6 inline-flex items-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600"
          >
            <Send size={17} />
            Make Another Transfer
          </button>

        </div>

      </div>
    );
  }

  // ==========================================
  // Main UI
  // ==========================================

  return (
    <div className="mx-auto max-w-3xl space-y-6">

      {/* Header */}

      <div>
        <h1 className="text-2xl font-semibold text-white">
          Send Money
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Transfer money securely between bank accounts.
        </p>
      </div>

      {/* Error */}

      {error && (
        <div className="flex items-center gap-3 rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-400">

          <AlertCircle size={18} />

          <span>{error}</span>

        </div>
      )}

      {/* Form */}

      <form
        onSubmit={handleSubmit}
        className="space-y-6 rounded-2xl border border-white/10 bg-slate-900 p-6"
      >

        {/* Sender */}

        <div>
          <label className="mb-2 block text-sm font-medium text-slate-300">
            From Account
          </label>

          <div className="relative">

            <WalletCards
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
            />

            <select
              value={fromAccount}
              onChange={(event) =>
                setFromAccount(event.target.value)
              }
              className="w-full appearance-none rounded-xl border border-white/10 bg-slate-950 px-11 py-3 text-sm text-white outline-none transition focus:border-blue-500"
            >

              <option value="" className="bg-slate-900">
                Select account
              </option>

              {accounts
                .filter(
                  (account) =>
                    account.status === "ACTIVE"
                )
                .map((account) => (
                  <option
                    key={account._id}
                    value={account._id}
                    className="bg-slate-900"
                  >
                    Account • {account._id.slice(-8)}
                  </option>
                ))}

            </select>

          </div>
        </div>

        {/* Recipient */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Recipient Account
          </label>

          <input
            type="text"
            value={toAccount}
            onChange={(event) =>
              setToAccount(event.target.value)
            }
            placeholder="Enter recipient account ID"
            className="w-full rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Amount */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Amount
          </label>

          <div className="relative">

            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-slate-500">
              ₹
            </span>

            <input
              type="number"
              min="1"
              step="1"
              value={amount}
              onChange={(event) =>
                setAmount(event.target.value)
              }
              placeholder="0"
              className="w-full rounded-xl border border-white/10 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500"
            />

          </div>

        </div>

        {/* Note */}

        <div>

          <label className="mb-2 block text-sm font-medium text-slate-300">
            Transfer Note
            <span className="ml-2 text-xs font-normal text-slate-500">
              Optional
            </span>
          </label>

          <textarea
            value={note}
            onChange={(event) =>
              setNote(event.target.value)
            }
            rows={3}
            maxLength={200}
            placeholder="Add a note for this transfer..."
            className="w-full resize-none rounded-xl border border-white/10 bg-slate-950 px-4 py-3 text-sm text-white placeholder:text-slate-600 outline-none transition focus:border-blue-500"
          />

        </div>

        {/* Continue */}

        <button
          type="submit"
          disabled={accounts.length === 0}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-blue-500 px-5 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
        >

          <Send size={18} />

          Continue Transfer

          <ArrowRight size={18} />

        </button>

      </form>

      {/* ======================================
          Confirmation Modal
      ====================================== */}

      {showConfirmation && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-sm">

          <div className="w-full max-w-md rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

            {/* Modal Header */}

            <div className="flex items-center justify-between border-b border-white/10 p-5">

              <div>
                <h2 className="text-lg font-semibold text-white">
                  Confirm Transfer
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Please review the transfer details.
                </p>
              </div>

              <button
                type="button"
                onClick={() =>
                  !processing &&
                  setShowConfirmation(false)
                }
                disabled={processing}
                className="rounded-lg p-2 text-slate-400 transition hover:bg-white/5 hover:text-white disabled:cursor-not-allowed disabled:opacity-50"
              >
                <X size={18} />
              </button>

            </div>

            {/* Details */}

            <div className="space-y-4 p-5">

              <div className="rounded-xl bg-slate-950 p-4 text-center">

                <p className="text-xs text-slate-500">
                  Transfer Amount
                </p>

                <p className="mt-1 text-3xl font-semibold text-white">
                  ₹{Number(amount).toLocaleString("en-IN")}
                </p>

              </div>

              <div className="space-y-3">

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">
                    From
                  </span>

                  <span className="max-w-[220px] truncate font-mono text-xs text-slate-300">
                    {fromAccount}
                  </span>
                </div>

                <div className="flex justify-between gap-4 text-sm">
                  <span className="text-slate-500">
                    To
                  </span>

                  <span className="max-w-[220px] truncate font-mono text-xs text-slate-300">
                    {toAccount}
                  </span>
                </div>

                {note && (
                  <div className="flex justify-between gap-4 text-sm">
                    <span className="text-slate-500">
                      Note
                    </span>

                    <span className="max-w-[220px] truncate text-right text-xs text-slate-300">
                      {note}
                    </span>
                  </div>
                )}

              </div>

            </div>

            {/* Actions */}

            <div className="flex gap-3 border-t border-white/10 p-5">

              <button
                type="button"
                disabled={processing}
                onClick={() =>
                  setShowConfirmation(false)
                }
                className="flex-1 rounded-xl border border-white/10 px-4 py-3 text-sm font-medium text-slate-300 transition hover:bg-white/5 disabled:opacity-50"
              >
                Cancel
              </button>

              <button
                type="button"
                disabled={processing}
                onClick={handleConfirmTransfer}
                className="flex flex-1 items-center justify-center gap-2 rounded-xl bg-blue-500 px-4 py-3 text-sm font-semibold text-white transition hover:bg-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              >

                {processing ? (
                  <>
                    <Loader2
                      size={17}
                      className="animate-spin"
                    />
                    Processing...
                  </>
                ) : (
                  <>
                    Confirm
                    <ArrowRight size={17} />
                  </>
                )}

              </button>

            </div>

          </div>

        </div>
      )}

    </div>
  );
};

export default SendMoney;