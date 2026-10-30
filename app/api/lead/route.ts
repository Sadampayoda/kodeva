import { NextResponse } from "next/server";
import { writeClient } from "@/lib/sanity/client";
import { ContactType, LeadStatus } from "@/enums/lead.enum";
import { UtmParams } from "@/types/utm.type";
import { promises as fs } from "fs";
import path from "path";

const LEADS_FILE_PATH = path.join(process.cwd(), "data", "leads.json");

interface LeadRecord {
  id: string;
  name: string;
  contact: string;
  contactType: ContactType;
  message?: string;
  status: LeadStatus;
  submittedAt: string;
  utm?: UtmParams;
}

async function saveLeadToFile(record: LeadRecord) {
  try {
    const dir = path.dirname(LEADS_FILE_PATH);
    await fs.mkdir(dir, { recursive: true });

    let existing: LeadRecord[] = [];
    try {
      const content = await fs.readFile(LEADS_FILE_PATH, "utf-8");
      existing = JSON.parse(content);
    } catch {
      existing = [];
    }

    existing.unshift(record);
    await fs.writeFile(LEADS_FILE_PATH, JSON.stringify(existing, null, 2), "utf-8");
  } catch (error) {
    console.error("Failed saving lead locally:", error);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, contact, message, hp, utm } = body;

    if (hp) {
      return NextResponse.json({ success: true, message: "Pesan terkirim" });
    }

    if (!name || typeof name !== "string" || name.trim().length < 3) {
      return NextResponse.json(
        { error: "Nama wajib diisi minimal 3 karakter." },
        { status: 400 }
      );
    }

    if (!contact || typeof contact !== "string") {
      return NextResponse.json(
        { error: "Email atau WhatsApp wajib diisi." },
        { status: 400 }
      );
    }

    const trimmedContact = contact.trim();
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^(\+?[0-9]{9,16})$/;

    let detectedType: ContactType;
    if (emailRegex.test(trimmedContact)) {
      detectedType = ContactType.EMAIL;
    } else if (phoneRegex.test(trimmedContact.replace(/[\s-]/g, ""))) {
      detectedType = ContactType.WHATSAPP;
    } else {
      return NextResponse.json(
        { error: "Masukkan alamat email yang valid atau nomor WhatsApp (min. 9 digit)." },
        { status: 400 }
      );
    }

    const newLead: LeadRecord = {
      id: "lead_" + Date.now(),
      name: name.trim(),
      contact: trimmedContact,
      contactType: detectedType,
      message: typeof message === "string" ? message.trim() : "",
      status: LeadStatus.NEW,
      submittedAt: new Date().toISOString(),
      utm: utm || undefined,
    };

    if (process.env.SANITY_API_TOKEN) {
      try {
        await writeClient.create({
          _type: "lead",
          name: newLead.name,
          contact: newLead.contact,
          contactType: newLead.contactType,
          message: newLead.message,
          status: newLead.status,
          submittedAt: newLead.submittedAt,
        });
      } catch (sanityErr) {
        console.error("Sanity create lead error:", sanityErr);
      }
    }

    await saveLeadToFile(newLead);

    return NextResponse.json({
      success: true,
      message: "Terima kasih! Tim kami akan segera menghubungi Anda.",
      data: newLead,
    });
  } catch {
    return NextResponse.json(
      { error: "Terjadi kesalahan pada server. Silakan coba lagi." },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    let existing: LeadRecord[] = [];
    try {
      const content = await fs.readFile(LEADS_FILE_PATH, "utf-8");
      existing = JSON.parse(content);
    } catch {
      existing = [];
    }

    return NextResponse.json({
      total: existing.length,
      leads: existing,
    });
  } catch {
    return NextResponse.json({ total: 0, leads: [] });
  }
}
