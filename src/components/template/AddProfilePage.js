"use client";
import { useEffect, useState } from "react";
import TextInput from "../module/TextInput";
import styles from "./AddProfilePage.module.css";
import RadioList from "../module/RadioList";
import TextList from "../module/TextList";
import CustomDatePicker from "../module/CustomDatePicker";
import toast, { Toaster } from "react-hot-toast";
import { ThreeDots } from "react-loader-spinner";
import { useRouter } from "next/navigation";

function AddProfilePage({ data }) {
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    Totalfloors: "",
    floors: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
    images: [], // {file, preview, uploaded, url, progress}
  });

  useEffect(() => {
    if (data) {
      setProfileData({
        ...data,
        images: data.images.map((url) => ({
          file: null,
          preview: url,
          uploaded: true,
          url,
          progress: 100,
        })),
      });
    }
  }, [data]);

  const router = useRouter();
  const [loading, setLoading] = useState(false);

  // انتخاب تصاویر
  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
      uploaded: false,
      url: null,
      progress: 0,
    }));

    setProfileData((prev) => {
      prev.images.forEach(
        (img) => img.file && img.preview && URL.revokeObjectURL(img.preview)
      );
      return { ...prev, images: [...prev.images, ...newImages] };
    });
  };

  // ثبت یا ویرایش آگهی
  // ثبت یا ویرایش آگهی
  const submitProfile = async (method = "POST") => {
    // 📌 ولیدیشن شماره تماس

    // 📌 ولیدیشن عنوان
    if (!profileData.title?.trim()) {
      return toast.error("عنوان آگهی وارد نشده");
    }
    if (profileData.title.trim().length < 5) {
      return toast.error("عنوان آگهی نباید کمتر از 5 حرف باشد");
    }

    // 📌 ولیدیشن توضیحات
    if (!profileData.description?.trim()) {
      return toast.error("توضیحات وارد نشده");
    }

    // 📌 ولیدیشن قیمت
    const priceStr = String(profileData.price ?? ""); // همیشه تبدیل به استرینگ
    if (!priceStr.trim()) {
      return toast.error("قیمت وارد نشده");
    }
    const phonePattern = /^09\d{9}$/;
    if (!phonePattern.test(profileData.phone)) {
      return toast.error("شماره تماس باید 11 رقم و با 09 شروع شود");
    }
    const priceNum = Number(priceStr.replace(/,/g, "")); // حذف کاما و تبدیل به عدد
    if (isNaN(priceNum)) {
      return toast.error("قیمت باید عدد باشد");
    }
    // 📌 ولیدیشن تعداد طبقات
    if (!profileData.Totalfloors?.trim()) {
      return toast.error("تعداد کل طبقات وارد نشده");
    }
    if (isNaN(Number(profileData.Totalfloors))) {
      return toast.error("تعداد کل طبقات باید عدد باشد");
    }

    // 📌 ولیدیشن طبقه
    if (!profileData.floors?.trim()) {
      return toast.error("شماره طبقه وارد نشده");
    }
    if (isNaN(Number(profileData.floors))) {
      return toast.error("شماره طبقه باید عدد باشد");
    }

    if (!phonePattern.test(profileData.phone)) {
      return toast.error("شماره تماس باید 11 رقم و با 09 شروع شود");
    }

    if (priceNum < 1000000) {
      return toast.error("قیمت نباید کمتر از 1 میلیون باشد");
    }

    // 🚀 آپلود و ارسال
    setLoading(true);
    try {
      // آپلود تصاویر
      const imagesUrls = [];
      for (const img of profileData.images) {
        if (!img.uploaded && img.file) {
          const formData = new FormData();
          formData.append("images", img.file);

          const res = await fetch("/api/upload", {
            method: "POST",
            body: formData,
          });

          const data = await res.json();
          if (!res.ok || !data.urls) throw new Error("آپلود تصویر موفق نبود");

          imagesUrls.push(data.urls[0]);
        } else if (img.uploaded) {
          imagesUrls.push(img.url);
        }
      }

      // دیتای نهایی
      const finalData = {
        ...profileData,
        price: priceNum, // به عدد ذخیره شه
        images: imagesUrls,
      };

      // ذخیره پروفایل
      const res = await fetch("/api/profile", {
        method,
        body: JSON.stringify(finalData),
        headers: { "Content-Type": "application/json" },
      });

      const data = await res.json();
      if (data.error) {
        toast.error(data.error);
      } else {
        toast.success(data.message);
        router.push("/dashboard/my-profile");
        router.refresh();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h3>{data ? "ویرایش آگهی" : "ثبت آگهی"}</h3>

      <TextInput
        title="عنوان آگهی"
        name="title"
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <TextInput
        title="توضیحات"
        name="description"
        profileData={profileData}
        setProfileData={setProfileData}
        textarea
      />

      <TextInput
        title="آدرس"
        name="location"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="شماره تماس"
        name="phone"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="قیمت(تومان)"
        name="price"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="بنگاه"
        name="realState"
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <RadioList profileData={profileData} setProfileData={setProfileData} />
      <TextInput
        title="تعداد کل طبقات"
        name="Totalfloors"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextInput
        title="طبقه"
        name="floors"
        profileData={profileData}
        setProfileData={setProfileData}
      />
      <TextList
        title="امکانات رفاهی"
        profileData={profileData}
        setProfileData={setProfileData}
        type="amenities"
      />
      <TextList
        title="قوانین"
        profileData={profileData}
        setProfileData={setProfileData}
        type="rules"
      />
      <CustomDatePicker
        profileData={profileData}
        setProfileData={setProfileData}
      />

      <div className={styles.imageUpload}>
        <label className={styles.uploadLabel}>
          افزودن عکس
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleImagesChange}
            style={{ display: "none" }}
          />
        </label>

        <div className={styles.preview}>
          {profileData.images.map((img, index) => (
            <div key={index} className={styles.imageBox}>
              <img
                src={img.uploaded ? img.url : img.preview}
                alt={`preview-${index}`}
              />
              <button
                type="button"
                className={styles.removeBtn}
                onClick={() =>
                  setProfileData((prev) => {
                    const updated = [...prev.images];
                    if (!updated[index].uploaded && updated[index].preview)
                      URL.revokeObjectURL(updated[index].preview);
                    updated.splice(index, 1);
                    return { ...prev, images: updated };
                  })
                }
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      </div>

      {loading ? (
        <ThreeDots
          visible
          height="80"
          width="80"
          color="#304ffe"
          wrapperStyle={{ margin: "auto" }}
        />
      ) : data ? (
        <button
          className={styles.submit}
          onClick={() => submitProfile("PATCH")}
        >
          ویرایش آگهی
        </button>
      ) : (
        <button className={styles.submit} onClick={() => submitProfile("POST")}>
          ثبت آگهی
        </button>
      )}

      <Toaster />
    </div>
  );
}

export default AddProfilePage;
