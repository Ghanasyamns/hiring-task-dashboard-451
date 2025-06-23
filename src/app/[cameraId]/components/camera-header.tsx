import { formatDate } from "@/lib/utils";

type Props = {
  data: {
    name: string;
    is_active: boolean;
    status_message: string;
    created_at: string;
    updated_at: string;
  };
};
function CameraHeader({ data }: Props) {
  return (
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
          {data.name}
        </h1>
        <div className="flex items-center mt-2">
          <span
            className={`inline-block w-3 h-3 rounded-full mr-2 ${
              data.is_active ? "bg-green-500" : "bg-red-500"
            }`}
          ></span>
          <span className="text-gray-600">{data.status_message}</span>
        </div>
      </div>
      <div className="text-sm text-gray-500">
        <p>Created: {formatDate(data.created_at)}</p>
        <p>Last updated: {formatDate(data.updated_at)}</p>
      </div>
    </div>
  );
}

export default CameraHeader;
