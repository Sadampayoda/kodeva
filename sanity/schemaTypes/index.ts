import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [postType, categoryType, blockContentType],
};
