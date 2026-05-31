import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useUser } from "../../context/UserContext";
import useAllProjects from "../../services/getAllProjects";
import ListContainerComponent from "../../components/ListContainerComponent";
import PaginationComponent from "../../components/PaginationComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import AdminUsersPanel from "../../components/AdminUsersPanel";
import styles from "./styles.module.scss";

const PAGE_SIZE = 6;

function ProjectsSection() {
  const { data, loading, error } = useAllProjects();
  const [page, setPage] = useState(1);
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner />;
  if (error)
    return (
      <div role="alert" className={styles.error}>
        {error}
      </div>
    );

  const sorted = [...data].sort((a, b) => {
    if (!a.updatedAt && !b.updatedAt) return 0;
    if (!a.updatedAt) return 1;
    if (!b.updatedAt) return -1;
    return new Date(b.updatedAt) - new Date(a.updatedAt);
  });

  const totalPages = Math.max(1, Math.ceil(sorted.length / PAGE_SIZE));
  const pageData = sorted.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  return (
    <div className={styles.listWrapper}>
      <ListContainerComponent data={pageData} title={t("common.projects")} path="project" />
      {totalPages > 1 && (
        <PaginationComponent page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}

export default function HomeView() {
  const { user, isAdminUsers } = useUser();
  const { t } = useTranslation();

  return (
    <section className={styles.main}>
      <h1 className={styles.h1}>
        <span className={styles.span}>{t("home.greeting", { name: user?.name?.first })}</span>{" "}
        {t("home.subtitle")}
      </h1>
      {isAdminUsers() ? <AdminUsersPanel /> : <ProjectsSection />}
    </section>
  );
}
