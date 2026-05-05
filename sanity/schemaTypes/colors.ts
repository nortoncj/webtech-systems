import { defineField, defineType } from "sanity";

export default defineType({
  name: "color",
  title: "Color",
  type: "document",
  icon: () => "🎨",
  fields: [
    defineField({
      name: "color",
      title: "colors",
      type: "string",
    }),
  ],
});
