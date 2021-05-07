import { AppState } from "../../interfaces";
import Action from "./Radio.action";

function reducer(state: AppState, action: Action): AppState {
  switch (action.type) {
    case "play":
      return {
        ...state,
        playing: true,
      };
    case "pause":
      return {
        ...state,
        playing: false,
      };
    case "change-radio":
      return {
        ...state,
        activeRadio: action.radio,
      };
    case "change-percentage-played":
      return {
        ...state,
        percentagePlayed: action.percentage,
      };
    case "first-load":
      return {
        ...state,
        loadRadio: !state.loadRadio,
      };
    case "change-volume":
      return {
        ...state,
        volume: action.volume,
      };
    case "change-color":
      return {
        ...state,
        color: action.color,
      };
    case "loading":
      return {
        ...state,
        loading: action.loading,
      };
    case "set-stream-url":
      return {
        ...state,
        activeRadio: { ...state.activeRadio, streamURL: action.url },
      };
    case "identifying":
      return {
        ...state,
        identifying: action.identifying,
      };
    case "identified-track":
      return {
        ...state,
        track: action.track,
      };
    case "error": {
      return {
        ...state,
        error: action.error,
      };
    }
    default:
      return state;
  }
}

export default reducer;
