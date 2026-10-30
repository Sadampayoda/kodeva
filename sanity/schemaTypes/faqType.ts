import { defineField, defineType } from "sanity";

export const faqType = defineType({
  name: "faq",
  title: "Pertanyaan FAQ",
  type: "document",
  fields: [
    defineField({
      name: "question",
      title: "Pertanyaan",
      type: "string",
      validation: (r) => r.required().max(160),
    }),
    defineField({
      name: "answer",
      title: "Jawaban",
      type: "text",
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: "order",
      title: "Urutan Tampil",
      type: "number",
      initialValue: 0,
    }),
  ],
});

