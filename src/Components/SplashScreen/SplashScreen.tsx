import { useContext } from "react";
import Particles from "../Particles/Particles";
import { SplashWrapper } from "./SplashScreen.styles";
import { StateContext } from "../Radio/Radio";

const SplashScreen = () => {
  const { dispatch } = useContext(StateContext);
  return (
    <SplashWrapper>
      <Particles className="canva" />
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
