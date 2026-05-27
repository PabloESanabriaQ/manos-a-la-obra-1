import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useTaskById from "../../services/getTaskById";
import updateTask from "../../services/updateTask";
import deleteTask from "../../services/deleteTask";
import ErrorToast from "../../components/ErrorToast";
import { useUser } from "../../context/UserContext";
import styles from "./styles.module.scss";

export default function TaskView() {
  const { Tarea } = useParams();
  const { t } = useTranslation();
  const { canDo } = useUser();

  const { data: fetchedTask, loading, error } = useTaskById(Tarea);

  const [task, setTask] = useState(null);
  const currentTask = task ?? fetchedTask;

  const [showEdit, setShowEdit] = useState(false);
  const [editForm, setEditForm] = useState({ name: "", description: "", done: false });
  const [err, setErr] = useState("");

  function openEdit() {
    setEditForm({
      name: currentTask?.name ?? "",
      description: currentTask?.description ?? "",
      done: currentTask?.done ?? false,
    });
    setShowEdit(true);
  }

  async function handleUpdateTask(e) {
    e.preventDefault();
    try {
      const updated = await updateTask(Tarea, editForm);
      setTask(updated);
      setShowEdit(false);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleDeleteTask() {
    if (!confirm(t("crud.confirmDelete", { name: currentTask?.name }))) return;
    try {
      await deleteTask(Tarea);
      history.back();
    } catch (e) {
      setErr(e.message);
    }
  }

  if (loading)
    return (
      <div role="status" className={styles.loading}>
        {t("common.loading")}
      </div>
    );
  if (error)
    return (
      <div role="alert" className={styles.error}>
        {error}
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* Cabecera de la tarea */}
        {!showEdit && (
          <div className={styles.header}>
            <div>
              <h1 className={styles.title}>{currentTask?.name}</h1>
              {currentTask?.description && (
                <p className={styles.subtitle}>{currentTask.description}</p>
              )}
              {currentTask?.done != null && (
                <p className={styles.badge}>
                  {currentTask.done ? t("crud.done") : t("crud.pending")}
                </p>
              )}
            </div>
            <div className={styles.headerActions}>
              {canDo("task:edit") && (
                <button className={styles.btnSecondary} onClick={openEdit}>
                  {t("crud.edit")}
                </button>
              )}
              {canDo("task:delete") && (
                <button className={styles.btnDanger} onClick={handleDeleteTask}>
                  {t("crud.delete")}
                </button>
              )}
            </div>
          </div>
        )}

        {/* Form editar tarea */}
        {showEdit && (
          <form className={styles.form} onSubmit={handleUpdateTask}>
            <h3>{t("crud.editTask")}</h3>
            <input
              className={styles.input}
              placeholder={t("crud.name")}
              aria-label={t("crud.name")}
              value={editForm.name}
              onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              required
              autoFocus
            />
            <input
              className={styles.input}
              placeholder={t("crud.description")}
              aria-label={t("crud.description")}
              value={editForm.description}
              onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
            />
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={editForm.done}
                onChange={(e) => setEditForm({ ...editForm, done: e.target.checked })}
              />
              {t("crud.done")}
            </label>
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">
                {t("crud.save")}
              </button>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setShowEdit(false)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}
      </div>

      {err && <ErrorToast message={err} onClose={() => setErr("")} />}
    </div>
  );
}
