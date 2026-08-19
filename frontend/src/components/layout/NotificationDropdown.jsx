import { useState } from "react";
import {
  Bell,
  Check,
  CheckCheck,
  X,
  ArrowDownLeft,
  ArrowUpRight,
  ShieldCheck,
} from "lucide-react";

const NotificationDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      type: "credit",
      title: "Money received",
      message: "₹5,000 has been credited to your account.",
      time: "5 min ago",
      read: false,
    },
    {
      id: 2,
      type: "debit",
      title: "Money sent",
      message: "₹1,500 was sent successfully.",
      time: "1 hour ago",
      read: false,
    },
    {
      id: 3,
      type: "security",
      title: "Security update",
      message: "Your account security settings are up to date.",
      time: "Yesterday",
      read: true,
    },
  ]);

  const unreadCount = notifications.filter(
    (notification) => !notification.read
  ).length;

  const markAsRead = (id) => {
    setNotifications((prev) =>
      prev.map((notification) =>
        notification.id === id
          ? { ...notification, read: true }
          : notification
      )
    );
  };

  const markAllAsRead = () => {
    setNotifications((prev) =>
      prev.map((notification) => ({
        ...notification,
        read: true,
      }))
    );
  };

  const getNotificationIcon = (type) => {
    if (type === "credit") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-emerald-500/10 text-emerald-400">
          <ArrowDownLeft size={17} />
        </div>
      );
    }

    if (type === "debit") {
      return (
        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-red-500/10 text-red-400">
          <ArrowUpRight size={17} />
        </div>
      );
    }

    return (
      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-500/10 text-blue-400">
        <ShieldCheck size={17} />
      </div>
    );
  };

  return (
    <div className="relative">
      {/* Notification button */}
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label="Notifications"
        className="relative flex h-10 w-10 items-center justify-center rounded-xl text-slate-400 transition hover:bg-white/5 hover:text-white"
      >
        <Bell size={20} />

        {/* Unread indicator */}
        {unreadCount > 0 && (
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-blue-500 ring-2 ring-slate-950" />
        )}
      </button>

      {/* Dropdown */}
      {isOpen && (
        <>
          {/* Mobile backdrop */}
          <button
            type="button"
            aria-label="Close notifications"
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 z-40 cursor-default bg-black/20 lg:hidden"
          />

          <div className="absolute right-0 top-12 z-50 w-[calc(100vw-2rem)] max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-slate-900 shadow-2xl">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/10 px-4 py-4">
              <div>
                <h3 className="text-sm font-semibold text-white">
                  Notifications
                </h3>

                <p className="mt-0.5 text-xs text-slate-500">
                  {unreadCount > 0
                    ? `${unreadCount} unread notification${
                        unreadCount > 1 ? "s" : ""
                      }`
                    : "You're all caught up"}
                </p>
              </div>

              <div className="flex items-center gap-1">
                {unreadCount > 0 && (
                  <button
                    type="button"
                    onClick={markAllAsRead}
                    className="flex items-center gap-1 rounded-lg px-2 py-1.5 text-xs font-medium text-blue-400 transition hover:bg-blue-500/10"
                  >
                    <CheckCheck size={14} />
                    Mark all read
                  </button>
                )}

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-slate-500 transition hover:bg-white/5 hover:text-white"
                  aria-label="Close notifications"
                >
                  <X size={17} />
                </button>
              </div>
            </div>

            {/* Notification list */}
            <div className="max-h-[380px] overflow-y-auto">

              {notifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center px-6 py-12 text-center">
                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-white/5 text-slate-500">
                    <Bell size={21} />
                  </div>

                  <p className="text-sm font-medium text-white">
                    No notifications
                  </p>

                  <p className="mt-1 text-xs text-slate-500">
                    You're all caught up.
                  </p>
                </div>
              ) : (
                notifications.map((notification) => (
                  <div
                    key={notification.id}
                    className={`flex gap-3 border-b border-white/5 px-4 py-4 transition hover:bg-white/[0.03] ${
                      !notification.read ? "bg-blue-500/[0.03]" : ""
                    }`}
                  >
                    {getNotificationIcon(notification.type)}

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-white">
                          {notification.title}
                        </p>

                        {!notification.read && (
                          <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-blue-500" />
                        )}
                      </div>

                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        {notification.message}
                      </p>

                      <div className="mt-2 flex items-center justify-between">
                        <span className="text-[11px] text-slate-600">
                          {notification.time}
                        </span>

                        {!notification.read && (
                          <button
                            type="button"
                            onClick={() => markAsRead(notification.id)}
                            className="flex items-center gap-1 text-[11px] font-medium text-blue-400 hover:text-blue-300"
                          >
                            <Check size={13} />
                            Mark read
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            <div className="border-t border-white/10 px-4 py-3">
              <button
                type="button"
                className="w-full rounded-lg py-2 text-xs font-medium text-slate-400 transition hover:bg-white/5 hover:text-white"
              >
                View all notifications
              </button>
            </div>

          </div>
        </>
      )}
    </div>
  );
};

export default NotificationDropdown;