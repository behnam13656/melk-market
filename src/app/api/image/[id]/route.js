import { NextResponse } from "next/server";
import mongoose from "mongoose";
import { getGridFSBucket } from "@/utils/gridFs";

export async function GET(req, { params }) {
  try {
    const bucket = await getGridFSBucket();
    const id = new mongoose.Types.ObjectId(params.id);

    const files = await bucket.find({ _id: id }).toArray();
    if (!files.length)
      return NextResponse.json({ error: "عکس یافت نشد" }, { status: 404 });

    const file = files[0];
    const stream = bucket.openDownloadStream(id);

    return new NextResponse(stream, {
      headers: {
        "Content-Type": file.contentType,
      },
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: "خطای سرور" }, { status: 500 });
  }
}
