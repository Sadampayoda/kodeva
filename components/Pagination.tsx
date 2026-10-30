"use client";

import usePaginate from "@/hooks/usePaginate";
import { PaginationProps } from "@/types/paginate.type";
import React from "react";

export const Pagination: React.FC<PaginationProps> = ({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
  className = "",
}) => {
  const { handleGetPageNumbers, handlePageClick, isFirstPage, isLastPage } =
    usePaginate({
      currentPage,
      totalPages,
      onPageChange,
    });

  return (
    <nav
      aria-label="Pagination"
      className={`flex items-center justify-center gap-1.5 sm:gap-2 select-none ${className}`}
    >
      {/* Tombol Prev */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage - 1)}
        disabled={isFirstPage}
        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-10 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
          isFirstPage
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50"
            : "border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300 active:scale-95 cursor-pointer bg-white shadow-sm"
        }`}
      >
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        <span>Prev</span>
      </button>

      {/* Nomor Halaman (1, 2, 3...) */}
      <div className="flex items-center gap-1 sm:gap-1.5">
        {handleGetPageNumbers().map((page, index) => {
          if (page === "...") {
            return (
              <span
                key={`ellipsis-${index}`}
                className="w-8 sm:w-9 h-10 flex items-center justify-center text-xs text-zinc-400"
              >
                •••
              </span>
            );
          }

          const pageNum = Number(page);
          const isActive = pageNum === currentPage;

          return (
            <button
              key={pageNum}
              type="button"
              onClick={() => handlePageClick(pageNum)}
              className={`w-9 sm:w-10 h-10 rounded-xl text-xs sm:text-sm font-semibold transition-all cursor-pointer ${
                isActive
                  ? "bg-zinc-950 text-white shadow-md scale-105"
                  : "bg-white border border-zinc-200 text-zinc-700 hover:bg-zinc-100 hover:text-zinc-950 hover:border-zinc-300 active:scale-95 shadow-sm"
              }`}
            >
              {pageNum}
            </button>
          );
        })}
      </div>

      {/* Tombol Next */}
      <button
        type="button"
        onClick={() => handlePageClick(currentPage + 1)}
        disabled={isLastPage}
        className={`inline-flex items-center gap-1.5 px-3.5 sm:px-4 h-10 rounded-xl text-xs sm:text-sm font-semibold border transition-all ${
          isLastPage
            ? "border-zinc-200 text-zinc-300 cursor-not-allowed bg-zinc-50"
            : "border-zinc-200 text-zinc-700 hover:text-zinc-950 hover:bg-zinc-100 hover:border-zinc-300 active:scale-95 cursor-pointer bg-white shadow-sm"
        }`}
      >
        <span>Next</span>
        <svg
          className="w-3.5 h-3.5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth="2.5"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </nav>
  );
};

export default Pagination;
