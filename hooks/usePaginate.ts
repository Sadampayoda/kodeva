import { PaginationProps } from "@/types/paginate.type";

export default function usePaginate({
  currentPage = 1,
  totalPages = 3,
  onPageChange,
}: PaginationProps) {
  const handleGetPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      pages.push(1);

      if (currentPage > 3) {
        pages.push("...");
      }

      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        pages.push(i);
      }

      if (currentPage < totalPages - 2) {
        pages.push("...");
      }

      pages.push(totalPages);
    }

    return pages;
  };

  const handlePageClick = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange?.(page);
    }
  };

  const isFirstPage = currentPage <= 1;
  const isLastPage = currentPage >= totalPages;
  return {
    handleGetPageNumbers,
    handlePageClick,
    isFirstPage,
    isLastPage,
  };
}
