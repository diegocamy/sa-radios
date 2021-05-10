import { useContext } from "react";
import ReactSlider from "rc-slider";

import { StateContext } from "../Radio/Radio";

const VolumeButtons = () => {
  const { dispatch } = useContext(StateContext);
  return (
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
  );
};

export default VolumeButtons;
