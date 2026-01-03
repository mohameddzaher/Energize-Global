import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { User } from "../../types";
import { adminAPI } from "../utils/api";
import ConfirmDialog from "../components/ConfirmDialog";
import { toast as hotToast } from "react-hot-toast";

type ToastType = "success" | "error" | "info";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);

  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    fullName: "",
    role: "user" as "user" | "admin",
    bookingPermissions: { smallRoom: true, largeRoom: false },
  });

  const [permissionsData, setPermissionsData] = useState({
    smallRoom: true,
    largeRoom: false,
  });

  const [toast, setToast] = useState<{ type: ToastType; msg: string } | null>(
    null
  );

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingPerm, setUpdatingPerm] = useState(false);
  const [deleteConfirm, setDeleteConfirm] = useState<{ isOpen: boolean; userId: string | null }>({
    isOpen: false,
    userId: null
  });

  const showToast = (type: ToastType, msg: string) => {
    setToast({ type, msg });
    window.setTimeout(() => setToast(null), 3000);
  };

  const resetForm = () => {
    setFormData({
      email: "",
      password: "",
      fullName: "",
      role: "user",
      bookingPermissions: { smallRoom: true, largeRoom: false },
    });
  };

  const uidOf = (u: User) => (u as any)._id || (u as any).id || u.email;

  const loadUsers = async () => {
    try {
      // التحقق من وجود token قبل المحاولة
      const token =
        typeof window !== "undefined" ? localStorage.getItem("token") : null;
      if (!token) {
        setAuthError(true);
        setLoading(false);
        return;
      }

      const result = await adminAPI.getAllUsers();
      const list = result?.data?.users || [];
      setUsers(list);
      setAuthError(false);
    } catch (err: any) {
      // إذا كان الخطأ متعلق بالمصادقة، نعرض رسالة مناسبة
      if (
        err?.message?.includes("not logged in") ||
        err?.message?.includes("401")
      ) {
        setAuthError(true);
      } else {
        showToast("error", err?.message || "Failed to load users");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUsers();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getPermissionsText = (user: User) => {
    const p = user.bookingPermissions || { smallRoom: true, largeRoom: false };
    if (p.smallRoom && p.largeRoom) return "All Rooms";
    if (p.smallRoom) return "Small Room Only";
    if (p.largeRoom) return "Large Room Only";
    return "No Access";
  };

  const getPermissionsColor = (user: User) => {
    const p = user.bookingPermissions || { smallRoom: true, largeRoom: false };
    if (p.smallRoom && p.largeRoom)
      return "bg-purple-900/50 text-purple-300 border-purple-700/50";
    if (p.smallRoom)
      return "bg-green-900/50 text-green-300 border-green-700/50";
    if (p.largeRoom) return "bg-blue-900/50 text-blue-300 border-blue-700/50";
    return "bg-red-900/50 text-red-300 border-red-700/50";
  };

  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) return;

    setCreating(true);

    try {
      const result = await adminAPI.createUser(formData);

      // ✅ إغلاق المودال فورًا بعد نجاح الإنشاء
      setShowCreateModal(false);
      resetForm();
      setCreating(false);

      // إضافة المستخدم للقائمة فورًا (optimistic update)
      if (result?.data?.user) {
        setUsers((prev) => {
          const exists = prev.some((u) => uidOf(u) === uidOf(result.data.user));
          if (exists) return prev;
          return [result.data.user, ...prev];
        });
      }

      // عرض رسالة النجاح
      showToast("success", "User created ✅");

      // إعادة تحميل القائمة في الخلفية للتأكد من المزامنة
      loadUsers().catch((err) => {
        console.error("Error reloading users:", err);
      });
    } catch (err: any) {
      setCreating(false);

      const errorMessage = err?.message || "Failed to create user";

      // رسائل خطأ أوضح
      if (errorMessage.includes("timeout")) {
        // في حالة timeout، نغلق المودال ونعيد التحميل (المستخدم قد يكون تم إنشاؤه)
        setShowCreateModal(false);
        resetForm();
        showToast("info", "Checking if user was created...");
        // إعادة تحميل القائمة للتحقق
        loadUsers()
          .then(() => {
            showToast("success", "User created ✅ (verified after timeout)");
          })
          .catch(() => {
            showToast("error", "Timeout occurred. Please refresh the page.");
          });
      } else if (errorMessage.includes("already exists")) {
        showToast("error", "User with this email already exists");
        // نترك المودال مفتوحًا في هذه الحالة
      } else {
        showToast("error", errorMessage);
        // نترك المودال مفتوحًا في حالة الخطأ
      }
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: "",
      fullName: user.fullName,
      role: user.role,
      bookingPermissions: user.bookingPermissions || {
        smallRoom: true,
        largeRoom: false,
      },
    });
    setShowEditModal(true);
  };

  const handleUpdateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || updating) return;

    setUpdating(true);
    try {
      const id = uidOf(selectedUser);
      const result = await adminAPI.updateUser(id, formData);

      const updated = result?.data?.user;
      if (updated) {
        setUsers((prev) => prev.map((u) => (uidOf(u) === id ? updated : u)));
      }

      setShowEditModal(false);
      setSelectedUser(null);
      resetForm();

      showToast("success", "User updated ✅");
      await loadUsers();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to update user");
    } finally {
      setUpdating(false);
    }
  };

  const handlePermissions = (user: User) => {
    setSelectedUser(user);
    setPermissionsData(
      user.bookingPermissions || { smallRoom: true, largeRoom: false }
    );
    setShowPermissionsModal(true);
  };

  const handleUpdatePermissions = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedUser || updatingPerm) return;

    setUpdatingPerm(true);
    try {
      const id = uidOf(selectedUser);
      const result = await adminAPI.updateUserPermissions(id, permissionsData);

      const updated = result?.data?.user;
      if (updated) {
        setUsers((prev) => prev.map((u) => (uidOf(u) === id ? updated : u)));
      }

      setShowPermissionsModal(false);
      setSelectedUser(null);

      showToast("success", "Permissions updated ✅");
      await loadUsers();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to update permissions");
    } finally {
      setUpdatingPerm(false);
    }
  };

  const handleDeleteUserClick = (id: string) => {
    setDeleteConfirm({ isOpen: true, userId: id });
  };

  const handleDeleteUser = async () => {
    if (!deleteConfirm.userId) return;

    try {
      await adminAPI.deleteUser(deleteConfirm.userId);
      setUsers((prev) => prev.filter((u) => uidOf(u) !== deleteConfirm.userId));
      hotToast.success("User deleted successfully");
      await loadUsers();
    } catch (err: any) {
      hotToast.error(err?.message || "Failed to delete user");
    } finally {
      setDeleteConfirm({ isOpen: false, userId: null });
    }
  };

  const totalUsers = useMemo(() => users.length, [users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center pt-20 sm:pt-24">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4" />
          <p className="text-gray-400">Loading Users...</p>
        </div>
      </div>
    );
  }

  if (authError) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center p-6 pt-20 sm:pt-24">
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-red-700/50 p-8 max-w-md w-full text-center">
          <div className="text-red-400 text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-bold text-red-400 mb-4">
            Authentication Required
          </h2>
          <p className="text-gray-300 mb-6">
            You need to be logged in as an admin to access this page.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/meeting-room"
              className="bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Go to Login
            </Link>
            <Link
              href="/admin-dashboard"
              className="bg-gray-700 hover:bg-gray-600 text-white font-medium py-2 px-6 rounded-lg transition-all duration-200"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6 pt-20 sm:pt-24">
      {/* Toast */}
      {toast && (
        <div className="fixed top-6 right-6 z-[9999]">
          <div
            className={`px-4 py-3 rounded-xl shadow-2xl border backdrop-blur
              ${
                toast.type === "success"
                  ? "bg-green-900/70 border-green-700/60 text-green-100"
                  : toast.type === "info"
                  ? "bg-blue-900/70 border-blue-700/60 text-blue-100"
                  : "bg-red-900/70 border-red-700/60 text-red-100"
              }`}
          >
            <div className="flex items-start gap-3">
              <div className="text-sm font-medium">{toast.msg}</div>
              <button
                onClick={() => setToast(null)}
                className="ml-2 text-lg leading-none opacity-80 hover:opacity-100"
                aria-label="Close"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Background */}
      <div className="fixed inset-0 bg-gradient-to-br from-[#f37121]/10 via-transparent to-[#f37121]/5 blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        {/* Header - أصغر وأكثر تنظيماً */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg p-4 mb-4 border border-gray-700">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                User Management
              </h1>
              <p className="text-xs text-gray-400 mt-1">
                Manage system users and permissions
              </p>
            </div>

            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => setShowCreateModal(true)}
                className="bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-orange-400/50"
              >
                ➕ Create User
              </button>

              <button
                onClick={loadUsers}
                className="bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-gray-600"
              >
                🔄 Refresh
              </button>

              <Link
                href="/admin-dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-1.5 px-3 rounded-lg transition-all border border-blue-500/50 text-center"
              >
                ← Dashboard
              </Link>
            </div>
          </div>
        </div>

        {/* Table - أصغر */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-lg overflow-hidden border border-gray-700">
          <div className="px-4 py-3 border-b border-gray-700 bg-gray-800/50 flex items-center justify-between">
            <h2 className="text-lg font-semibold text-[#f37121]">
              All Users ({totalUsers})
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    User
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    Role
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    Email
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    Permissions
                  </th>
                  <th className="px-4 py-2 text-left text-xs font-medium text-gray-400 uppercase">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {users.map((user) => {
                  const id = uidOf(user);
                  return (
                    <tr
                      key={id}
                      className="hover:bg-gray-700/50 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <div className="text-sm font-medium text-white">
                          {user.fullName}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 inline-flex text-xs font-medium rounded ${
                            user.role === "admin"
                              ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                              : "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-300">
                          {user.email}
                        </div>
                      </td>

                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-0.5 inline-flex text-xs font-medium rounded ${getPermissionsColor(
                            user
                          )}`}
                        >
                          {getPermissionsText(user)}
                        </span>
                      </td>

                      <td className="px-4 py-3 text-sm">
                        <div className="flex gap-2">
                          <button
                            onClick={() => handleEditUser(user)}
                            className="text-[#f37121] hover:text-orange-400 transition-colors text-xs"
                          >
                            Edit
                          </button>
                          <button
                            onClick={() => handlePermissions(user)}
                            className="text-green-400 hover:text-green-300 transition-colors text-xs"
                          >
                            Perms
                          </button>
                          <button
                            onClick={() => handleDeleteUserClick(id)}
                            className="text-red-400 hover:text-red-300 transition-colors text-xs"
                          >
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}

                {users.length === 0 && (
                  <tr>
                    <td
                      colSpan={5}
                      className="px-6 py-10 text-center text-gray-400"
                    >
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal - أصغر */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-base font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Create New User
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-xl font-bold transition-colors"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-4 space-y-3">
              <div>
                <label
                  htmlFor="create-fullName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="create-fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="create-email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="create-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="create-password"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Password
                </label>
                <input
                  id="create-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                  placeholder="Enter password"
                />
              </div>

              <div>
                <label
                  htmlFor="create-role"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Role
                </label>
                <select
                  id="create-role"
                  value={formData.role}
                  onChange={(e) =>
                    setFormData((p) => ({
                      ...p,
                      role: e.target.value as "user" | "admin",
                    }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  title="Select user role"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="border-t border-gray-700 pt-2">
                <p className="text-xs font-semibold text-[#f37121] mb-2">
                  Booking Permissions
                </p>
                <div className="space-y-1.5">
                  <label className="flex items-center gap-2 text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.bookingPermissions.smallRoom}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          bookingPermissions: {
                            ...p.bookingPermissions,
                            smallRoom: e.target.checked,
                          },
                        }))
                      }
                      className="w-3.5 h-3.5"
                    />
                    Small Room
                  </label>
                  <label className="flex items-center gap-2 text-xs text-gray-300">
                    <input
                      type="checkbox"
                      checked={formData.bookingPermissions.largeRoom}
                      onChange={(e) =>
                        setFormData((p) => ({
                          ...p,
                          bookingPermissions: {
                            ...p.bookingPermissions,
                            largeRoom: e.target.checked,
                          },
                        }))
                      }
                      className="w-3.5 h-3.5"
                    />
                    Large Room
                  </label>
                </div>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  {creating ? "Creating..." : "Create"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit Modal - أصغر */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-base font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Edit User
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-4 space-y-3">
              <div>
                <label
                  htmlFor="edit-fullName"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Full Name
                </label>
                <input
                  id="edit-fullName"
                  type="text"
                  value={formData.fullName}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, fullName: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                  placeholder="Enter full name"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-email"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  id="edit-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, email: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                  placeholder="Enter email"
                />
              </div>

              <div>
                <label
                  htmlFor="edit-password"
                  className="block text-xs font-medium text-gray-300 mb-1"
                >
                  New Password (optional)
                </label>
                <input
                  id="edit-password"
                  type="password"
                  value={formData.password}
                  onChange={(e) =>
                    setFormData((p) => ({ ...p, password: e.target.value }))
                  }
                  className="w-full px-2 py-1.5 text-sm bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  placeholder="Leave empty to keep current"
                />
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Permissions Modal - أصغر */}
      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-4 border-b border-gray-700">
              <h2 className="text-base font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Permissions
              </h2>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-xl font-bold transition-colors"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdatePermissions} className="p-4 space-y-3">
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={permissionsData.smallRoom}
                    onChange={(e) =>
                      setPermissionsData((p) => ({
                        ...p,
                        smallRoom: e.target.checked,
                      }))
                    }
                    className="w-4 h-4"
                  />
                  Small Room Access
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={permissionsData.largeRoom}
                    onChange={(e) =>
                      setPermissionsData((p) => ({
                        ...p,
                        largeRoom: e.target.checked,
                      }))
                    }
                    className="w-4 h-4"
                  />
                  Large Room Access
                </label>
              </div>

              <div className="flex gap-2 pt-2">
                <button
                  type="submit"
                  disabled={updatingPerm}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  {updatingPerm ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPermissionsModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white text-sm font-medium py-2 px-3 rounded-lg transition-all"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={deleteConfirm.isOpen}
        onClose={() => setDeleteConfirm({ isOpen: false, userId: null })}
        onConfirm={handleDeleteUser}
        title="Delete User"
        message="Are you sure you want to delete this user? This action cannot be undone."
        type="danger"
        confirmText="Delete"
        cancelText="Cancel"
      />
    </div>
  );
}
