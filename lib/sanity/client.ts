import { createClient } from "next-sanity";
import { apiVersion, dataset, projectId } from "@/sanity/env";
import type { SanityClientProps } from "@/types/sanity.type";

const clientConfig: SanityClientProps = {
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
};

export const client = createClient(clientConfig);
