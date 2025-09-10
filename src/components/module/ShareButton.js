"use client";
import { FiShare2 } from "react-icons/fi";
import styles from "./ShareButton.module.css";
import { useEffect, useState } from "react";
import CopyToClipboard from "react-copy-to-clipboard";

function ShareButton() {
  const [url, setUrl] = useState();

  useEffect(() => {
    setUrl(window.location.href);
  }, []);
  return (
    <CopyToClipboard text={url}>
      <div className={styles.container}>
        <FiShare2 />
        <button>اشتراک گذاری</button>
      </div>
    </CopyToClipboard>
  );
}

export default ShareButton;
