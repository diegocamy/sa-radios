import Particles from "react-particles-js";
import { SplashWrapper } from "./SplashScreen.styles";

import { Action } from "../../App";

import playback from "../../assets/logos/playback.png";
import krose from "../../assets/logos/krose.png";
import kdst from "../../assets/logos/kdst.png";
import bounce from "../../assets/logos/bounce.png";
import sfur from "../../assets/logos/sfur.png";
import radiols from "../../assets/logos/radiols.png";
import radiox from "../../assets/logos/radiox.png";
import csr from "../../assets/logos/csr.png";
import kjah from "../../assets/logos/kjah.png";
import master from "../../assets/logos/master.png";
import wctr from "../../assets/logos/wctr.png";

interface Props {
  dispatch: React.Dispatch<Action>;
}

const SplashScreen = ({ dispatch }: Props) => {
  return (
    <SplashWrapper>
      <Particles
        className="canva"
        params={{
          particles: {
            number: { value: 50 },
            move: {
              speed: { max: 1, min: 0.5 },
              outMode: "out",
              collisions: false,
            },
            shape: {
              type: ["images"],
              image: [
                {
                  src: kdst,
                  height: 50,
                  width: 50,
                  fill: true,
                },
                { src: playback, height: 50, width: 50, fill: true },
                { src: krose, height: 50, width: 50, fill: true },
                { src: bounce, height: 50, width: 50, fill: true },
                { src: radiols, height: 50, width: 50, fill: true },
                { src: radiox, height: 50, width: 50, fill: true },
                { src: csr, height: 50, width: 50, fill: true },
                { src: kjah, height: 50, width: 50, fill: true },
                { src: master, height: 50, width: 50, fill: true },
                { src: wctr, height: 50, width: 50, fill: true },
                { src: sfur, height: 50, width: 50, fill: true },
              ],
            },
            line_linked: { enable: false },
            opacity: { value: 500, random: false },
            size: { value: 15 },
          },
        }}
      />
      <div className="text">
        <h1>SA-Radios</h1>
        <h3>Listen to SA radio stations everywhere</h3>
        <button onClick={() => dispatch({ type: "first-load" })}>
          Ah shit, here we go again
        </button>
      </div>
    </SplashWrapper>
  );
};

export default SplashScreen;
