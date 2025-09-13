import React from "react";
import styles from "./CategoryCard.module.css";
import Link from "next/link";
import Image from "next/image";
function CategoryCard({ title, name }) {
  return (
    <div className={styles.card}>
      <Link href={`/buy-residential?category=${name}`}>
        <Image
          src={`/images/${name}.webp`}
          alt={title}
          width={240}
          height={144}
          priority={true}
        />

      </Link>
      <p>{title }</p>
    </div>
  );
}

export default CategoryCard;
