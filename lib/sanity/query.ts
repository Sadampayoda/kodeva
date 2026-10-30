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

  where({ column, value, operator = "==" }: WhereParams): this {
    const formattedValue = typeof value === "string" ? `"${value}"` : value;
    this.conditions.push(`${column} ${operator} ${formattedValue}`);
    return this;
  }

  orderBy({ field, direction = "desc" }: OrderParams): this {
    this.orderRules.push(`${field} ${direction}`);
    return this;
  }

  select(fields: string[]): this {
    this.projections = fields;
    return this;
  }

  paginate(page: number, perPage: number): this {
    this.offsetCount = (page - 1) * perPage;
    this.limitCount = perPage;
    return this;
  }

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

  async execute<T>(): Promise<T> {
    const groq = this.build();
    return client.fetch<T>(groq);
  }
}

export default Query;
