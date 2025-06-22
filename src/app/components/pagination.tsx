"use client";

import { LeftArrow, RightArrow } from "@/components/icons/icons";
import { usePathname, useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

type Props = {
  total: number;
  size: number;
  pages: number;
  page: number;
};
function Pagination({ total, size, pages, page }: Props) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const totalItems = total;
  const totalPages = pages;
  const startIndex = (page - 1) * size;
  const updatePage = (term: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set("page", term.toString());
    } else {
      params.delete("page");
    }
    replace(`${pathname}?${params.toString()}`);
  };

  const renderPageNumbers = () => {
    const items = [];
    const ellipsis = (
      <span key={`ellipsis-${items.length}`} className="px-4 py-2">
        ...
      </span>
    );

    // Always show first page
    items.push(
      <button
        key={1}
        onClick={() => updatePage(1)}
        className={`px-4 py-2 border rounded-md ${
          page === 1 ? "bg-blue-500 text-white" : "hover:bg-gray-50"
        }`}
      >
        1
      </button>
    );

    // Show left ellipsis if current page is far from start
    if (page > 3) {
      items.push(ellipsis);
    }

    // Show current page and one adjacent if needed
    if (page > 2 && page < pages - 1) {
      items.push(
        <button
          key={page}
          onClick={() => updatePage(page)}
          className="px-4 py-2 border rounded-md bg-blue-500 text-white"
        >
          {page}
        </button>
      );
    }

    // Show right ellipsis if current page is far from end
    if (page < pages - 2) {
      items.push(ellipsis);
    }

    // Always show last page if different from first
    if (pages > 1) {
      items.push(
        <button
          key={pages}
          onClick={() => updatePage(pages)}
          className={`px-4 py-2 border rounded-md ${
            page === pages ? "bg-blue-500 text-white" : "hover:bg-gray-50"
          }`}
        >
          {pages}
        </button>
      );
    }

    return items;
  };

  return (
    <Suspense fallback={<div></div>}>
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="text-sm text-gray-600">
          Showing {startIndex + 1} to {Math.min(startIndex + size, totalItems)}{" "}
          of {totalItems} cameras
        </div>

        <div className="flex gap-2">
          <button
            onClick={() => updatePage(page - 1)}
            disabled={page === 1}
            className="px-2 md:px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            {/* Previous */}
            <LeftArrow />
          </button>
          {renderPageNumbers()}

          <button
            onClick={() => updatePage(page + 1)}
            disabled={page === totalPages}
            className="px-2 md:px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            <RightArrow />
          </button>
        </div>
      </div>
    </Suspense>
  );
}

export default Pagination;
