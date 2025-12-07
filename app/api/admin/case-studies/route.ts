import prisma from "@/lib/prisma";

// Case Studies API
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
        { clientIndustry: { contains: search, mode: "insensitive" } },
      ],
    };

    if (status) {
      where.status = status;
    }

    const total = await prisma.caseStudy.count({ where });
    const studies = await prisma.caseStudy.findMany({
      where,
      skip: (page - 1) * limit,
      take: limit,
      orderBy: { createdAt: "desc" },
    });

    return Response.json({
      success: true,
      data: studies,
      pagination: {
        total,
        page,
        limit,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching case studies:", error);
    return Response.json(
      { success: false, error: "Failed to fetch case studies" },
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
      clientName,
      clientIndustry,
      problem,
      solution,
      results,
      featuredImage,
      tags,
      metaTitle,
      metaDescription,
      status,
      publishedAt,
    } = body;

    const study = await prisma.caseStudy.create({
      data: {
        title,
        slug: slug || title.toLowerCase().replace(/\s+/g, "-"),
        clientName,
        clientIndustry,
        problem,
        solution,
        results: results || {},
        featuredImage,
        tags: tags || [],
        metaTitle,
        metaDescription,
        status,
        publishedAt: publishedAt ? new Date(publishedAt) : null,
      },
    });

    return Response.json({ success: true, data: study });
  } catch (error) {
    console.error("Error creating case study:", error);
    return Response.json(
      { success: false, error: "Failed to create case study" },
      { status: 500 }
    );
  }
}
