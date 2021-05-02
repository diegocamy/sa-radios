import { useEffect, useReducer, useRef } from "react";
//COMPONENTS
import Player from "react-player";
import ReactSlider from "rc-slider";
import useColorThief from "use-color-thief";
import Slider from "../Slider/Slider";
import SplashScreen from "../SplashScreen/SplashScreen";

//STYLES
import { AppWrapper } from "./Radio.styles";
import "rc-slider/assets/index.css";

//HELPER FUNCTIONS AND DATA
import reducer from "./Radio.reducer";
import fetchStreamURL from "../../utils/fetchStreamURL";
import radios from "../../data/radios";
import audio from "../../sounds/tune1.wav";

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

const radioNoise = new Audio(audio);

const Radio = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { palette } = useColorThief(state.activeRadio.logo, {
    colorCount: 5,
    quality: 10,
  });
  const refPlayer = useRef<any>();

  //fetch the streamURL everytime the activeRadio changes
  useEffect(() => {
    if (state.loadRadio) {
      (async () => {
        radioNoise.loop = true;
        radioNoise.play();

        dispatch({ type: "loading", loading: true });
        const url = await fetchStreamURL(state.activeRadio.url);
        dispatch({ type: "set-stream-url", url });
      })();
    }
  }, [state.activeRadio.url, state.loadRadio]);

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
    return <SplashScreen dispatch={dispatch} />;
  }

  return (
    <AppWrapper color={state.color}>
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
        onError={(e) => console.log(e)}
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
        <i className="fas fa-share-alt"></i>
        <a href="https://github.com/diegocamy/sa-radios">
          <i className="fab fa-github"></i>
        </a>
        <i
          className="far fa-heart"
          onClick={() => {
            navigator.mediaDevices
              .getUserMedia({ audio: true })
              .then((stream) => {
                const mr = new MediaRecorder(stream);

                let chunks: any[] = [];
                mr.start();
                console.log("Started recording whatever");

                mr.ondataavailable = (e) => {
                  chunks.push(e.data);
                };

                mr.onstop = (e) => {
                  const audioBlob = new Blob(chunks, { type: "audio/wav" });

                  // //file to arraybuffer
                  // const toBuffer = async (blob: Blob) => {
                  //   const buffer = await blob.arrayBuffer();
                  //   console.log(buffer);
                  // };

                  // toBuffer(audioBlob);

                  fetch("http://localhost:3000/soundcloud", {
                    method: "POST",
                    mode: "cors",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ radioURL: state.activeRadio.url }),
                  })
                    .then((res) => res.json())
                    .then((data) => console.log(data));

                  const reader = new FileReader();
                  reader.readAsDataURL(audioBlob);
                  reader.onloadend = () => {
                    const base64data = reader.result;
                    console.log(base64data);
                  };
                };

                setTimeout(() => {
                  mr.stop();
                }, 5000);
              })
              .catch((e) => console.log(e));
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
            onClick={() => dispatch({ type: state.playing ? "pause" : "play" })}
          ></i>
        )}

        <i className="fas fa-step-forward next-radio"></i>
      </div>
    </AppWrapper>
  );
};

export default Radio;
