import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import sharp from "sharp"; // npm i sharp

export const POST = async (req) => {
  try {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.includes("multipart/form-data")) {
      return NextResponse.json({ error: "فرمت فایل نامعتبر" }, { status: 400 });
    }

    const boundaryMatch = contentType.match(/boundary=(.+)$/);
    if (!boundaryMatch) return NextResponse.json({ error: "خطا در boundary" }, { status: 400 });
    const boundary = `--${boundaryMatch[1]}`;

    const buffer = Buffer.from(await req.arrayBuffer());
    const uploadDir = path.join(process.cwd(), "public/uploads");
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const parts = buffer
      .toString("binary")
      .split(boundary)
      .filter(p => p.includes("filename="));

    const urls = [];

    for (const part of parts) {
      const match = part.match(/filename="(.+?)"/);
      if (!match) continue;

      const originalName = match[1];
      const tempStart = part.indexOf("\r\n\r\n") + 4;
      const fileBuffer = Buffer.from(part.slice(tempStart), "binary");

      // نام فایل جدید با پسوند webp
      const filename = Date.now() + "-" + originalName.split(".")[0] + ".webp";
      const filepath = path.join(uploadDir, filename);

      // تبدیل و فشرده‌سازی با sharp
      await sharp(fileBuffer)
        .webp({ quality: 70 }) // کیفیت 70 درصد، می‌تونی کمتر یا بیشتر کنی
        .toFile(filepath);

      urls.push(`/uploads/${filename}`);
    }

    return NextResponse.json({ urls });
  } catch (err) {
    console.error("Upload Error:", err);
    return NextResponse.json({ error: "مشکلی در آپلود رخ داده است" }, { status: 500 });
  }
};
