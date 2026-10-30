"use client";

import BlogPage from "@/pages/BlogPage";
import useBlogPage from "@/hooks/useBlogPage";

export default function Page() {
  const blogState = useBlogPage();

  return <BlogPage {...blogState} />;
}
