"use client";

import React from "react";
import CheckoutPage from "@/pages/CheckoutPage";
import useCheckout from "@/hooks/useCheckout";

export default function Page() {
  const checkoutState = useCheckout();

  return <CheckoutPage {...checkoutState} />;
}

