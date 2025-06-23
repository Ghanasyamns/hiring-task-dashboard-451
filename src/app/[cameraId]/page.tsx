import { getCameraDetails } from "@/lib/api";
import CameraHeader from "./components/camera-header";
import { formatDate } from "@/lib/utils";
import LiveFeed from "./components/live-feed";
import StreamingConfig from "./components/streaming-config";
import TagsCard from "./components/tags-card";
import DemographicsConfig from "./components/demographics-config";
type Props = {
  params: Promise<{
    cameraId: string;
  }>;
};
async function CameraDetails({ params }: Props) {
  const { cameraId } = await params;
  console.log(cameraId);

  const data = await getCameraDetails(cameraId);

  return (
    <main>
      <div className="container">
        <CameraHeader data={data} />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Camera Feed and Basic Info */}
          <div className="lg:col-span-2 space-y-6">
            <LiveFeed data={data} />
            <StreamingConfig data={data} />
          </div>

          {/* Right Column - Tags and Demographics Config */}
          <div className="space-y-6">
            <TagsCard tags={data.tags} />
            <DemographicsConfig data={data.demographics_config} />
          </div>
        </div>
      </div>
    </main>
  );
}

export default CameraDetails;
