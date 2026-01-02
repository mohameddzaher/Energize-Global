import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { User } from "../types";
import { adminAPI } from "../utils/api";

type ToastType = "success" | "error" | "info";

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);

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

  const [toast, setToast] = useState<{ type: ToastType; msg: string } | null>(null);

  const [creating, setCreating] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [updatingPerm, setUpdatingPerm] = useState(false);

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
      const result = await adminAPI.getAllUsers();
      const list = result?.data?.users || [];
      setUsers(list);
    } catch (err: any) {
      showToast("error", err?.message || "Failed to load users");
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
    if (p.smallRoom && p.largeRoom) return "bg-purple-900/50 text-purple-300 border-purple-700/50";
    if (p.smallRoom) return "bg-green-900/50 text-green-300 border-green-700/50";
    if (p.largeRoom) return "bg-blue-900/50 text-blue-300 border-blue-700/50";
    return "bg-red-900/50 text-red-300 border-red-700/50";
  };

  // ✅ هنا الإصلاح الحقيقي: نقفل المودال فورًا (Optimistic) + نضيف اليوزر فورًا لو رجع
  const handleCreateUser = async (e: React.FormEvent) => {
    e.preventDefault();
    if (creating) return;

    setCreating(true);

    // ✅ اقفل فورًا (زي ما انت عايز)
    setShowCreateModal(false);

    // Optional: Toast "creating..."
    showToast("info", "Creating user...");

    try {
      const result = await adminAPI.createUser(formData);

      const createdUser: User | undefined = result?.data?.user;

      if (createdUser) {
        setUsers((prev) => {
          // منع تكرار لو حصل loadUsers بعدين
          const exists = prev.some((x) => uidOf(x) === uidOf(createdUser));
          if (exists) return prev;
          return [createdUser, ...prev];
        });
      } else {
        // fallback
        await loadUsers();
      }

      resetForm();

      if (result?.data?.emailSent === true) {
        showToast("success", "User created ✅ Email sent");
      } else if (result?.data?.emailSent === false) {
        showToast("info", "User created ✅ لكن الإيميل لم يُرسل (راجع إعدادات الإيميل)");
      } else {
        showToast("success", "User created ✅");
      }

      // ✅ ضمان 100%: مزامنة نهائية (بدون ما تحتاج refresh)
      // حتى لو الـ state اتلخبط من أي سبب
      await loadUsers();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to create user");

      // ✅ لو فشل: افتح المودال تاني عشان مايضيعش عليه البيانات (اختياري)
      setShowCreateModal(true);
    } finally {
      setCreating(false);
    }
  };

  const handleEditUser = (user: User) => {
    setSelectedUser(user);
    setFormData({
      email: user.email,
      password: "",
      fullName: user.fullName,
      role: user.role,
      bookingPermissions: user.bookingPermissions || { smallRoom: true, largeRoom: false },
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
    setPermissionsData(user.bookingPermissions || { smallRoom: true, largeRoom: false });
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

  const handleDeleteUser = async (id: string) => {
    if (!confirm("Are you sure you want to delete this user?")) return;

    try {
      await adminAPI.deleteUser(id);
      setUsers((prev) => prev.filter((u) => uidOf(u) !== id));
      showToast("success", "User deleted ✅");
      await loadUsers();
    } catch (err: any) {
      showToast("error", err?.message || "Failed to delete user");
    }
  };

  const totalUsers = useMemo(() => users.length, [users]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-900 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#f37121] mx-auto mb-4" />
          <p className="text-gray-400">Loading Users...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
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
        {/* Header */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 mb-8">
          <div>
            <h1 className="text-3xl font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
              User Management
            </h1>
            <p className="text-gray-400 mt-2">Manage system users and permissions</p>
          </div>

          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={() => setShowCreateModal(true)}
              className="bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-orange-400/50"
            >
              Create New User
            </button>

            <button
              onClick={loadUsers}
              className="bg-gray-800 hover:bg-gray-700 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg border border-gray-700"
            >
              Refresh
            </button>

            <Link
              href="/admin-dashboard"
              className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium py-2 px-4 rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl border border-blue-500/50 text-center"
            >
              Back to Dashboard
            </Link>
          </div>
        </div>

        {/* Table */}
        <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-xl overflow-hidden border border-gray-700">
          <div className="px-6 py-4 border-b border-gray-700 bg-gray-800/50 flex items-center justify-between">
            <h2 className="text-xl font-semibold text-[#f37121]">All Users ({totalUsers})</h2>
            <span className="text-xs text-gray-400">Updates instantly (no refresh)</span>
          </div>

          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-700">
              <thead className="bg-gray-800/80">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">User</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Role</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Email</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Booking Permissions</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>

              <tbody className="bg-gray-800/50 divide-y divide-gray-700">
                {users.map((user) => {
                  const id = uidOf(user);
                  return (
                    <tr key={id} className="hover:bg-gray-700/50 transition-colors duration-200">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-white">{user.fullName}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            user.role === "admin"
                              ? "bg-purple-900/50 text-purple-300 border border-purple-700/50"
                              : "bg-blue-900/50 text-blue-300 border border-blue-700/50"
                          }`}
                        >
                          {user.role}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-300">{user.email}</div>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getPermissionsColor(user)}`}>
                          {getPermissionsText(user)}
                        </span>
                      </td>

                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                        <button
                          onClick={() => handleEditUser(user)}
                          className="text-[#f37121] hover:text-orange-400 mr-3 transition-colors duration-200"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handlePermissions(user)}
                          className="text-green-400 hover:text-green-300 mr-3 transition-colors duration-200"
                        >
                          Permissions
                        </button>
                        <button
                          onClick={() => handleDeleteUser(id)}
                          className="text-red-400 hover:text-red-300 transition-colors duration-200"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {users.length === 0 && (
                  <tr>
                    <td colSpan={5} className="px-6 py-10 text-center text-gray-400">
                      No users found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Create Modal (smaller + nicer) */}
      {showCreateModal && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Create New User
              </h2>
              <button
                onClick={() => setShowCreateModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
                aria-label="Close"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleCreateUser} className="p-5 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Password</label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Role</label>
                <select
                  value={formData.role}
                  onChange={(e) => setFormData((p) => ({ ...p, role: e.target.value as "user" | "admin" }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </select>
              </div>

              <div className="border-t border-gray-700 pt-3">
                <p className="text-sm font-semibold text-[#f37121] mb-2">Booking Permissions</p>

                <label className="flex items-center gap-2 text-sm text-gray-300">
                  <input
                    type="checkbox"
                    checked={formData.bookingPermissions.smallRoom}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        bookingPermissions: { ...p.bookingPermissions, smallRoom: e.target.checked },
                      }))
                    }
                    className="w-4 h-4"
                  />
                  Small Room Access
                </label>

                <label className="flex items-center gap-2 text-sm text-gray-300 mt-2">
                  <input
                    type="checkbox"
                    checked={formData.bookingPermissions.largeRoom}
                    onChange={(e) =>
                      setFormData((p) => ({
                        ...p,
                        bookingPermissions: { ...p.bookingPermissions, largeRoom: e.target.checked },
                      }))
                    }
                    className="w-4 h-4"
                  />
                  Large Room Access
                </label>
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={creating}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  {creating ? "Creating..." : "Create"}
                </button>

                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Edit & Permissions مودالات بتوعك زي ما كانوا — لو عايز أصغّرهم كمان قولي */}
      {showEditModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Edit User
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdateUser} className="p-5 space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Full Name</label>
                <input
                  type="text"
                  value={formData.fullName}
                  onChange={(e) => setFormData((p) => ({ ...p, fullName: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  New Password (leave empty to keep current)
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData((p) => ({ ...p, password: e.target.value }))}
                  className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#f37121] text-white"
                  placeholder="Enter new password"
                />
              </div>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={updating}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  {updating ? "Updating..." : "Update"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowEditModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showPermissionsModal && selectedUser && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-gradient-to-br from-gray-800 to-gray-900 rounded-2xl shadow-2xl border border-gray-700 w-full max-w-sm">
            <div className="flex justify-between items-center p-5 border-b border-gray-700">
              <h2 className="text-lg font-bold bg-gradient-to-r from-[#f37121] to-orange-500 bg-clip-text text-transparent">
                Permissions
              </h2>
              <button
                onClick={() => setShowPermissionsModal(false)}
                className="text-gray-400 hover:text-[#f37121] text-2xl font-bold transition-colors duration-200"
              >
                ×
              </button>
            </div>

            <form onSubmit={handleUpdatePermissions} className="p-5 space-y-3">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={permissionsData.smallRoom}
                  onChange={(e) => setPermissionsData((p) => ({ ...p, smallRoom: e.target.checked }))}
                  className="w-4 h-4"
                />
                Small Room Access
              </label>

              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={permissionsData.largeRoom}
                  onChange={(e) => setPermissionsData((p) => ({ ...p, largeRoom: e.target.checked }))}
                  className="w-4 h-4"
                />
                Large Room Access
              </label>

              <div className="flex gap-3 pt-2">
                <button
                  type="submit"
                  disabled={updatingPerm}
                  className="flex-1 bg-gradient-to-r from-[#f37121] to-orange-500 hover:from-[#e5651a] hover:to-orange-600 disabled:opacity-60 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  {updatingPerm ? "Saving..." : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => setShowPermissionsModal(false)}
                  className="flex-1 bg-gray-700 hover:bg-gray-600 text-white font-medium py-2.5 px-4 rounded-lg transition-all duration-200"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}