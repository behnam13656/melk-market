"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import styles from "./SignupPage.module.css";
import Link from "next/link";

function SignupPage() {
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);

  const router = useRouter();

  // قدرت رمز
  const getPasswordStrength = () => {
    let strength = 0;
    if (password.length > 4) strength += 25;
    if (password.length >= 8) strength += 25;
    if (/[A-Z]/.test(password)) strength += 25;
    if (/\d/.test(password) || /[^A-Za-z0-9]/.test(password)) strength += 25;
    return strength;
  };

  const strength = getPasswordStrength();

  const getStrengthColor = () => {
    if (strength <= 25) return "#ff4d4f"; // قرمز
    if (strength <= 50) return "#fa8c16"; // نارنجی
    if (strength <= 75) return "#fadb14"; // زرد
    return "#52c41a"; // سبز
  };

  const getStrengthLabel = () => {
    if (strength <= 25) return "ضعیف";
    if (strength <= 50) return "متوسط";
    if (strength <= 75) return "خوب";
    return "قوی";
  };

  // هندل ثبت نام
  const signupHandler = async (e) => {
    e.preventDefault();

    if (!name.trim()) return toast.error("نام الزامی است");
    if (!lastname.trim()) return toast.error("نام خانوادگی الزامی است");
    if (!email.trim()) return toast.error("ایمیل الزامی است");

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) return toast.error("ایمیل معتبر نیست");

    if (!password) return toast.error("رمز عبور الزامی است");
    if (password.length < 6)
      return toast.error("رمز عبور باید حداقل ۶ کاراکتر باشد");
    if (password !== repassword)
      return toast.error("رمز و تکرار آن برابر نیست!");

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
      <form onSubmit={signupHandler}>
        {/* نام */}
        <div className={styles.inputBox}>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            placeholder=" "
          />
          <label>نام</label>
        </div>

        {/* نام خانوادگی */}
        <div className={styles.inputBox}>
          <input
            type="text"
            value={lastname}
            onChange={(e) => setLastname(e.target.value)}
            required
            placeholder=" "
          />
          <label>نام خانوادگی</label>
        </div>

        {/* ایمیل */}
        <div className={styles.inputBox}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder=" "
          />
          <label>ایمیل</label>
        </div>

        {/* رمز عبور */}
        <div className={styles.inputBox}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>رمز عبور</label>
          <span
            className={styles.icon}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* نوار قدرت رمز */}
        {password && (
          <div className={styles.passwordStrengthWrapper}>
            <div
              className={styles.strengthBar}
              style={{
                width: `${strength}%`,
                backgroundColor: getStrengthColor(),
              }}
            ></div>
            <span className={styles.strengthLabel}>{getStrengthLabel()}</span>
          </div>
        )}

        {/* تکرار رمز */}
        <div className={styles.inputBox}>
          <input
            type={showRePassword ? "text" : "password"}
            value={repassword}
            onChange={(e) => setRepassword(e.target.value)}
            required
            placeholder=" "
          />
          <label>تکرار رمز عبور</label>
          <span
            className={styles.icon}
            onClick={() => setShowRePassword(!showRePassword)}
          >
            {showRePassword ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        {/* دکمه ثبت نام */}
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
          <button type="submit">ثبت‌نام</button>
        )}
        <p className={styles.signin}>
          حساب دارید ؟ <Link href={"/signin"}>ورود کنید</Link>
        </p>
      </form>
      <Toaster />
    </div>
  );
}

export default SignupPage;
