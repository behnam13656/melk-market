"use client";

import { useState, useEffect, useRef } from "react";
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
  const [preloadedImages, setPreloadedImages] = useState([]);
  const zoomRef = useRef(null);

  // پیش‌بارگذاری تصاویر
  useEffect(() => {
    async function preload() {
      const previews = await Promise.all(
        images.map(async (url) => {
          try {
            const res = await fetch(url);
            const blob = await res.blob();
            return URL.createObjectURL(blob);
          } catch {
            return url;
          }
        })
      );
      setPreloadedImages(previews);
    }
    preload();
  }, [images]);

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

  const fullscreenSettings = {
    dots: false,
    infinite: true,
    speed: 300,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: fullscreenIndex || 0,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
  };

  // Zoom با موس یا pinch
  const handleWheel = (e) => {
    if (zoomRef.current) {
      e.preventDefault();
      let scale = Number(zoomRef.current.dataset.scale) || 1;
      scale += e.deltaY * -0.001;
      scale = Math.min(Math.max(1, scale), 3);
      zoomRef.current.style.transform = `scale(${scale})`;
      zoomRef.current.dataset.scale = scale;
    }
  };

  return (
    <div className={styles.galleryWrapper}>
      {/* اسلایدر اصلی */}
      <Slider {...sliderSettings}>
        {preloadedImages.map((img, i) => (
          <div key={i} className={styles.slide}>
            <img
              src={img}
              alt={`image-${i}`}
              className={styles.galleryImage}
              loading={i === 0 ? "eager" : "lazy"}
              width={800}
              height={500}
              style={{ objectFit: "cover", cursor: "pointer" }}
              onClick={() => setFullscreenIndex(i)}
            />
          </div>
        ))}
      </Slider>

      {preloadedImages.length > 1 && (
        <div className={styles.slideNumber}>
          {currentSlide + 1} / {preloadedImages.length}
        </div>
      )}

      {/* Fullscreen Modal */}
      {fullscreenIndex !== null && (
        <div className={styles.fullscreenOverlay} onClick={() => setFullscreenIndex(null)}>
          <div className={styles.fullscreenSliderWrapper} onClick={(e) => e.stopPropagation()}>
            {/* دکمه Close */}
            <button className={styles.closeBtn} onClick={() => setFullscreenIndex(null)}>✕</button>

            <Slider {...fullscreenSettings} className={styles.fullscreenSlider}>
              {preloadedImages.map((img, i) => (
                <div key={i} className={styles.zoomWrapper}>
                  <img
                    ref={zoomRef}
                    src={img}
                    alt={`fullscreen-${i}`}
                    className={styles.fullscreenImage}
                    onWheel={handleWheel}
                  />
                </div>
              ))}
            </Slider>
          </div>
        </div>
      )}
    </div>
  );
}
