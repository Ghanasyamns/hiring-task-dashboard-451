import { getCameraDetails } from "@/lib/api";

async function CameraDetails() {
  const cameraDetails = await getCameraDetails();
  console.log(cameraDetails);

  return <main>details page</main>;
}

export default CameraDetails;
