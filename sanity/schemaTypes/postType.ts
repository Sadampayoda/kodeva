import { defineField, defineType } from "sanity";

export const postType = defineType({
  name: "post",
  title: "Artikel",
  type: "document",
  fields: [
    defineField({
      name: "title",
      title: "Judul",
      type: "string",
      validation: (r) => r.required().max(100),
    }),
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) =>
        r.required().custom((slug) => {
          if (slug?.current && /\s/.test(slug.current)) {
            return "Slug tidak boleh mengandung spasi";
          }
          return true;
        }),
    }),
    defineField({
      name: "status",
      title: "Status Publikasi",
      type: "string",
      options: {
        list: [
          { title: "Draft", value: "draft" },
          { title: "Published", value: "published" },
        ],
        layout: "radio",
      },
      initialValue: "published",
    }),
    defineField({
      name: "coverImage",
      title: "Gambar cover",
      type: "image",
      options: { hotspot: true },
      fields: [
        defineField({ name: "alt", title: "Teks alternatif", type: "string" }),
      ],
      validation: (r) => r.required(),
    }),
    defineField({
      name: "excerpt",
      title: "Ringkasan",
      type: "text",
      rows: 3,
      validation: (r) => r.required().max(200),
    }),
    defineField({
      name: "content",
      title: "Isi artikel",
      type: "blockContent",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "category",
      title: "Kategori",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
      validation: (r) => r.required().min(1),
    }),
    defineField({
      name: "publishedAt",
      title: "Tanggal terbit",
      type: "datetime",
      initialValue: () => new Date().toISOString(),
    }),
    defineField({
      name: "relatedProducts",
      title: "Produk terkait (marketplace)",
      type: "array",
      of: [{ type: "reference", to: [{ type: "product" }] }],
    }),
    defineField({
      name: "seoTitle",
      title: "Judul SEO",
      type: "string",
    }),
    defineField({
      name: "seoDescription",
      title: "Deskripsi SEO",
      type: "text",
      rows: 2,
    }),
    defineField({
      name: "ogImage",
      title: "Gambar Open Graph",
      type: "image",
    }),
  ],
});
