import styles from "./DashboardPage.module.css";

async function DashboardPage({Name , Lastname,createdAt}) {
  return (
    <div className={styles.container}>
      <h3>سلام {Name} جان 👋</h3>
      <div className={styles.createdAt}>
        <p>تاریخ عضویت</p>
        <span>{new Date(createdAt).toLocaleDateString("fa-IR")}</span>
      </div>
    </div>
  );
}

export default DashboardPage;
