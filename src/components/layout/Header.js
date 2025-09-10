"use client";
import Link from "next/link";
import styles from "../layout/Header.module.css";
import { IoIosLogIn } from "react-icons/io";
import { useSession } from "next-auth/react";
import { FaUserAlt } from "react-icons/fa";
function Header() {
  const { data } = useSession();
  return (
    <div className={styles.header}>
      <div>
        <ul>
          <li>
            <Link href={"/"}>صفحه اصلی</Link>
          </li>
          <li>
            <Link href="/buy-residential">آگهی ها</Link>
          </li>
        </ul>
      </div>
      {data ? (
        <div className={styles.login}>
          <Link href={"/dashboard"}>
            <FaUserAlt />
          </Link>
        </div>
      ) : (
        <div className={styles.login}>
          <Link href={"/signup"}>
            <IoIosLogIn />
            <span>ورود</span>
          </Link>
        </div>
      )}
    </div>
  );
}

export default Header;
