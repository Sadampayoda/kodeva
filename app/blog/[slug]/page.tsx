"use client";

import { useParams } from "next/navigation";
import BlogDetailPage from "@/pages/BlogDetailPage";
import useBlogDetail from "@/hooks/useBlogDetail";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const blogDetailState = useBlogDetail(params?.slug);

  return <BlogDetailPage {...blogDetailState} />;
}

