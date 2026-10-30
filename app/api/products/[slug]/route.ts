import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";
import { ProductItem } from "@/types/product.type";

const PRODUCTS_FILE = path.join(process.cwd(), "data", "products.json");

export async function GET(
  _request: Request,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;
    const content = await fs.readFile(PRODUCTS_FILE, "utf-8");
    const products: ProductItem[] = JSON.parse(content);

    const product = products.find((p) => p.slug === slug);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Produk tidak ditemukan" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch {
    return NextResponse.json(
      { success: false, error: "Gagal memuat detail produk" },
      { status: 500 }
    );
  }
}
