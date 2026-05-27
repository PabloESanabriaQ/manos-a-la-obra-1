import { useState } from "react";
import { useParams } from "react-router-dom";
import { useTranslation } from "react-i18next";
import useEpicsByProjectId from "../../services/getEpicsByProjectId";
import useProjectById from "../../services/getProjectById";
import createEpic from "../../services/createEpic";
import updateEpic from "../../services/updateEpic";
import deleteEpic from "../../services/deleteEpic";
import updateProject from "../../services/updateProject";
import ListContainerComponent from "../../components/ListContainerComponent";
import ErrorToast from "../../components/ErrorToast";
import { useUser } from "../../context/UserContext";
import styles from "./styles.module.scss";

const EMPTY_EPIC_FORM = { name: "", description: "", icon: "" };

export default function ProjectView() {
  const { idProyecto } = useParams();
  const { t } = useTranslation();
  const { canDo } = useUser();

  const { data: fetchedProject } = useProjectById({ projectId: idProyecto });
  const { data: fetchedEpics, loading, error } = useEpicsByProjectId(idProyecto);

  const [epics, setEpics] = useState(null);
  const [project, setProject] = useState(null);
  const display = epics ?? fetchedEpics;
  const currentProject = project ?? fetchedProject;

  const [showCreate, setShowCreate] = useState(false);
  const [createForm, setCreateForm] = useState(EMPTY_EPIC_FORM);
  const [editingEpic, setEditingEpic] = useState(null);
  const [editEpicForm, setEditEpicForm] = useState(EMPTY_EPIC_FORM);
  const [showEditProject, setShowEditProject] = useState(false);
  const [editProjectForm, setEditProjectForm] = useState({ name: "", description: "", icon: "" });
  const [err, setErr] = useState("");

  function openEditEpic(epic) {
    setEditingEpic(epic);
    setEditEpicForm({
      name: epic.name,
      description: epic.description ?? "",
      icon: epic.icon ?? "",
    });
  }

  function openEditProject() {
    setEditProjectForm({
      name: currentProject?.name ?? "",
      description: currentProject?.description ?? "",
      icon: currentProject?.icon ?? "",
    });
    setShowEditProject(true);
  }

  async function handleCreateEpic(e) {
    e.preventDefault();
    try {
      const newEpic = await createEpic({ ...createForm, project: idProyecto });
      setEpics([...(display ?? []), newEpic]);
      setCreateForm(EMPTY_EPIC_FORM);
      setShowCreate(false);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleUpdateEpic(e) {
    e.preventDefault();
    try {
      const updated = await updateEpic(editingEpic._id, editEpicForm);
      setEpics((display ?? []).map((ep) => (ep._id === updated._id ? updated : ep)));
      setEditingEpic(null);
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleDeleteEpic(id, name) {
    if (!confirm(t("crud.confirmDelete", { name }))) return;
    try {
      await deleteEpic(id);
      setEpics((display ?? []).filter((ep) => ep._id !== id));
    } catch (e) {
      setErr(e.message);
    }
  }

  async function handleUpdateProject(e) {
    e.preventDefault();
    try {
      const updated = await updateProject(idProyecto, editProjectForm);
      setProject(updated);
      setShowEditProject(false);
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
        {/* Cabecera del proyecto */}
        <div className={styles.header}>
          <div>
            <h1 className={styles.title}>{currentProject?.name}</h1>
            {currentProject?.description && (
              <p className={styles.subtitle}>{currentProject.description}</p>
            )}
          </div>
          {canDo("project:edit") && !showEditProject && (
            <button className={styles.btnSecondary} onClick={openEditProject}>
              {t("crud.editProject")}
            </button>
          )}
        </div>

        {/* Form editar proyecto */}
        {showEditProject && (
          <form className={styles.form} onSubmit={handleUpdateProject}>
            <h3>{t("crud.editProject")}</h3>
            <input
              className={styles.input}
              placeholder={t("crud.name")}
              aria-label={t("crud.name")}
              value={editProjectForm.name}
              onChange={(e) => setEditProjectForm({ ...editProjectForm, name: e.target.value })}
              required
            />
            <input
              className={styles.input}
              placeholder={t("crud.description")}
              aria-label={t("crud.description")}
              value={editProjectForm.description}
              onChange={(e) =>
                setEditProjectForm({ ...editProjectForm, description: e.target.value })
              }
            />
            <input
              className={styles.input}
              placeholder={t("crud.icon")}
              aria-label={t("crud.icon")}
              value={editProjectForm.icon}
              onChange={(e) => setEditProjectForm({ ...editProjectForm, icon: e.target.value })}
            />
            <div className={styles.formActions}>
              <button className={styles.btnPrimary} type="submit">
                {t("crud.save")}
              </button>
              <button
                className={styles.btnSecondary}
                type="button"
                onClick={() => setShowEditProject(false)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Form editar épica */}
        {editingEpic && (
          <form className={styles.form} onSubmit={handleUpdateEpic}>
            <h3>
              {t("crud.editEpic")}: {editingEpic.name}
            </h3>
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
                onClick={() => setEditingEpic(null)}
              >
                {t("crud.cancel")}
              </button>
            </div>
          </form>
        )}

        {/* Lista de épicas */}
        <ListContainerComponent
          data={display}
          title={t("common.epics")}
          path="epic"
          onEdit={canDo("epic:edit") ? openEditEpic : undefined}
          onDelete={canDo("epic:delete") ? handleDeleteEpic : undefined}
        />

        {/* Form crear épica */}
        {canDo("epic:create") &&
          (showCreate ? (
            <form className={styles.form} onSubmit={handleCreateEpic}>
              <h3>{t("crud.newEpic")}</h3>
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
                placeholder={t("crud.icon")}
                aria-label={t("crud.icon")}
                value={createForm.icon}
                onChange={(e) => setCreateForm({ ...createForm, icon: e.target.value })}
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
              + {t("crud.newEpic")}
            </button>
          ))}
      </div>

      {err && <ErrorToast message={err} onClose={() => setErr("")} />}
    </div>
  );
}
