import { RadioStation } from "../../interfaces/";

type Action =
  | { type: "change-radio"; radio: RadioStation }
  | { type: "change-volume"; volume: number }
  | { type: "play" }
  | { type: "pause" }
  | { type: "first-load" }
  | { type: "loading"; loading: boolean }
  | { type: "set-stream-url"; url: string }
  | { type: "change-color"; color: string | undefined }
  | { type: "change-percentage-played"; percentage: number };

export default Action;
