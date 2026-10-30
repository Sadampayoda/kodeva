import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import type { SanityClientProps } from "@/types/sanity.type";

const clientConfig: SanityClientProps = {
  projectId,
  dataset,
  apiVersion,
  useCdn: false,
};

export const client = createClient(clientConfig);

export const writeClient = createClient({
  ...clientConfig,
  token: process.env.SANITY_API_TOKEN,
});
