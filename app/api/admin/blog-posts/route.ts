import prisma from "@/lib/prisma";

// Blog Posts API
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const page = parseInt(searchParams.get("page") || "1");
  const limit = parseInt(searchParams.get("limit") || "10");
  const search = searchParams.get("search") || "";
  const status = searchParams.get("status");

  try {
    const where: any = {
      OR: [
        { title: { contains: search, mode: "insensitive" } },
        { slug: { contains: search, mode: "insensitive" } },
      ],
    };

    if (status) {
      where.status = status;
    }

    const total = await prisma.blogPost.count({ where });
    const posts = await prisma.blogPost.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return Response.json({
      success: true,
      data: posts,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching blog posts:", error);
    return Response.json(
      { success: false, error: "Failed to fetch blog posts" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
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

    const post = await prisma.blogPost.create({
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
    console.error("Error creating blog post:", error);
    return Response.json(
      { success: false, error: "Failed to create blog post" },
      { status: 500 }
    );
  }
}
