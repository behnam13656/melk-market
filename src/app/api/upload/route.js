import { NextResponse } from "next/server";
import { getGridFSBucket } from "@/utils/gridFs";

export async function POST(req) {
  try {
    const formData = await req.formData();
    const file = formData.get("images");

    if (!file) {
      return NextResponse.json({ error: "هیچ فایلی ارسال نشده!" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());
    const bucket = await getGridFSBucket();

    return new Promise((resolve, reject) => {
      const uploadStream = bucket.openUploadStream(file.name, {
        contentType: file.type,
      });

      uploadStream.on("error", (err) => {
        console.error("GridFS Upload Error:", err);
        reject(NextResponse.json({ error: "آپلود ناموفق بود" }, { status: 500 }));
      });

      uploadStream.on("finish", (fileInfo) => {
        // ✅ بعضی ورژن‌ها فایل رو توی آرگومان نمی‌فرستن، پس باید از خود استریم بگیریم
        const uploadedId = fileInfo?._id || uploadStream.id;

        if (!uploadedId) {
          return reject(
            NextResponse.json({ error: "شناسه فایل دریافت نشد" }, { status: 500 })
          );
        }

        resolve(
          NextResponse.json(
            { urls: [`/api/image/${uploadedId.toString()}`] },
            { status: 200 }
          )
        );
      });

      uploadStream.end(buffer);
    });
  } catch (err) {
    console.error("Upload API Error:", err);
    return NextResponse.json({ error: "خطا در سرور" }, { status: 500 });
  }
}
