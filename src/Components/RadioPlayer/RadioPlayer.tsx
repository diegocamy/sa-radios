import { useContext, useRef } from "react";
import Player from "react-player/file";
import { StateContext } from "../Radio/Radio";

interface Props {
  radioNoise: HTMLAudioElement;
}

const RadioPlayer = ({ radioNoise }: Props) => {
  const { state, dispatch } = useContext(StateContext);
  const refPlayer = useRef<any>();
  return (
    <Player
      style={{ display: "none" }}
      url={state.activeRadio.streamURL}
      ref={refPlayer}
      playing={state.playing}
      volume={state.volume}
      onError={(e) => {
        dispatch({
          type: "error",
          error: "Oops! Something went wrong with the radio station",
        });
      }}
      onBuffer={() => {
        radioNoise.pause();
        dispatch({ type: "loading", loading: false });
      }}
      onDuration={() => {
        refPlayer.current.seekTo(state.percentagePlayed, "fraction");
      }}
      onReady={() => {
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
  );
};

export default RadioPlayer;
