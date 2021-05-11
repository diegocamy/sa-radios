import Particlesjs from "react-particles-js";

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

const defaultImages = [
  { src: kdst, height: 1, width: 1 },
  { src: playback, height: 1, width: 1 },
  { src: krose, height: 1, width: 1 },
  { src: bounce, height: 1, width: 1 },
  { src: radiols, height: 1, width: 1 },
  { src: radiox, height: 1, width: 1 },
  { src: csr, height: 1, width: 1 },
  { src: kjah, height: 1, width: 1 },
  { src: master, height: 1, width: 1 },
  { src: wctr, height: 1, width: 1 },
  { src: sfur, height: 1, width: 1 },
];

interface Props {
  className: string;
  numOfParticles?: number;
  image?: string;
}

const Particles = ({ className, image, numOfParticles }: Props) => {
  return (
    <Particlesjs
      className={className}
      params={{
        particles: {
          number: { value: numOfParticles ? numOfParticles : 50 },
          move: {
            speed: { max: 1, min: 0.5 },
            outMode: "out",
            collisions: true,
          },
          shape: {
            type: ["images"],
            image: image
              ? [{ src: image, height: 100, width: 100 }]
              : defaultImages,
          },
          line_linked: { enable: false },
          opacity: { value: 500, random: false },
          size: { value: image ? 75 : 15 },
        },
      }}
    />
  );
};

export default Particles;
