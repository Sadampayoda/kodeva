import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ProductItem } from "@/types/product.type";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");
    const search = searchParams.get("search");

    const content = await fs.readFile(PRODUCTS_FILE, "utf-8");
    let products: ProductItem[] = JSON.parse(content);

    if (category && category !== "Semua") {
      products = products.filter(
        (p) => p.category?.toLowerCase() === category.toLowerCase()
      );
    }

    if (search) {
      const q = search.toLowerCase();
      products = products.filter(
        (p) =>
          p.title.toLowerCase().includes(q) ||
          p.excerpt.toLowerCase().includes(q)
      );
    }

    return NextResponse.json({
      success: true,
      total: products.length,
      data: products,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat katalog produk" },
      { status: 500 }
    );
  }
}

