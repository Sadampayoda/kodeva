import { defineField, defineType } from "sanity";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimoni Klien",
  type: "document",
  fields: [
    defineField({
      name: "name",
      title: "Nama Klien",
      type: "string",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "role",
      title: "Jabatan / Pekerjaan",
      type: "string",
      initialValue: "Founder & CEO",
    }),
    defineField({
      name: "company",
      title: "Nama Perusahaan / Bisnis",
      type: "string",
    }),
    defineField({
      name: "avatar",
      title: "Foto Avatar",
      type: "image",
      options: { hotspot: true },
    }),
    defineField({
      name: "content",
      title: "Pesan Testimoni",
      type: "text",
      rows: 4,
      validation: (r) => r.required().max(350),
    }),
    defineField({
      name: "rating",
      title: "Rating (Bintang 1-5)",
      type: "number",
      initialValue: 5,
      validation: (r) => r.required().min(1).max(5),
    }),
  ],
});

