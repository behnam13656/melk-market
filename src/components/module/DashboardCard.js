"use client";
import styles from "./DashboardCard.module.css";
import Card from "./Card";
import { AiFillEdit } from "react-icons/ai";
import { MdDelete } from "react-icons/md";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";

function DashboardCard({ data }) {
  const router = useRouter();
  const editHandelr = () => {
    router.push(`/dashboard/my-profile/${data._id}`);
  };
  const deleteHandelr = async () => {
     
    const res = await fetch(`/api/profile/delete/${data._id}`, {
      method: "DELETE",
      
    });
    const result = await res.json();
    if(result.error)(
      toast.error(result.error)
    )
    else{
      toast.success(result.message)
      router.refresh()
    }
  };
  return (
    <div className={styles.container}>
      <Card data={data} />
      <div className={styles.main}>
        <button onClick={editHandelr}>
          ویرایش
          <AiFillEdit />
        </button>
        <button onClick={deleteHandelr}>
          خذف آگهی
          <MdDelete />
        </button>
      </div>
      <Toaster/> 
    </div>
  );
}

export default DashboardCard;
