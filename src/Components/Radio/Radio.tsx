import { useEffect, useReducer, createContext } from "react";
//COMPONENTS
import useColorThief from "use-color-thief";
import Slider from "../Slider/Slider";
import SplashScreen from "../SplashScreen/SplashScreen";
import RadioPlayer from "../RadioPlayer/RadioPlayer";
import MiddleButtons from "../MiddleButtons/MiddleButtons";
import PlayerButtons from "../PlayerButtons/PlayerButtons";
import VolumeButtons from "../VolumeButtons/VolumeButtons";
import TopSection from "../TopSection/TopSection";
import { ToastContainer, toast } from "react-toastify";

//STYLES
import { AppWrapper, ToastifyTrack } from "./Radio.styles";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

//HELPER FUNCTIONS AND DATA
import reducer from "./Radio.reducer";
import fetchStreamURL from "../../utils/fetchStreamURL";
import radios from "../../data/radios";
import { AppState } from "../../interfaces";
import Action from "./Radio.action";

//ASSETS
import audio from "../../sounds/tune1.wav";

const initialState: AppState = {
  radios,
  activeRadio: radios[0],
  volume: 1,
  color: "",
  playing: false,
  loading: false,
  showShareButtons: false,
  percentagePlayed: Math.random(),
  loadRadio: false,
  identifying: false,
  track: null,
  error: null,
};

export const StateContext = createContext(
  {} as { state: AppState; dispatch: React.Dispatch<Action> }
);

const radioNoise = new Audio(audio);

const Radio = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { palette } = useColorThief(state.activeRadio.logo, {
    colorCount: 5,
    quality: 10,
  });

  //fetch the streamURL everytime the activeRadio changes
  useEffect(() => {
    let timeout: any;
    if (state.loadRadio) {
      (() => {
        radioNoise.loop = true;
        radioNoise.play();
        timeout = setTimeout(async () => {
          dispatch({ type: "error", error: "" });
          dispatch({ type: "loading", loading: true });
          const url = await fetchStreamURL(
            state.activeRadio.url,
            dispatch,
            radioNoise
          );
          dispatch({ type: "set-stream-url", url });
        }, 500);
      })();
    }
    return () => {
      clearTimeout(timeout);
    };
  }, [state.activeRadio.url, state.loadRadio]);

  //USEFFECT FOR CHANGING COLORS TO MATCH RADIO LOGO COLORS
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

  //USEFFECT FOR ERRORS
  useEffect(() => {
    const notify = () =>
      toast.error(state.error, {
        position: "top-center",
        closeButton: true,
      });

    if (state.error) {
      notify();
    }
  }, [state.error]);

  //USEFFECT FOR SHAZAM
  useEffect(() => {
    let notify: () => void;
    if (state.track) {
      if (state.track.identified) {
        notify = () =>
          toast.info(
            <ToastifyTrack>
              <img src={state.track?.coverart} alt="album-coverart" />
              <div className="toastify--track">
                <h4>{state.track?.artist}</h4>
                <p>{state.track?.title}</p>
              </div>
            </ToastifyTrack>,
            {
              closeButton: true,
              position: "top-center",
              autoClose: 15000,
            }
          );
      } else {
        notify = () =>
          toast.info("Sorry, we couldn't identify this track", {
            position: "top-center",
            closeButton: true,
          });
      }
      notify();
    }
  }, [state.track]);

  if (!state.loadRadio) {
    return <SplashScreen />;
  }

  return (
    <AppWrapper color={state.color}>
      <ToastContainer />
      <StateContext.Provider value={{ state, dispatch }}>
        <TopSection />
        <RadioPlayer radioNoise={radioNoise} />
        <Slider />
        <div className="radio-info">
          <p>{state.activeRadio.name}</p>
          <p>{state.activeRadio.host}</p>
        </div>
        <MiddleButtons />
        <VolumeButtons />
        <PlayerButtons radioNoise={radioNoise} />
      </StateContext.Provider>
    </AppWrapper>
  );
};

export default Radio;
