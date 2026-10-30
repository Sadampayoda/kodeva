import { type SchemaTypeDefinition } from "sanity";
import { postType } from "./postType";
import { categoryType } from "./categoryType";
import { blockContentType } from "./blockContentType";
import { heroType } from "./heroType";
import { productType } from "./productType";
import { testimonialType } from "./testimonialType";
import { faqType } from "./faqType";
import { leadType } from "./leadType";

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [
    postType,
    categoryType,
    blockContentType,
    heroType,
    productType,
    testimonialType,
    faqType,
    leadType,
  ],
};
