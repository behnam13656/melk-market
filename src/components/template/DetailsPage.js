import { SiHomebridge } from "react-icons/si";
import { AiOutlinePhone } from "react-icons/ai";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { BiCalendarCheck } from "react-icons/bi";
import styles from "./DetailsPage.module.css";
import ItemList from "../module/ItemList";
import { e2p, sp } from "@/utils/replaceNumber";
import { icons } from "@/constants/icons";
import { categories } from "@/constants/strings";
import ShareButton from "../module/ShareButton";
import ImageGallery from "../module/ImageGallery";

function DetailsPage({
  data: {
    title,
    location,
    description,
    amenities,
    rules,
    realState,
    phone,
    price,
    category,
    constructionDate,
    images,
  },
}) {
  return (
    <div className={styles.container}>
      <div className={styles.main}>
        <div className={styles.imageGalleryWrapper}>
          {images?.length > 0 && <ImageGallery images={images} />}
        </div>
        <h2>{title}</h2>
        <span>
          <HiOutlineLocationMarker />
          {location}
        </span>
        <h3 className={styles.title}>توضیحات</h3>
        <p>{description}</p>
        <h3 className={styles.title}>امکانات رفاهی</h3>
        <ItemList data={amenities} />
        <h3 className={styles.title}>قوانین</h3>
        <ItemList data={rules} />
      </div>
      <div className={styles.sidebar}>
        <div className={styles.realState}>
          <SiHomebridge />
          <p>املاک {realState}</p>
          <span>
            <AiOutlinePhone />
            {e2p(phone)}
          </span>
        </div>
        <ShareButton />
        <div className={styles.price}>
          <p>
            {icons[category]}
            {categories[category]}
          </p>
          <p>{sp(price)} نومان</p>
          <p>
            <BiCalendarCheck />
            {new Date(constructionDate).toLocaleDateString("fa-IR")}
          </p>
        </div>
      </div>
    </div>
  );
}

export default DetailsPage;
