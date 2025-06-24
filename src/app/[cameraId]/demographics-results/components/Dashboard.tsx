import { DemographicsResult } from "@/types/camera";
import Charts from "./Charts";
import DataTable from "./DataTable";
import Filters from "./Filters";
import SummaryCards from "./SummaryCards";

const Dashboard = ({ data }: { data: DemographicsResult }) => {
  const getFilteredDistribution = (key: "age" | "emotion" | "ethnicity") => {
    const distribution: Record<string, number> = {};
    if (!data) return distribution;

    const allValues = Object.keys(data.analytics[`${key}_distribution`]);
    allValues.forEach((val) => (distribution[val] = 0));
    data.items?.forEach((item) => {
      distribution[item[key]] = (distribution[item[key]] || 0) + item.count;
    });

    return distribution;
  };

  return (
    <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto">
      <h1 className="text-2xl md:text-3xl font-bold mb-6">
        Analytics Dashboard
      </h1>
      <Filters isDataEmpty={data.items.length === 0} />
      <SummaryCards analytics={data.analytics} />
      <Charts
        analytics={data.analytics}
        filteredData={{
          age_distribution: getFilteredDistribution("age"),
          emotion_distribution: getFilteredDistribution("emotion"),
          ethnicity_distribution: getFilteredDistribution("ethnicity"),
        }}
      />
      <DataTable data={data.items ?? []} />
    </div>
  );
};

export default Dashboard;
