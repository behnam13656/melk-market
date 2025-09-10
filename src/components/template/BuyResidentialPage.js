import Card from "../module/Card";
import SideBar from "../module/SideBar";
import styles from "./BuyResidentialPage.module.css";
import React from "react";

async function BuyResidentialPage({ data }) {
  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <SideBar/>
      </div>
      <div className={styles.main}>
        {data.length ? null : <p className={styles.text}>هیج آگهی ثبت نشده </p>}
        {
          data.map(Profile=>(
            <Card key={Profile._id} data={Profile}/>
          ))
        }
      </div>
    </div>
  );
}

export default BuyResidentialPage;
