import { getCameras } from "@/lib/api";
import FilterProps from "./components/filter-props";
import CameraCard from "./components/camera-card";
import Pagination from "./components/pagination";
import { Suspense } from "react";
import Loader from "@/components/loader";
type Props = {
  searchParams?: Promise<{
    search?: string;
    page?: number;
    size?: number;
  }>;
};
export default async function Home(props: Props) {
  const searchParams = await props.searchParams;
  const search = searchParams?.search || "";
  const page = searchParams?.page || 1;
  const size = searchParams?.size || 5;
  const data = await getCameras(search, page, size);
  const {
    items: cameraItems,
    page: currentPage,
    pages,
    size: itemsPerPage,
    total,
  } = data;

  return (
    <main className="container w-full min-h--screen font-[family-name:var(--font-geist-sans)]">
      <div className="">
        <div className="mb-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <h1 className="text-2xl font-bold text-gray-800">
            Camera Management
          </h1>
          <FilterProps />
        </div>

        {cameraItems.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">
              No cameras found matching your search.
            </p>
          </div>
        ) : (
          <>
            <Suspense fallback={<Loader />}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {cameraItems.map((camera) => (
                  <CameraCard key={camera.id} camera={camera} />
                ))}
              </div>
            </Suspense>
            <Pagination
              total={total}
              size={itemsPerPage}
              pages={pages}
              page={currentPage}
            />
          </>
        )}
      </div>
    </main>
  );
}
