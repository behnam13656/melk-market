"use client";
import { sp } from "@/utils/replaceNumber";
import styles from "./AdminCard.module.css";

import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { ThreeDots } from "react-loader-spinner";

function AdminCard({ data: { _id, title, description, location, price } }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const PublishedHundler = async () => {
    setLoading(true);
    const res = await fetch(`/api/profile/publish/${_id}`, {
      method: "PATCH",
    });
    const result = await res.json();
    setLoading(false);
    if (result.message) {
      toast.success(result.message);
      router.refresh();
    }
  };
  const deleteHandelr = async () => {
    const res = await fetch(`/api/profile/delete/${_id}`, {
      method: "DELETE",
    });
    const result = await res.json();
    if (result.error) toast.error(result.error);
    else {
      toast.success(result.message);
      router.refresh();
    }
  };
  return (
    <div className={styles.container}>
      <h3>{title}</h3>
      <p>{description}</p>
      <div className={styles.properties}>
        <span>{location}</span>
        <span>{sp(price)}</span>
      </div>
      <div className={styles.btns}>
        {loading ? (
          <ThreeDots
            visible={true}
            height="60"
            width="60"
            color="#00a800"
            ariaLabel="three-dots-loading"
          />
        ) : (
          <button onClick={PublishedHundler}>انتشار</button>
        )}

          <button onClick={deleteHandelr} className={styles.btndel}>
            رد آگهی
          </button>
      
      </div>
      <Toaster />
    </div>
  );
}

export default AdminCard;
