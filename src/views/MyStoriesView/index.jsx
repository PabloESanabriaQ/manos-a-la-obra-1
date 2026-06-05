import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import useAllStories from "../../services/getAllStories";
import { useUser } from "../../context/UserContext";
import ListContainerComponent from "../../components/ListContainerComponent";
import LoadingSpinner from "../../components/LoadingSpinner";
import PropTypes from "prop-types";
import styles from "./styles.module.scss";

const STATUSES = ["todo", "running", "done"];

function MemberStoriesView({ userId }) {
  const { data, loading, error } = useAllStories({ assignedTo: userId });
  const { t } = useTranslation();

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return <ListContainerComponent data={data} title={t("common.myStories")} path="userStory" />;
}

function PMStoriesView() {
  const { t } = useTranslation();
  const [status, setStatus] = useState(null);
  const { data, loading, error } = useAllStories();

  const filtered = useMemo(
    () => (status ? data?.filter((s) => s.status === status) : data),
    [data, status]
  );

  if (loading) return <LoadingSpinner />;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <>
      <div className={styles.filterTabs}>
        <button
          className={status === null ? styles.filterTabActive : styles.filterTab}
          onClick={() => setStatus(null)}
        >
          {t("crud.statusAll")}
        </button>
        {STATUSES.map((s) => (
          <button
            key={s}
            className={status === s ? styles.filterTabActive : styles.filterTab}
            onClick={() => setStatus(s)}
          >
            {t(`crud.${s}`)}
          </button>
        ))}
      </div>
      <ListContainerComponent data={filtered} title={t("common.myStories")} path="userStory" />
    </>
  );
}

MemberStoriesView.propTypes = {
  userId: PropTypes.string,
};

export default function MyStoriesView() {
  const { user, isAdminProjects } = useUser();

  return (
    <div className={styles.container}>
      {isAdminProjects() ? <PMStoriesView /> : <MemberStoriesView userId={user?._id} />}
    </div>
  );
}
