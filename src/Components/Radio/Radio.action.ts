import { RadioStation, IdentifiedTrack } from "../../interfaces/";

type Action =
  | { type: "change-radio"; radio: RadioStation }
  | { type: "change-volume"; volume: number }
  | { type: "play" }
  | { type: "pause" }
  | { type: "first-load" }
  | { type: "loading"; loading: boolean }
  | { type: "show-share"; show: boolean }
  | { type: "set-stream-url"; url: string }
  | { type: "change-color"; color: string | undefined }
  | { type: "change-percentage-played"; percentage: number }
  | { type: "identifying"; identifying: boolean }
  | { type: "identified-track"; track: IdentifiedTrack }
  | { type: "error"; error: string };

export default Action;
