"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Suspense } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function FilterProps() {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  console.log(searchParams);

  const { replace } = useRouter();

  // add user input value to url qury params
  const handleChange = (term: string, key: "size" | "search") => {
    const params = new URLSearchParams(searchParams.toString());
    if (term) {
      params.set(key, encodeURIComponent(term));
      if (key === "size") {
        params.set("page", "1");
      }
    } else {
      params.delete(key);
    }
    replace(`${pathname}?${params.toString()}`);
  };

  // add debouncer for search input
  const searchDebounce = useDebouncedCallback(
    (term, param) => handleChange(term, param),
    800
  );
  return (
    <Suspense fallback={<div></div>}>
      <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
        <div className="relative">
          <input
            type="text"
            placeholder="Search cameras..."
            className="pl-10 pr-4 py-2 border rounded-lg w-full md:w-64 focus:outline-none focus:ring-2 focus:ring-blue-500"
            defaultValue={searchParams.get("search")?.toString() ?? ""}
            onChange={(e) => searchDebounce(e.target.value, "search")}
          />
          <svg
            className="absolute left-3 top-2.5 h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>

        <select
          className="border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          defaultValue={searchParams.get("size")?.toString() ?? "5"}
          onChange={(e) => handleChange(e.target.value, "size")}
        >
          <option value="5">5 per page</option>
          <option value="10">10 per page</option>
          <option value="20">20 per page</option>
          <option value="50">50 per page</option>
        </select>
      </div>
    </Suspense>
  );
}
