import { client } from "@/lib/sanity/client";

export interface QueryConstructor {
  table: string;
  limit?: number;
}

export interface WhereParams {
  column: string;
  value: string | number | boolean;
  operator?: "==" | "!=" | ">" | "<" | ">=" | "<=" | "match";
}

export interface OrderParams {
  field: string;
  direction?: "asc" | "desc";
}

export class Query {
  private table: string;
  private limitCount?: number;
  private offsetCount: number = 0;
  private conditions: string[] = [];
  private orderRules: string[] = [];
  private projections: string[] = [];

  constructor({ table, limit }: QueryConstructor) {
    this.table = table;
    this.limitCount = limit;
    this.conditions.push(`_type == "${table}"`);
  }

  /**
   * Filter query GROQ (contoh: column: "slug.current", value: "judul-post")
   */
  where({ column, value, operator = "==" }: WhereParams): this {
    const formattedValue = typeof value === "string" ? `"${value}"` : value;
    this.conditions.push(`${column} ${operator} ${formattedValue}`);
    return this;
  }

  /**
   * Urutan data (contoh: field: "publishedAt", direction: "desc")
   */
  orderBy({ field, direction = "desc" }: OrderParams): this {
    this.orderRules.push(`${field} ${direction}`);
    return this;
  }

  /**
   * Tentukan kolom/field apa saja yang ingin diambil
   * (contoh: ["_id", "title", "slug", '"category": category[]->{title, slug}'])
   */
  select(fields: string[]): this {
    this.projections = fields;
    return this;
  }

  /**
   * Atur pagination halaman
   */
  paginate(page: number, perPage: number): this {
    this.offsetCount = (page - 1) * perPage;
    this.limitCount = perPage;
    return this;
  }

  /**
   * Mengompilasi semua parameter menjadi string query GROQ Sanity yang valid
   */
  build(): string {
    let groqString = `*[${this.conditions.join(" && ")}]`;

    if (this.orderRules.length > 0) {
      groqString += ` | order(${this.orderRules.join(", ")})`;
    }

    if (this.limitCount !== undefined && this.limitCount > 0) {
      const start = this.offsetCount;
      const end = start + this.limitCount;
      groqString += `[${start}...${end}]`;
    }

    if (this.projections.length > 0) {
      groqString += ` {\n  ${this.projections.join(",\n  ")}\n}`;
    }

    return groqString;
  }

  /**
   * Menjalankan query langsung ke database Sanity
   */
  async execute<T>(): Promise<T> {
    const groq = this.build();
    return client.fetch<T>(groq);
  }
}

export default Query;
