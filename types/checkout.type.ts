import { PaymentMethod, PaymentSimulationStatus } from "@/enums/payment.enum";
import { CartItem } from "@/types/cart.type";

export interface BuyerFormData {
  fullName: string;
  email: string;
  whatsapp?: string;
  paymentMethod: PaymentMethod;
}

export interface BuyerFormErrors {
  fullName?: string;
  email?: string;
  whatsapp?: string;
  general?: string;
}

export interface OrderReceipt {
  orderId: string;
  date: string;
  buyer: BuyerFormData;
  items: CartItem[];
  subtotal: number;
  totalDiscount: number;
  grandTotal: number;
  licenseKeys: string[];
  status: PaymentSimulationStatus;
}
