"use client";
import { useState } from "react";
import { signIn } from "next-auth/react";
import styles from "../../components/template/SinginPage.module.css";
import Link from "next/link";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { ThreeDots } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";
function SignInPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showRePassword, setShowRePassword] = useState(false);
  const router = useRouter();
  const signinHandler = async (e) => {
    e.preventDefault();

    setLoading(true);

    const res = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    setLoading(false);
    if (res.error) {
      toast.error(res.error);
    } else {
      router.push("/");
    }
  };
  return (
    <div className={styles.form}>
      <form>
        <div className={styles.inputBox}>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder=" "
          />
          <label>ایمیل</label>
        </div>
        <div className={styles.inputBox}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
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
          <button type="submit" onClick={signinHandler}>
            ورود
          </button>
        )}
        <div className={styles.signin}>
          <p>حساب کاربری ندارید؟</p>
          <Link href={"/signup"}>ثبت نام کنید</Link>
        </div>
      </form>
      <Toaster />
    </div>
  );
}

export default SignInPage;
