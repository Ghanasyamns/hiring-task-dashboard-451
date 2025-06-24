import { getDemographicsResults } from "@/lib/api";
import Dashboard from "./components/Dashboard";
type Props = {
  params: Promise<{
    cameraId: string;
  }>;
  searchParams?: Promise<{
    gender?: string;
    age?: string;
    emotion?: string;
    ethnicity?: string;
    start_date?: string;
    end_date?: string;
  }>;
};
async function DemographicsResults({ params, searchParams }: Props) {
  const { cameraId } = await params;
  const queryParams = await searchParams;

  const data = await getDemographicsResults(cameraId, queryParams);

  return (
    <div>
      <Dashboard data={data} />
    </div>
  );
}

export default DemographicsResults;
