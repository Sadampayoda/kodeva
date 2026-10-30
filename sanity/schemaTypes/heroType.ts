import { defineField, defineType } from "sanity";

export const heroType = defineType({
  name: "landingHero",
  title: "Hero Section Landing",
  type: "document",
  fields: [
    defineField({
      name: "badgeText",
      title: "Teks Badge",
      type: "string",
      initialValue: "Solusi Digital Modern",
    }),
    defineField({
      name: "title",
      title: "Judul Hero",
      type: "string",
      validation: (r) => r.required().max(120),
      initialValue: "Bangun Bisnis Digital Lebih Cepat & Efisien",
    }),
    defineField({
      name: "subtitle",
      title: "Subjudul",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(250),
      initialValue: "Dapatkan source code website siap pakai, SaaS starter kit, dan template premium untuk mempercepat peluncuran produk Anda.",
    }),
    defineField({
      name: "backgroundImage",
      title: "Gambar Background Hero",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
    }),
    defineField({
      name: "ctaText",
      title: "Teks Tombol CTA",
      type: "string",
      initialValue: "Jelajahi Produk Unggulan",
    }),
    defineField({
      name: "ctaLink",
      title: "Link Tombol CTA",
      type: "string",
      initialValue: "#featured-products",
    }),
  ],
});

