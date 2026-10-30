"use client";

import React from "react";
import { useParams } from "next/navigation";
import ProductDetailPage from "@/pages/ProductDetailPage";
import useProductDetail from "@/hooks/useProductDetail";

export default function Page() {
  const params = useParams<{ slug: string }>();
  const productDetailState = useProductDetail(params?.slug);

  return <ProductDetailPage {...productDetailState} />;
}

