import styles from "./Card.module.css";
import { RiHome3Line } from "react-icons/ri";
import { MdApartment } from "react-icons/md";
import { BiLeftArrowAlt, BiStore } from "react-icons/bi";
import { FaLocationDot } from "react-icons/fa6";
import { GiOfficeChair } from "react-icons/gi";
import { sp } from "@/utils/replaceNumber";
import Link from "next/link";
function Card({ data: {_id, category, title, price, location } }) {
  const icons = {
    villa: <RiHome3Line />,
    apartment: <MdApartment />,
    store: <BiStore />,
    office: <GiOfficeChair />,
  };
  return (
    <div className={styles.container}>
      <div className={styles.icon}>{icons[category]}</div>
      <p className={styles.title}>{title}</p>
      <p className={styles.location}>
        <FaLocationDot/>
        {location}
      </p>
      <span>{sp(price)} تومان</span>
       <Link href={`/buy-residential/${_id}`}>
        مشاهده آگهی
        <BiLeftArrowAlt />
      </Link>
    </div>
  );
}

export default Card;
