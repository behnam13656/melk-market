"use client";

import { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./ImageGallery.module.css";

function NextArrow({ onClick }) {
  return <button className={styles.nextArrow} onClick={onClick}>▶</button>;
}

function PrevArrow({ onClick }) {
  return <button className={styles.prevArrow} onClick={onClick}>◀</button>;
}

export default function ImageGallery({ images }) {
  const [fullscreenIndex, setFullscreenIndex] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);

  const sliderSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    afterChange: (index) => setCurrentSlide(index),
  };

  return (
    <div className={styles.galleryWrapper}>
      <Slider {...sliderSettings}>
        {images.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={img}
              alt={`image-${i}`}
              className={styles.galleryImage}
              loading={i === 0 ? "eager" : "lazy"} // عکس اول سریع، بقیه lazy
              width={800} // اندازه ثابت برای جلوگیری از CLS
              height={500} 
              style={{ objectFit: "cover" }}
              onClick={() => setFullscreenIndex(i)}
            />
          </div>
        ))}
      </Slider>

      {images.length > 1 && (
        <div className={styles.slideNumber}>
          {currentSlide + 1} / {images.length}
        </div>
      )}
    </div>
  );
}
