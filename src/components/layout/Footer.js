import Link from "next/link";
import styles from "./Footer.module.css";
function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.desc}>
        <h3>سامانه خرید و اجاره ملک</h3>
        <p>
          این سامانه تحت نظارت معتبرترین معتبرترین موسسه املاک خرم آباد منطقه ۳
          است این موسسه املاک با توجه به معاملات شما سوت‌های مقرون به صرفه اسما
          اخذ می‌کند
        </p>{" "}
      </div>
      <div>
        <ul>
          <li>
            <Link href="#">تعرفه قانونی</Link>
          </li>
          <li>
            <Link href="#">دسترسی سریع</Link>
          </li>
          <li>
            <Link href="#">مشاورین خبره</Link>
          </li>
          <li>
            <Link href="#">قوانین محضری</Link>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
