import prisma from "@/lib/prisma";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id: idStr } = await params;
    const id = parseInt(idStr);
    const study = await prisma.caseStudy.findUnique({
      where: { id },
    });

    if (!study) {
      return Response.json(
        { success: false, error: "Case study not found" },
        { status: 404 }
      );
    }

    return Response.json({ success: true, data: study });
  } catch (error) {
    console.error("Error fetching case study:", error);
    return Response.json(
      { success: false, error: "Failed to fetch case study" },
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

    const study = await prisma.caseStudy.update({
      where: { id },
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
    console.error("Error updating case study:", error);
    return Response.json(
      { success: false, error: "Failed to update case study" },
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

    await prisma.caseStudy.delete({
      where: { id },
    });

    return Response.json({ success: true });
  } catch (error) {
    console.error("Error deleting case study:", error);
    return Response.json(
      { success: false, error: "Failed to delete case study" },
      { status: 500 }
    );
  }
}
