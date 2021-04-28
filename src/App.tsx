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
  volume: 0,
  playing: false,
  muted: false,
  percentagePlayed: Math.random(),
};

export type Action =
  | { type: "change_radio"; radio: RadioStation }
  | { type: "volume_up"; volume: number }
  | { type: "volume_down"; volume: number }
  | { type: "play" }
  | { type: "pause" }
  | { type: "mute"; mute: boolean }
  | { type: "percentage_played"; percentage: number };

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
    case "change_radio":
      return {
        ...state,
        activeRadio: action.radio,
      };
    case "percentage_played":
      return {
        ...state,
        percentagePlayed: action.percentage,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const refPlayer = useRef<any>();
  return (
    <AppWrapper>
      <button onClick={() => dispatch({ type: "play" })}>firstload</button>
      <div className="now-playing">
        <i className="fas fa-chevron-left"></i>
        <p>Now playing</p>
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <Player
        url={state.activeRadio.url}
        ref={refPlayer}
        playing={state.playing}
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
          dispatch({ type: "percentage_played", percentage: played })
        }
      />
      <Slider
        radios={radios}
        dispatch={dispatch}
        activeRadio={state.activeRadio}
      />
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
          onChange={(value) => console.log(value)}
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

        <i
          className="fas fa-play"
          onClick={() => dispatch({ type: "play" })}
        ></i>
        <i className="fas fa-step-forward"></i>
      </div>
    </AppWrapper>
  );
}

export default App;
