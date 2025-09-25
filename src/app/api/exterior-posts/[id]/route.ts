import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Post from "@/models/ExteriorPosts";

interface routeParams {
  params: { id: string };
}

export async function DELETE(request: Request, { params }: routeParams) {
  try {
    await connect();

    const { id } = params;

    await Post.findByIdAndDelete(id);

    return new NextResponse("Post has been deleted", { status: 200 });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
}
