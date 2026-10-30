"use client";

import React from "react";
import CartPage from "@/pages/CartPage";
import useCart from "@/hooks/useCart";

export default function Page() {
  const cartState = useCart();

  return <CartPage {...cartState} />;
}

