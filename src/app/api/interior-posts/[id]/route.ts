import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/InteriorPost";

export async function DELETE (
  request: Request,
  context: { params: { id: string } }
): Promise<NextResponse> {
  try {
    await connect();

    const { id } = context.params;

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
