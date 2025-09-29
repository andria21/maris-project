import { NextResponse } from "next/server";
import connect from "@/utils/db";
import Project from "@/models/ExteriorProjects";
import ExteriorPost from "@/models/ExteriorPosts";

export const GET = async () => {
  try {
    await connect();

    const projects = await Project.find();

    const projectsWithPostTitle = await Promise.all(
      projects.map(async (project) => {
        const relatedPost = await ExteriorPost.findById(
          project.projectId,
          "title" // only select the title
        );

        return {
          ...project.toObject(),
          postTitle: relatedPost ? relatedPost.title : null,
        };
      })
    );

    return new NextResponse(JSON.stringify(projectsWithPostTitle), {
      status: 200,
    });
  } catch (err) {
    return new NextResponse("Database Error" + err, { status: 500 });
  }
};
