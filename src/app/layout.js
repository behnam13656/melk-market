import { yekan } from "@/utils/fonts";
import "./globals.css";
import Layout from "@/components/layout/Layout";
import NextAuthProvider from "@/providers/NextAuthProvider";
export const metadata = {
  title: "ملک‌ مارکت",
  description:
    "ملک مارکت یه پلتفرم آنلاین برای خرید، فروش و اجاره ملکـه که بهت کمک می‌کنه راحت و سریع خونه یا ملک موردنظرتو پیدا کنی. فقط کافیه جستجو کنی، فیلتر بزنی و مستقیم با صاحب ملک در ارتباط باشی",
  icons: { icon: "./favicon.ico" },
};
export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl">
      <body className={yekan.className}>
        <NextAuthProvider>
          <Layout>{children}</Layout>
        </NextAuthProvider>
      </body>
    </html>
  );
}
