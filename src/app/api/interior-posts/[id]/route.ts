import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/InteriorPost";

export const DELETE = async (
  request: Request,
  { params }: { params: Promise<{ id: string }>}
) => {
  try {
    await connect();

    const { id } = await params;

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
