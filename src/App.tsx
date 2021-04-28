import { useReducer, useRef } from "react";
import Player from "react-player/soundcloud";
import ReactSlider from "rc-slider";

import Slider from "./Components/Slider/Slider";
import { AppWrapper } from "./App.styles";
import { AppState, RadioStation } from "./interfaces";
import radios from "./data/radios";

import "rc-slider/assets/index.css";

const initialState = {
  radios,
  activeRadio: radios[0],
  volume: 1,
  color: "",
  playing: false,
  percentagePlayed: Math.random(),
  loadRadio: false,
};

export type Action =
  | { type: "change-radio"; radio: RadioStation }
  | { type: "change-volume"; volume: number }
  | { type: "play" }
  | { type: "pause" }
  | { type: "first-load" }
  | { type: "change-color"; color: string }
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
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refPlayer = useRef<any>();

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
    <AppWrapper>
      <div className="now-playing">
        <i className="fas fa-chevron-left"></i>
        <p>Now playing</p>
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <Player
        url={state.activeRadio.url}
        ref={refPlayer}
        playing={state.playing}
        volume={state.volume}
        onReady={(p) => {
          p.seekTo(state.percentagePlayed, "fraction");
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
