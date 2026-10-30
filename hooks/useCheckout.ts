import { useState } from "react";
import useCart from "@/hooks/useCart";
import { BuyerFormData, BuyerFormErrors, OrderReceipt } from "@/types/checkout.type";
import { PaymentMethod, PaymentSimulationStatus } from "@/enums/payment.enum";

function generateLicenseKey(prefix: string): string {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  const part = () =>
    Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join("");
  return `${prefix.toUpperCase()}-${part()}-${part()}-${part()}`;
}

export default function useCheckout() {
  const [formData, setFormData] = useState<BuyerFormData>({
    fullName: "",
    email: "",
    whatsapp: "",
    paymentMethod: PaymentMethod.QRIS,
  });
  const [formErrors, setFormErrors] = useState<BuyerFormErrors>({});
  const [simulationMode, setSimulationMode] = useState<"success" | "failed">("success");
  const [paymentStatus, setPaymentStatus] = useState<PaymentSimulationStatus>(PaymentSimulationStatus.IDLE);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [receipt, setReceipt] = useState<OrderReceipt | null>(null);

  const { items, totals, handleClearCart } = useCart();

  const handleInputChange = (field: keyof BuyerFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (formErrors[field as keyof BuyerFormErrors]) {
      setFormErrors((prev) => ({ ...prev, [field]: undefined, general: undefined }));
    }
  };

  const handleSelectPaymentMethod = (method: PaymentMethod) => {
    setFormData((prev) => ({ ...prev, paymentMethod: method }));
  };

  const handleToggleSimulationMode = (mode: "success" | "failed") => {
    setSimulationMode(mode);
    setErrorMessage(null);
  };

  const handleValidateForm = (): boolean => {
    const errors: BuyerFormErrors = {};

    if (!formData.fullName || formData.fullName.trim().length < 3) {
      errors.fullName = "Nama lengkap wajib diisi minimal 3 karakter.";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email.trim())) {
      errors.email = "Format alamat email tidak valid.";
    }

    if (formData.whatsapp && formData.whatsapp.trim().length > 0) {
      const phoneRegex = /^(\+?[0-9]{9,16})$/;
      if (!phoneRegex.test(formData.whatsapp.trim().replace(/[\s-]/g, ""))) {
        errors.whatsapp = "Format nomor WhatsApp minimal 9 digit angka.";
      }
    }

    if (items.length === 0) {
      errors.general = "Keranjang belanja Anda masih kosong.";
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSimulatePayment = async () => {
    setErrorMessage(null);

    if (!handleValidateForm()) return;

    setPaymentStatus(PaymentSimulationStatus.PROCESSING);

    await new Promise((resolve) => setTimeout(resolve, 1500));

    if (simulationMode === "failed") {
      setPaymentStatus(PaymentSimulationStatus.FAILED);
      setErrorMessage("Simulasi Pembayaran Gagal: Saldo tidak mencukupi atau transaksi dibatalkan oleh bank simulator.");
      return;
    }

    const licenseKeys = items.flatMap((item) =>
      Array.from({ length: item.quantity }, (_, i) =>
        generateLicenseKey(`${item.slug.slice(0, 3)}-${item.tier.slice(0, 2)}${i + 1}`)
      )
    );

    const newReceipt: OrderReceipt = {
      orderId: `KDV-${Date.now().toString().slice(-6)}`,
      date: new Intl.DateTimeFormat("id-ID", {
        dateStyle: "long",
        timeStyle: "short",
      }).format(new Date()),
      buyer: formData,
      items: [...items],
      subtotal: totals.subtotal,
      totalDiscount: totals.totalDiscount,
      grandTotal: totals.grandTotal,
      licenseKeys,
      status: PaymentSimulationStatus.SUCCESS,
    };

    setReceipt(newReceipt);
    setPaymentStatus(PaymentSimulationStatus.SUCCESS);
    handleClearCart();
  };

  const handleResetCheckout = () => {
    setPaymentStatus(PaymentSimulationStatus.IDLE);
    setErrorMessage(null);
    setReceipt(null);
  };

  return {
    items,
    totals,
    formData,
    formErrors,
    simulationMode,
    paymentStatus,
    errorMessage,
    receipt,
    handleInputChange,
    handleSelectPaymentMethod,
    handleToggleSimulationMode,
    handleSimulatePayment,
    handleResetCheckout,
  };
}

export type UseCheckoutReturn = ReturnType<typeof useCheckout>;
