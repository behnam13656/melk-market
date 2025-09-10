"use client";

import styles from "../../components/template/SignupPage.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { useState } from "react";

function SignupPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const signupHandler = async (e) => {
    e.preventDefault();
    if (!name.trim()) {
      toast.error("نام الزامی است");
      return;
    }
    if (!lastname.trim()) {
      toast.error("نام خانوادگی الزامی است");
      return;
    }
    if (!email.trim()) {
      toast.error("ایمیل الزامی است");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("ایمیل معتبر نیست");
      return;
    }
    if (!password) {
      toast.error("رمز عبور الزامی است");
      return;
    }
    if (password.length < 6) {
      toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
      return;
    }
    if (password !== repassword) {
      toast.error("رمز و تکرار آن برابر نیست!");
      return;
    }

    setLoading(true);
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, lastname }),
    });

    const data = await res.json();
    setLoading(false);

    if (res.status === 201) {
      router.push("/signin");
    } else {
      toast.error(data.error || "مشکلی پیش آمد!");
    }
  };

  return (
    <div className={styles.form}>
      <h4>ثبت نام</h4>
      <form onSubmit={signupHandler}>
        <label>نام :</label>
        <input
          type="text"
          value={name}
          className={styles.rhith}
          onChange={(e) => setName(e.target.value)}
          required
        />

        <label>نام خانوادگی:</label>
        <input
          type="text"
          value={lastname}
          className={styles.rhith}
          onChange={(e) => setLastname(e.target.value)}
          required
        />

        <label>ایمیل :</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label>رمز عبور :</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <label>تکرار رمز عبور:</label>
        <input
          type="password"
          value={repassword}
          onChange={(e) => setRepassword(e.target.value)}
          required
        />

        {loading ? (
          <ThreeDots
            visible={true}
            height="80"
            width="80"
            color="#304ffe"
            ariaLabel="three-dots-loading"
            wrapperStyle={{ margin: "auto " }}
          />
        ) : (
          <button type="submit">ثبت نام</button>
        )}
      </form>

      <p>
        حساب کاربری دارید؟ <Link href={"/signin"}>ورود کنید</Link>
      </p>
      <Toaster />
    </div>
  );
}

export default SignupPage;
