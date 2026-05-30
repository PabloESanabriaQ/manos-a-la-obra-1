import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import useMe from "../../services/getMe";
import useAllProjects from "../../services/getAllProjects";
import styles from "./styles.module.scss";

export default function ProfileView() {
  const { t } = useTranslation();
  const { user, isAdminUsers } = useUser();
  const { data: profile, loading: profileLoading, error: profileError } = useMe();
  const { data: projects, loading: projectsLoading } = useAllProjects();

  const loading = profileLoading || projectsLoading;

  if (loading) return <div className={styles.loading}>{t("common.loading")}</div>;
  if (profileError) return <div className={styles.error}>{profileError}</div>;

  const initials =
    [profile?.name?.first, profile?.name?.last]
      .filter(Boolean)
      .map((n) => n[0].toUpperCase())
      .join("") ||
    profile?.username?.[0]?.toUpperCase() ||
    "?";

  const myProjects = isAdminUsers()
    ? []
    : (projects || []).map((project) => {
        const member = project.members?.find((m) => String(m.user) === String(user?._id));
        return { ...project, myRole: member?.role };
      });

  return (
    <section className={styles.container}>
      <h1 className={styles.title}>
        {t("profile.title")}
        <span className={styles.accent}>.</span>
      </h1>

      <div className={styles.card}>
        <div className={styles.avatar}>{initials}</div>
        <div className={styles.info}>
          <div className={styles.row}>
            <span className={styles.label}>{t("profile.name")}</span>
            <span className={styles.value}>{profile?.name?.first || "—"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{t("profile.lastName")}</span>
            <span className={styles.value}>{profile?.name?.last || "—"}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{t("profile.username")}</span>
            <span className={styles.value}>{profile?.username}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{t("profile.email")}</span>
            <span className={styles.value}>{profile?.email}</span>
          </div>
          <div className={styles.row}>
            <span className={styles.label}>{t("profile.role")}</span>
            <span className={styles.badge}>{t(`admin.roles.${profile?.role}`)}</span>
          </div>
        </div>
      </div>

      {!isAdminUsers() && (
        <div className={styles.projects}>
          <h2 className={styles.sectionTitle}>{t("profile.projects")}</h2>
          {myProjects.length === 0 ? (
            <p className={styles.empty}>{t("profile.noProjects")}</p>
          ) : (
            <ul className={styles.projectList}>
              {myProjects.map((project) => (
                <li key={project._id} className={styles.projectItem}>
                  <span className={styles.projectName}>
                    {project.icon && <span className={styles.projectIcon}>{project.icon}</span>}
                    {project.name}
                  </span>
                  {project.myRole && (
                    <span className={styles.roleBadge}>{t(`admin.roles.${project.myRole}`)}</span>
                  )}
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </section>
  );
}
