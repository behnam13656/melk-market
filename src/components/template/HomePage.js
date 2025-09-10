import CategoryCard from "../module/CategoryCard";
import styles from "./HomePage.module.css";
import { FaTreeCity } from "react-icons/fa6";
import { FiCircle } from "react-icons/fi";
function HomePage() {
  const services = ["خرید", "فروش", "رهن", "اجاره"];
  const cities = [
    "تهران",
    "سنندج",
    "کرمانشاه",
    "اهواز",
    "مشهد",
    "اصفهان",
    "شیراز",
    "خرم آباد",
  ];
  return (
    <div>
      <div className={styles.banner}>
        <div className={styles.desc}>
          <h1>سامانه خرید و اجاره ملک</h1>
          <ul>
            {services.map((i) => (
              <li key={i}>
                <FiCircle />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
        <div className={styles.categories}>
            <CategoryCard title="خانه ویلایی" name="villa"/>
            <CategoryCard title="آپارتمان" name="apartment"/>
            <CategoryCard title="مغازه" name="store"/>
            <CategoryCard title="دفتر" name="office"/>
        </div>
        <div className={styles.city}>
            <h3>شهر های پر بازدید</h3>
          <ul>
            {cities.map((i) => (
              <li key={i}>
                <FaTreeCity />
                <span>{i}</span>
              </li>
            ))}
          </ul>
        </div>
    </div>
  );
}

export default HomePage;
