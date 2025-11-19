import { ClipLoader } from "react-spinners";

export default function Loading() {
  return (
    <div className="center_page">
      <ClipLoader
        color="#D92D2C"
        size={50}
        aria-label="Loading Spinner"
        data-testid="loader"
      />
    </div>
  );
}
