import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useUSById from "../../services/getUSById";
import useTasksByUSId from "../../services/getTasksByUSId";
import updateStory from "../../services/updateStory";
import createTask from "../../services/createTask";
import updateTask from "../../services/updateTask";
import deleteTask from "../../services/deleteTask";
import ListContainerComponent from "../../components/ListContainerComponent";
import ErrorToast from "../../components/ErrorToast";
import { useUser } from "../../context/UserContext";
import styles from "./styles.module.scss";

const EMPTY_TASK_FORM = { name: "", description: "" };

export default function UserStoryView() {
  const { idHistoriaDeUsuario } = useParams();
  const { t } = useTranslation();
  const { canDo } = useUser();

  const { data: fetchedStory } = useUSById(idHistoriaDeUsuario);
  const { data: fetchedTasks, loading, error } = useTasksByUSId(idHistoriaDeUsuario);

  const [tasks, setTasks] = useState(null);
  const [story, setStory] = useState(null);
  const display = tasks ?? fetchedTasks;
  const currentStory = story ?? fetchedStory;

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_TASK_FORM);
  const [editingTask, setEditingTask] = useState(null);
  const [editTaskForm, setEditTaskForm] = useState(EMPTY_TASK_FORM);
  const [showEditStory, setShowEditStory] = useState(false);
  const [editStoryForm, setEditStoryForm] = useState({ name: "", description: "", points: "" });
  const [err, setErr] = useState("");

  function openEditTask(task) {
    setEditingTask(task);
    setEditTaskForm({ name: task.name, description: task.description ?? "" });
  }

  function openEditStory() {
    setEditStoryForm({
      name: currentStory?.name ?? "",
      description: currentStory?.description ?? "",
      points: currentStory?.points ?? "",
    });
    setShowEditStory(true);
  }

  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      const newTask = await createTask({ ...createForm, story: idHistoriaDeUsuario });
      setTasks([...(display ?? []), newTask]);
      setCreateForm(EMPTY_TASK_FORM);
      setShowCreate(false);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleUpdateTask(e) {
    e.preventDefault();
    try {
      const updated = await updateTask(editingTask._id, editTaskForm);
      setTasks((display ?? []).map((t) => (t._id === updated._id ? updated : t)));
      setEditingTask(null);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleDeleteTask(id, name) {
    if (!confirm(t("crud.confirmDelete", { name }))) return;
    try {
      await deleteTask(id);
      setTasks((display ?? []).filter((t) => t._id !== id));
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleUpdateStory(e) {
    e.preventDefault();
    try {
      const updated = await updateStory(idHistoriaDeUsuario, {
        ...editStoryForm,
        points: editStoryForm.points || undefined,
      });
      setStory(updated);
      setShowEditStory(false);
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
        {/* Cabecera de la historia */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{currentStory?.name}</h1>
            {currentStory?.description && (
              <p className={styles.subtitle}>{currentStory.description}</p>
            )}
            {currentStory?.points != null && (
              <p className={styles.subtitle}>
                {t("crud.points")}: {currentStory.points}
              </p>
            )}
          </div>
          {canDo("story:edit") && !showEditStory && (
            <button className={styles.btnSecondary} onClick={openEditStory}>
              {t("crud.editStory")}
            </button>
          )}
        </div>

        {/* Form editar historia */}
        {showEditStory && (
          <form className={styles.form} onSubmit={handleUpdateStory}>
            <h3>{t("crud.editStory")}</h3>
            <input
              className={styles.input}
              placeholder={t("crud.name")}
              aria-label={t("crud.name")}
              value={editStoryForm.name}
              onChange={(e) => setEditStoryForm({ ...editStoryForm, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              placeholder={t("crud.description")}
              aria-label={t("crud.description")}
              value={editStoryForm.description}
              onChange={(e) => setEditStoryForm({ ...editStoryForm, description: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder={t("crud.points")}
              aria-label={t("crud.points")}
              type="number"
              min="0"
              value={editStoryForm.points}
              onChange={(e) => setEditStoryForm({ ...editStoryForm, points: e.target.value })}
            />
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">
                {t("crud.save")}
              </button>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setShowEditStory(false)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Form editar tarea */}
        {editingTask && (
          <form className={styles.form} onSubmit={handleUpdateTask}>
            <h3>
              {t("crud.editTask")}: {editingTask.name}
            </h3>
            <input
              className={styles.input}
              placeholder={t("crud.name")}
              aria-label={t("crud.name")}
              value={editTaskForm.name}
              onChange={(e) => setEditTaskForm({ ...editTaskForm, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              placeholder={t("crud.description")}
              aria-label={t("crud.description")}
              value={editTaskForm.description}
              onChange={(e) => setEditTaskForm({ ...editTaskForm, description: e.target.value })}
            />
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">
                {t("crud.save")}
              </button>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setEditingTask(null)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Lista de tareas */}
        <ListContainerComponent
          data={display}
          title={t("common.tasks")}
          path="task"
          onEdit={canDo("task:edit") ? openEditTask : undefined}
          onDelete={canDo("task:delete") ? handleDeleteTask : undefined}
        />

        {/* Form crear tarea */}
        {canDo("task:create") &&
          (showCreate ? (
            <form className={styles.form} onSubmit={handleCreateTask}>
              <h3>{t("crud.newTask")}</h3>
              <input
                className={styles.input}
                placeholder={t("crud.name")}
                aria-label={t("crud.name")}
                value={createForm.name}
                onChange={(e) => setCreateForm({ ...createForm, name: e.target.value })}
                required
                autoFocus
              />
              <input
                className={styles.input}
                placeholder={t("crud.description")}
                aria-label={t("crud.description")}
                value={createForm.description}
                onChange={(e) => setCreateForm({ ...createForm, description: e.target.value })}
              />
              <div className={styles.formActions}>
                <button className={styles.btnPrimary} type="submit">
                  {t("crud.save")}
                </button>
                <button
                  className={styles.btnSecondary}
                  type="button"
                  onClick={() => setShowCreate(false)}
                >
                  {t("crud.cancel")}
                </button>
              </div>
            </form>
          ) : (
            <button className={styles.btnAdd} onClick={() => setShowCreate(true)}>
              + {t("crud.newTask")}
            </button>
          ))}
      </div>

      {err && <ErrorToast message={err} onClose={() => setErr("")} />}
    </div>
  );
}
