import { ContactType, LeadStatus } from "@/enums/lead.enum";
import { SanityDocument } from "@/types/sanity.type";
import { UtmParams } from "@/types/utm.type";

export interface LeadFormData {
  name: string;
  contact: string;
  message?: string;
  hp?: string;
  utm?: UtmParams;
}

export interface LeadFormErrors {
  name?: string;
  contact?: string;
  general?: string;
}

export interface LeadItem extends SanityDocument {
  name: string;
  contact: string;
  contactType: ContactType;
  message?: string;
  status: LeadStatus;
  submittedAt: string;
  utm?: UtmParams;
}
