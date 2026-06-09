import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useEpicById from "../../services/getEpicById";
import useUSByEpicId from "../../services/getUSByEpicId";
import updateEpic from "../../services/updateEpic";
import createStory from "../../services/createStory";
import updateStory from "../../services/updateStory";
import deleteStory from "../../services/deleteStory";
import ListContainerComponent from "../../components/ListContainerComponent";
import ErrorToast from "../../components/ErrorToast";
import translateError from "../../api/translateError";
import { useUser } from "../../context/UserContext";
import LoadingSpinner from "../../components/LoadingSpinner";
import styles from "./styles.module.scss";

const EMPTY_STORY_FORM = { name: "", description: "", points: "" };

export default function EpicView() {
  const { idEpica } = useParams();
  const { t } = useTranslation();
  const { canDo } = useUser();

  const { data: fetchedEpic } = useEpicById(idEpica);
  const { data: fetchedStories, loading, error } = useUSByEpicId(idEpica);

  const [stories, setStories] = useState(null);
  const [epic, setEpic] = useState(null);
  const display = stories ?? fetchedStories;
  const currentEpic = epic ?? fetchedEpic;

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_STORY_FORM);
  const [editingStory, setEditingStory] = useState(null);
  const [editStoryForm, setEditStoryForm] = useState(EMPTY_STORY_FORM);
  const [showEditEpic, setShowEditEpic] = useState(false);
  const [editEpicForm, setEditEpicForm] = useState({ name: "", description: "", icon: "" });
  const [err, setErr] = useState("");

  function openEditStory(story) {
    setEditingStory(story);
    setEditStoryForm({
      name: story.name,
      description: story.description ?? "",
      points: story.points ?? "",
    });
  }

  function openEditEpic() {
    setEditEpicForm({
      name: currentEpic?.name ?? "",
      description: currentEpic?.description ?? "",
      icon: currentEpic?.icon ?? "",
    });
    setShowEditEpic(true);
  }

  async function handleCreateStory(e) {
    e.preventDefault();
    try {
      const newStory = await createStory({
        ...createForm,
        points: createForm.points || undefined,
        epic: idEpica,
      });
      setStories([...(display ?? []), newStory]);
      setCreateForm(EMPTY_STORY_FORM);
      setShowCreate(false);
    } catch (e) {
      setErr(translateError(t, e));
    }
  }

  async function handleUpdateStory(e) {
    e.preventDefault();
    try {
      const updated = await updateStory(editingStory._id, {
        ...editStoryForm,
        points: editStoryForm.points || undefined,
      });
      setStories((display ?? []).map((s) => (s._id === updated._id ? updated : s)));
      setEditingStory(null);
    } catch (e) {
      setErr(translateError(t, e));
    }
  }

  async function handleDeleteStory(id, name) {
    if (!confirm(t("crud.confirmDelete", { name }))) return;
    try {
      await deleteStory(id);
      setStories((display ?? []).filter((s) => s._id !== id));
    } catch (e) {
      setErr(translateError(t, e));
    }
  }

  async function handleUpdateEpic(e) {
    e.preventDefault();
    try {
      const updated = await updateEpic(idEpica, editEpicForm);
      setEpic(updated);
      setShowEditEpic(false);
    } catch (e) {
      setErr(translateError(t, e));
    }
  }

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div role="alert" className={styles.error}>
        {error}
      </div>
    );

  return (
    <div className={styles.container}>
      <div className={styles.inner}>
        {/* Cabecera de la épica */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>
              {currentEpic?.icon} {currentEpic?.name}
            </h1>
            {currentEpic?.description && (
              <p className={styles.subtitle}>{currentEpic.description}</p>
            )}
          </div>
          {canDo("epic:edit") && !showEditEpic && (
            <button className={styles.btnSecondary} onClick={openEditEpic}>
              {t("crud.editEpic")}
            </button>
          )}
        </div>

        {/* Form editar épica */}
        {showEditEpic && (
          <form className={styles.form} onSubmit={handleUpdateEpic}>
            <h3>{t("crud.editEpic")}</h3>
            <input
              className={styles.input}
              placeholder={t("crud.name")}
              aria-label={t("crud.name")}
              value={editEpicForm.name}
              onChange={(e) => setEditEpicForm({ ...editEpicForm, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              placeholder={t("crud.description")}
              aria-label={t("crud.description")}
              value={editEpicForm.description}
              onChange={(e) => setEditEpicForm({ ...editEpicForm, description: e.target.value })}
            />
            <input
              className={styles.input}
              placeholder={t("crud.icon")}
              aria-label={t("crud.icon")}
              value={editEpicForm.icon}
              onChange={(e) => setEditEpicForm({ ...editEpicForm, icon: e.target.value })}
            />
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">
                {t("crud.save")}
              </button>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setShowEditEpic(false)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Form editar historia */}
        {editingStory && (
          <form className={styles.form} onSubmit={handleUpdateStory}>
            <h3>
              {t("crud.editStory")}: {editingStory.name}
            </h3>
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
                onClick={() => setEditingStory(null)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Lista de historias */}
        <ListContainerComponent
          data={display}
          title={t("common.userStories")}
          path="userStory"
          onEdit={canDo("story:edit") ? openEditStory : undefined}
          onDelete={canDo("story:delete") ? handleDeleteStory : undefined}
        />

        {/* Form crear historia */}
        {canDo("story:create") &&
          (showCreate ? (
            <form className={styles.form} onSubmit={handleCreateStory}>
              <h3>{t("crud.newStory")}</h3>
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
              <input
                className={styles.input}
                placeholder={t("crud.points")}
                aria-label={t("crud.points")}
                type="number"
                min="0"
                value={createForm.points}
                onChange={(e) => setCreateForm({ ...createForm, points: e.target.value })}
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
              + {t("crud.newStory")}
            </button>
          ))}
      </div>

      {err && <ErrorToast message={err} onClose={() => setErr("")} />}
    </div>
  );
}
