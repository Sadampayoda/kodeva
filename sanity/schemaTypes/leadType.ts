import { defineField, defineType } from "sanity";

export const leadType = defineType({
  name: "lead",
  title: "Lead Capture (Marketing)",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Lengkap",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contact",
      title: "Email atau WhatsApp",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "contactType",
      title: "Jenis Kontak",
      type: "string",
      options: {
        list: [
          { title: "Email", value: "email" },
          { title: "WhatsApp", value: "whatsapp" },
        ],
      },
    }),
    defineField({
      name: "message",
      title: "Kebutuhan / Pesan Tambahan",
      type: "text",
      rows: 3,
    }),
    defineField({
      name: "status",
      title: "Status Lead",
      type: "string",
      options: {
        list: [
          { title: "Baru (New)", value: "new" },
          { title: "Sudah Dihubungi (Contacted)", value: "contacted" },
          { title: "Selesai (Closed)", value: "closed" },
        ],
        layout: "radio",
      },
      initialValue: "new",
    }),
    defineField({
      name: "submittedAt",
      title: "Waktu Pengiriman",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
  ],
});

