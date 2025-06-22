"use client";

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
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Previous
          </button>

          {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
            let pageNum;
            if (totalPages <= 5) {
              pageNum = i + 1;
            } else if (page <= 3) {
              pageNum = i + 1;
            } else if (page >= totalPages - 2) {
              pageNum = totalPages - 4 + i;
            } else {
              pageNum = page - 2 + i;
            }

            return (
              <button
                key={pageNum}
                onClick={() => updatePage(pageNum)}
                className={`px-4 py-2 border rounded-md ${
                  page === pageNum
                    ? "bg-blue-500 text-white"
                    : "hover:bg-gray-50"
                }`}
              >
                {pageNum}
              </button>
            );
          })}

          <button
            onClick={() => updatePage(page + 1)}
            disabled={page === totalPages}
            className="px-4 py-2 border rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50"
          >
            Next
          </button>
        </div>
      </div>
    </Suspense>
  );
}

export default Pagination;
