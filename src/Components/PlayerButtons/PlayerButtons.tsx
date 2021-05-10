import { useContext } from "react";
import { StateContext } from "../Radio/Radio";
import fetchStreamURL from "../../utils/fetchStreamURL";

interface State {
  radioNoise: HTMLAudioElement;
}

const PlayerButtons = ({ radioNoise }: State) => {
  const { dispatch, state } = useContext(StateContext);
  return (
    <div className="control-icons">
      <i className="fas fa-step-backward prev-radio"></i>
      {state.loading ? (
        <i className="fas fa-circle-notch spin"></i>
      ) : (
        <i
          className={`fas fa-${state.playing ? "pause" : "play"}`}
          onClick={async () => {
            if (state.activeRadio.streamURL) {
              dispatch({ type: state.playing ? "pause" : "play" });
            } else {
              if (!state.playing) {
                radioNoise.loop = true;
                radioNoise.play();
                dispatch({ type: "error", error: "" });
                dispatch({ type: "loading", loading: true });
                const url = await fetchStreamURL(
                  state.activeRadio.url,
                  dispatch,
                  radioNoise
                );
                dispatch({ type: "set-stream-url", url });
              }
            }
          }}
        ></i>
      )}

      <i className="fas fa-step-forward next-radio"></i>
    </div>
  );
};

export default PlayerButtons;
