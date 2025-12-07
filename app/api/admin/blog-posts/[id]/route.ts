import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const post = await prisma.blogPost.findUnique({
      where: { id },
    });

    if (!post) {
      return Response.json({ success: false, error: "Post not found" }, { status: 404 });
    }

    return Response.json({ success: true, data: post });
  } catch (error) {
    console.error("Error fetching blog post:", error);
    return Response.json(
      { success: false, error: "Failed to fetch blog post" },
      { status: 500 }
    );
  }
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const body = await request.json();
    const {
      title,
      slug,
      excerpt,
      content,
      featuredImage,
      category,
      tags,
      metaTitle,
      metaDescription,
      status,
      publishedAt,
    } = body;

    const post = await prisma.blogPost.update({
      where: { id },
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        excerpt,
        content,
        featuredImage,
        category,
        tags: tags || [],
        metaTitle,
        metaDescription,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    return Response.json({ success: true, data: post });
  } catch (error) {
    console.error("Error updating blog post:", error);
    return Response.json(
      { success: false, error: "Failed to update blog post" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);

    await prisma.blogPost.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting blog post:", error);
    return Response.json(
      { success: false, error: "Failed to delete blog post" },
      { status: 500 }
    );
  }
}
