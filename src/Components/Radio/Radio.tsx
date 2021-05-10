import { useEffect, useReducer, useRef } from "react";
//COMPONENTS
import Player from "react-player";
import ReactSlider from "rc-slider";
import useColorThief from "use-color-thief";
import Slider from "../Slider/Slider";
import SplashScreen from "../SplashScreen/SplashScreen";
import { ToastContainer, toast } from "react-toastify";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";

//STYLES
import { AppWrapper, ToastifyTrack } from "./Radio.styles";
import "rc-slider/assets/index.css";
import "react-toastify/dist/ReactToastify.css";

//HELPER FUNCTIONS AND DATA
import reducer from "./Radio.reducer";
import fetchStreamURL from "../../utils/fetchStreamURL";
import identifyTrack from "../../utils/identifyTrack";
import radios from "../../data/radios";
import { AppState } from "../../interfaces";

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

const radioNoise = new Audio(audio);

const Radio = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { palette } = useColorThief(state.activeRadio.logo, {
    colorCount: 5,
    quality: 10,
  });
  const refPlayer = useRef<any>();
  const shareRef = useRef<any>();

  //USE EFFECT TO SHOW OR HIDE SHARE MENU
  useEffect(() => {
    const handleClickOutside = (e: Event) => {
      if (shareRef.current && !shareRef.current.contains(e.target)) {
        if (state.showShareButtons) {
          dispatch({ type: "show-share", show: false });
        }
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, [shareRef, state.showShareButtons]);

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
    return <SplashScreen dispatch={dispatch} />;
  }

  return (
    <AppWrapper color={state.color}>
      <ToastContainer />
      <div className="now-playing">
        <i
          className="fas fa-chevron-left"
          onClick={() => dispatch({ type: "first-load" })}
        ></i>
        <p>Now playing</p>
        <i className="fas fa-ellipsis-v"></i>
      </div>
      {/* REACT PLAYER HIDDEN WITH CSS */}
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
      {/* RADIO LOGO SLIDER */}
      <Slider radios={radios} dispatch={dispatch} />
      {/* RADIO NAME AND HOST */}
      <div className="radio-info">
        <p>{state.activeRadio.name}</p>
        <p>{state.activeRadio.host}</p>
      </div>
      {/* BUTTONS
      SHARE - GITHUB - LIKE */}
      <div className="icons">
        {state.showShareButtons && (
          <div className="share" ref={shareRef}>
            <p>Share SA-Radios</p>
            <EmailShareButton
              url={window.location.href}
              subject="SA-Radios"
              body="Listen to the SA Radios everywhere"
            >
              <i className="far fa-envelope"></i>
            </EmailShareButton>
            <FacebookShareButton
              url={window.location.href}
              quote="Listen to the SA radio stations everywhere"
            >
              <i className="fab fa-facebook-square"></i>
            </FacebookShareButton>
            <TwitterShareButton
              url={window.location.href}
              title="Listen to the SA radio stations everywhere"
            >
              <i className="fab fa-twitter-square"></i>
            </TwitterShareButton>
            <WhatsappShareButton
              url={window.location.href}
              title="Listen to the SA radio stations everywhere"
            >
              <i className="fab fa-whatsapp-square"></i>
            </WhatsappShareButton>
            <TelegramShareButton
              url={window.location.href}
              title="Listen to the SA radio stations everywhere"
            >
              <i className="fab fa-telegram"></i>
            </TelegramShareButton>
          </div>
        )}
        <i
          className="fas fa-share-alt"
          onClick={() => dispatch({ type: "show-share", show: true })}
        ></i>

        <a href="https://github.com/diegocamy/sa-radios">
          <i className="fab fa-github"></i>
        </a>
        <i
          className={`fa fa-music ${state.identifying && "identifying"}`}
          onClick={() => {
            if (state.playing && !state.identifying) {
              const notify = () =>
                toast.info("Identifying music... please wait", {
                  position: "top-center",
                  closeButton: true,
                  autoClose: 8000,
                });
              notify();
              identifyTrack(dispatch);
            }
          }}
        ></i>
      </div>
      {/* {VOLUME BAR AND ICONS} */}
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
      {/* BUTTONS
      PREV - PLAY - NEXT  */}
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
    </AppWrapper>
  );
};

export default Radio;
