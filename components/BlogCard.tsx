import React from "react";
import Link from "next/link";
import Card from "@/components/Card";

export interface BlogCardProps {
  title: string;
  slug?: string;
  excerpt: string;
  category: string;
  coverImage: string;
  publishedAt: string;
}

export const BlogCard: React.FC<BlogCardProps> = ({
  title,
  slug = "#",
  excerpt,
  category,
  coverImage,
  publishedAt,
}) => {
  return (
    <Card
      radius="2xl"
      border
      bgColor="bg-white"
      className="group p-0 flex flex-col sm:flex-row overflow-hidden hover:shadow-xl transition-all duration-300"
    >
      <div className="w-full sm:w-5/12 aspect-[16/10] sm:aspect-auto relative overflow-hidden bg-zinc-100 flex-shrink-0 min-h-[200px]">
        <img
          src={coverImage}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
        />
      </div>

      <div className="w-full sm:w-7/12 p-6 sm:p-7 flex flex-col justify-between">
        <div>
          <span className="inline-block text-[10px] font-bold tracking-wider uppercase text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full mb-3">
            {category}
          </span>

          <Link href={slug}>
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-zinc-900 group-hover:text-blue-600 transition-colors leading-snug">
              {title}
            </h3>
          </Link>

          <p className="text-xs sm:text-sm text-zinc-500 line-clamp-2 mt-2 leading-relaxed">
            {excerpt}
          </p>
        </div>

        <div className="flex items-center gap-2 pt-5 mt-4 border-t border-zinc-100 text-xs text-zinc-400">
          <span>{publishedAt}</span>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
