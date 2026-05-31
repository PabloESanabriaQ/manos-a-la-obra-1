import { useState, useEffect, useCallback } from "react";
import { useTranslation } from "react-i18next";
import getUsers from "../../services/getUsers";
import createUser from "../../services/createUser";
import updateUser from "../../services/updateUser";
import deactivateUser from "../../services/deactivateUser";
import useAllProjects from "../../services/getAllProjects";
import updateProjectMembers from "../../services/updateProjectMembers";
import ErrorToast from "../ErrorToast";
import SuccessToast from "../SuccessToast";
import styles from "./styles.module.scss";

const ROLES = ["admin_users", "admin_projects", "member"];
const PROJECT_ROLES = ["admin_projects", "member"];

const EMPTY_USER_FORM = {
  username: "",
  email: "",
  password: "",
  role: "member",
  firstName: "",
  lastName: "",
};
const EMPTY_EDIT_FORM = { username: "", email: "", firstName: "", lastName: "" };

export default function AdminUsersPanel() {
  const { t } = useTranslation();
  const [tab, setTab] = useState("users");

  const [users, setUsers] = useState([]);
  const [usersLoading, setUsersLoading] = useState(true);
  const [editingUser, setEditingUser] = useState(null);
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_USER_FORM);
  const [editForm, setEditForm] = useState(EMPTY_EDIT_FORM);

  const { data: projects } = useAllProjects();
  const [selectedProject, setSelectedProject] = useState(null);
  const [newMember, setNewMember] = useState({ userId: "", role: "member" });

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const loadUsers = useCallback(async () => {
    setUsersLoading(true);
    try {
      const { data } = await getUsers();
      setUsers(data);
    } catch (e) {
      setError(e.message);
    } finally {
      setUsersLoading(false);
    }
  }, []);

  useEffect(() => {
    loadUsers();
  }, [loadUsers]);

  async function handleCreate(e) {
    e.preventDefault();
    try {
      await createUser({
        ...createForm,
        name: { first: createForm.firstName, last: createForm.lastName },
      });
      setCreateForm(EMPTY_USER_FORM);
      setShowCreateForm(false);
      setSuccess(t("admin.userCreated"));
      loadUsers();
    } catch (e) {
      setError(e.message);
    }
  }

  function openEdit(user) {
    setEditingUser(user);
    setEditForm({
      username: user.username,
      email: user.email,
      firstName: user.name?.first ?? "",
      lastName: user.name?.last ?? "",
    });
  }

  async function handleEdit(e) {
    e.preventDefault();
    try {
      await updateUser(editingUser._id, {
        username: editForm.username,
        email: editForm.email,
        name: { first: editForm.firstName, last: editForm.lastName },
      });
      setEditingUser(null);
      setSuccess(t("admin.userUpdated"));
      loadUsers();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleDeactivate(user) {
    if (!confirm(t("admin.confirmDeactivate", { name: user.username }))) return;
    try {
      await deactivateUser(user._id);
      setSuccess(t("admin.userDeactivated"));
      loadUsers();
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleAddMember(e) {
    e.preventDefault();
    if (!newMember.userId) return;
    const current = selectedProject.members ?? [];
    const updated = [...current, { user: newMember.userId, role: newMember.role }];
    try {
      const saved = await updateProjectMembers(selectedProject._id, updated);
      setSelectedProject(saved);
      setNewMember({ userId: "", role: "member" });
      setSuccess(t("admin.memberAdded"));
    } catch (e) {
      setError(e.message);
    }
  }

  async function handleRemoveMember(userId) {
    const updated = selectedProject.members.filter(
      (m) => m.user !== userId && m.user?._id !== userId
    );
    try {
      const saved = await updateProjectMembers(selectedProject._id, updated);
      setSelectedProject(saved);
      setSuccess(t("admin.memberRemoved"));
    } catch (e) {
      setError(e.message);
    }
  }

  const nonMembers = users.filter(
    (u) => !selectedProject?.members?.some((m) => (m.user?._id ?? m.user) === u._id)
  );

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>{t("admin.title")}</h2>

      <div className={styles.tabs}>
        <button
          className={tab === "users" ? styles.tabActive : styles.tab}
          onClick={() => setTab("users")}
        >
          {t("admin.usersTab")}
        </button>
        <button
          className={tab === "projects" ? styles.tabActive : styles.tab}
          onClick={() => setTab("projects")}
        >
          {t("admin.projectsTab")}
        </button>
      </div>

      {tab === "users" && (
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <h3>{t("admin.usersTab")}</h3>
            <button
              className={styles.btnPrimary}
              onClick={() => {
                setShowCreateForm(true);
                setEditingUser(null);
              }}
            >
              + {t("admin.createUser")}
            </button>
          </div>

          {showCreateForm && (
            <form className={styles.form} onSubmit={handleCreate}>
              <h4>{t("admin.createUser")}</h4>
              <input
                className={styles.input}
                placeholder={t("admin.username")}
                aria-label={t("admin.username")}
                value={createForm.username}
                onChange={(e) => setCreateForm({ ...createForm, username: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.email")}
                aria-label={t("admin.email")}
                type="email"
                value={createForm.email}
                onChange={(e) => setCreateForm({ ...createForm, email: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.firstName")}
                aria-label={t("admin.firstName")}
                value={createForm.firstName}
                onChange={(e) => setCreateForm({ ...createForm, firstName: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.lastName")}
                aria-label={t("admin.lastName")}
                value={createForm.lastName}
                onChange={(e) => setCreateForm({ ...createForm, lastName: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.password")}
                aria-label={t("admin.password")}
                type="password"
                value={createForm.password}
                onChange={(e) => setCreateForm({ ...createForm, password: e.target.value })}
                required
              />
              <select
                className={styles.select}
                value={createForm.role}
                onChange={(e) => setCreateForm({ ...createForm, role: e.target.value })}
              >
                {ROLES.map((r) => (
                  <option key={r} value={r}>
                    {t(`admin.roles.${r}`)}
                  </option>
                ))}
              </select>
              <div className={styles.formActions}>
                <button className={styles.btnPrimary} type="submit">
                  {t("admin.save")}
                </button>
                <button
                  className={styles.btnSecondary}
                  type="button"
                  onClick={() => setShowCreateForm(false)}
                >
                  {t("admin.cancel")}
                </button>
              </div>
            </form>
          )}

          {editingUser && (
            <form className={styles.form} onSubmit={handleEdit}>
              <h4>
                {t("admin.editUser")}: {editingUser.username}
              </h4>
              <input
                className={styles.input}
                placeholder={t("admin.username")}
                aria-label={t("admin.username")}
                value={editForm.username}
                onChange={(e) => setEditForm({ ...editForm, username: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.email")}
                aria-label={t("admin.email")}
                type="email"
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
                required
              />
              <input
                className={styles.input}
                placeholder={t("admin.firstName")}
                aria-label={t("admin.firstName")}
                value={editForm.firstName}
                onChange={(e) => setEditForm({ ...editForm, firstName: e.target.value })}
              />
              <input
                className={styles.input}
                placeholder={t("admin.lastName")}
                aria-label={t("admin.lastName")}
                value={editForm.lastName}
                onChange={(e) => setEditForm({ ...editForm, lastName: e.target.value })}
              />
              <div className={styles.formActions}>
                <button className={styles.btnPrimary} type="submit">
                  {t("admin.save")}
                </button>
                <button
                  className={styles.btnSecondary}
                  type="button"
                  onClick={() => setEditingUser(null)}
                >
                  {t("admin.cancel")}
                </button>
              </div>
            </form>
          )}

          {usersLoading ? (
            <p>{t("common.loading")}</p>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>{t("admin.username")}</th>
                  <th>{t("admin.email")}</th>
                  <th>{t("admin.role")}</th>
                  <th>{t("admin.status")}</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr key={u._id} className={!u.active ? styles.inactive : ""}>
                    <td>{u.username}</td>
                    <td>{u.email}</td>
                    <td>{t(`admin.roles.${u.role}`)}</td>
                    <td>{u.active ? t("admin.active") : t("admin.inactive")}</td>
                    <td className={styles.actions}>
                      <button className={styles.btnSmall} onClick={() => openEdit(u)}>
                        {t("admin.edit")}
                      </button>
                      {u.active && (
                        <button
                          className={`${styles.btnSmall} ${styles.btnDanger}`}
                          onClick={() => handleDeactivate(u)}
                        >
                          {t("admin.deactivate")}
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </section>
      )}

      {tab === "projects" && (
        <section className={styles.section}>
          <h3>{t("admin.projectsTab")}</h3>
          <select
            className={styles.select}
            value={selectedProject?._id ?? ""}
            onChange={(e) =>
              setSelectedProject(projects?.find((p) => p._id === e.target.value) ?? null)
            }
          >
            <option value="">{t("admin.selectProject")}</option>
            {projects?.map((p) => (
              <option key={p._id} value={p._id}>
                {p.name}
              </option>
            ))}
          </select>

          {selectedProject && (
            <>
              <h4 className={styles.subtitle}>
                {t("admin.members")}: {selectedProject.name}
              </h4>
              <table className={styles.table}>
                <thead>
                  <tr>
                    <th>{t("admin.username")}</th>
                    <th>{t("admin.role")}</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {selectedProject.members?.map((m) => {
                    const userId = m.user?._id ?? m.user;
                    const username =
                      m.user?.username ?? users.find((u) => u._id === userId)?.username ?? userId;
                    return (
                      <tr key={userId}>
                        <td>{username}</td>
                        <td>{t(`admin.roles.${m.role}`)}</td>
                        <td>
                          <button
                            className={`${styles.btnSmall} ${styles.btnDanger}`}
                            onClick={() => handleRemoveMember(userId)}
                          >
                            {t("admin.remove")}
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <form className={styles.addMemberForm} onSubmit={handleAddMember}>
                <h4>{t("admin.addMember")}</h4>
                <select
                  className={styles.select}
                  value={newMember.userId}
                  onChange={(e) => setNewMember({ ...newMember, userId: e.target.value })}
                >
                  <option value="">{t("admin.selectUser")}</option>
                  {nonMembers.map((u) => (
                    <option key={u._id} value={u._id}>
                      {u.username}
                    </option>
                  ))}
                </select>
                <select
                  className={styles.select}
                  value={newMember.role}
                  onChange={(e) => setNewMember({ ...newMember, role: e.target.value })}
                >
                  {PROJECT_ROLES.map((r) => (
                    <option key={r} value={r}>
                      {t(`admin.roles.${r}`)}
                    </option>
                  ))}
                </select>
                <button className={styles.btnPrimary} type="submit">
                  {t("admin.addMember")}
                </button>
              </form>
            </>
          )}
        </section>
      )}

      {error && <ErrorToast message={error} onClose={() => setError("")} />}
      {success && <SuccessToast message={success} onClose={() => setSuccess("")} />}
    </div>
  );
}
