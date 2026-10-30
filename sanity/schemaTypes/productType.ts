import { defineField, defineType } from "sanity";

export const productType = defineType({
  name: "product",
  title: "Produk Marketplace",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Nama Produk",
      type: "string",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "price",
      title: "Harga (IDR)",
      type: "number",
      validation: (r) => r.required().min(0),
    }),
    defineField({
      name: "originalPrice",
      title: "Harga Asli (Coret)",
      type: "number",
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan Singkat",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(220),
    }),
    defineField({
      name: "coverImage",
      title: "Gambar Produk",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Alt text", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "badge",
      title: "Badge Produk",
      type: "string",
      options: {
        list: [
          { title: "Best Seller", value: "Best Seller" },
          { title: "Featured", value: "Featured" },
          { title: "Popular", value: "Popular" },
          { title: "New", value: "New" },
        ],
      },
      initialValue: "Featured",
    }),
    defineField({
      name: "isFeatured",
      title: "Tampilkan di Produk Unggulan Landing Page?",
      type: "boolean",
      initialValue: true,
    }),
    defineField({
      name: "rating",
      title: "Rating (1-5)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.min(1).max(5),
    }),
    defineField({
      name: "category",
      title: "Kategori Produk",
      type: "reference",
      to: [{ type: "category" }],
    }),
    defineField({
      name: "demoUrl",
      title: "URL Live Demo",
      type: "url",
    }),
  ],
});

