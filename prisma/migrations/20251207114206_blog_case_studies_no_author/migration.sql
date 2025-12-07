-- CreateEnum
CREATE TYPE "PostStatus" AS ENUM ('DRAFT', 'PUBLISHED', 'ARCHIVED');

-- CreateTable
CREATE TABLE "blog_posts" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "excerpt" VARCHAR(500),
    "content" TEXT NOT NULL,
    "featuredImage" TEXT,
    "category" VARCHAR(100) NOT NULL,
    "tags" TEXT[],
    "metaTitle" VARCHAR(255),
    "metaDescription" VARCHAR(500),
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "blog_posts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "case_studies" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR(255) NOT NULL,
    "slug" VARCHAR(255) NOT NULL,
    "clientName" VARCHAR(255),
    "clientIndustry" VARCHAR(100) NOT NULL,
    "problem" TEXT NOT NULL,
    "solution" TEXT NOT NULL,
    "results" JSONB NOT NULL,
    "featuredImage" TEXT,
    "tags" TEXT[],
    "metaTitle" VARCHAR(255),
    "metaDescription" VARCHAR(500),
    "status" "PostStatus" NOT NULL DEFAULT 'DRAFT',
    "publishedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "case_studies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "blog_posts_slug_key" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_slug_idx" ON "blog_posts"("slug");

-- CreateIndex
CREATE INDEX "blog_posts_publishedAt_idx" ON "blog_posts"("publishedAt");

-- CreateIndex
CREATE INDEX "blog_posts_category_idx" ON "blog_posts"("category");

-- CreateIndex
CREATE UNIQUE INDEX "case_studies_slug_key" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_slug_idx" ON "case_studies"("slug");

-- CreateIndex
CREATE INDEX "case_studies_clientIndustry_idx" ON "case_studies"("clientIndustry");

-- CreateIndex
CREATE INDEX "case_studies_publishedAt_idx" ON "case_studies"("publishedAt");
