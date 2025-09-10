
import AdminCard from "../module/AdminCard";
import styles from "./AdminPage.module.css";
function AdminPage({ profiles }) {
  return (
    <div>
      {profiles.length ? null : (
        <p className={styles.text}>هیج آگهی در انتطار تاییدی وجود ندارد</p>
      )}
      {profiles.map((i) => (
        <AdminCard key={i._id} data={JSON.parse(JSON.stringify(i))} />
      ))}
    </div>
  );
}

export default AdminPage;
