"use client";

import React from "react";
import ProductCatalogPage from "@/pages/ProductCatalogPage";
import useProductCatalog from "@/hooks/useProductCatalog";

export default function Page() {
  const catalogState = useProductCatalog();

  return <ProductCatalogPage {...catalogState} />;
}

