import { useEffect, useReducer, useRef } from "react";
import Player from "react-player";
import ReactSlider from "rc-slider";
import useColorThief from "use-color-thief";

import Slider from "./Components/Slider/Slider";
import { AppWrapper } from "./App.styles";
import { AppState, RadioStation } from "./interfaces";
import fetchStreamURL from "./utils/fetchStreamURL";
import radios from "./data/radios";

import "rc-slider/assets/index.css";

const initialState = {
  radios,
  activeRadio: radios[0],
  volume: 1,
  color: "",
  playing: false,
  loading: false,
  percentagePlayed: Math.random(),
  loadRadio: false,
};

export type Action =
  | { type: "change-radio"; radio: RadioStation }
  | { type: "change-volume"; volume: number }
  | { type: "play" }
  | { type: "pause" }
  | { type: "first-load" }
  | { type: "loading"; loading: boolean }
  | { type: "set-stream-url"; url: string }
  | { type: "change-color"; color: string | undefined }
  | { type: "change-percentage-played"; percentage: number };

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
        loadRadio: true,
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
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { palette } = useColorThief(state.activeRadio.logo, {
    colorCount: 5,
    quality: 10,
  });
  const refPlayer = useRef<any>();

  //fetch the streamURL everytime the activeRadio changes
  useEffect(() => {
    (async () => {
      dispatch({ type: "loading", loading: true });
      const url = await fetchStreamURL(state.activeRadio.url);
      dispatch({ type: "set-stream-url", url });
      dispatch({ type: "loading", loading: false });
    })();
  }, [state.activeRadio.url]);

  useEffect(() => {
    if (palette !== null) {
      if (state.activeRadio.id === 8 || state.activeRadio.id === 10) {
        //if radio is k-jah, master sounds or wctr use last color in palette
        //because the first one doesn't contrast too well with background
        dispatch({ type: "change-color", color: palette[4]?.toString() });
      } else if (state.activeRadio.id === 9) {
        //if radio is master sounds use second color in palette
        dispatch({ type: "change-color", color: "246, 114, 4" });
      } else {
        dispatch({ type: "change-color", color: palette[0]?.toString() });
      }
    }
  }, [palette, state.activeRadio.id]);

  if (!state.loadRadio) {
    return (
      <AppWrapper>
        <button onClick={() => dispatch({ type: "first-load" })}>
          firstload
        </button>
      </AppWrapper>
    );
  }

  return (
    <AppWrapper color={state.color}>
      <div className="now-playing">
        <i className="fas fa-chevron-left"></i>
        <p>Now playing</p>
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <Player
        style={{ display: "none" }}
        url={state.activeRadio.streamURL}
        ref={refPlayer}
        playing={state.playing}
        volume={state.volume}
        onDuration={(d) => {
          refPlayer.current.seekTo(state.percentagePlayed, "fraction");
        }}
        onReady={(p) => {
          dispatch({ type: "play" });
        }}
        onEnded={() => {
          dispatch({ type: "pause" });
          refPlayer.current.seekTo(0, "fraction");
          dispatch({ type: "play" });
        }}
        onProgress={({ played }) =>
          dispatch({ type: "change-percentage-played", percentage: played })
        }
      />
      <Slider radios={radios} dispatch={dispatch} />
      <div className="radio-info">
        <p>{state.activeRadio.name}</p>
        <p>{state.activeRadio.host}</p>
      </div>
      <div className="icons">
        <i className="fas fa-share-alt"></i>
        <i className="fab fa-github"></i>
        <i className="far fa-heart"></i>
      </div>
      <div className="volume">
        <ReactSlider
          defaultValue={100}
          onChange={(value) => {
            dispatch({ type: "change-volume", volume: value / 100 });
          }}
        />
        <div className="volume-icons">
          <i className="fas fa-volume-down"></i>
          <i className="fas fa-volume-up"></i>
        </div>
      </div>
      <div className="control-icons">
        <i className="fas fa-step-backward"></i>
        <i
          className={`fas fa-${state.playing ? "pause" : "play"}`}
          onClick={() => dispatch({ type: state.playing ? "pause" : "play" })}
        ></i>
        <i className="fas fa-step-forward"></i>
      </div>
    </AppWrapper>
  );
}

export default App;
