import { useContext } from "react";

import { StateContext } from "../Radio/Radio";

const TopSection = () => {
  const { dispatch } = useContext(StateContext);
  return (
    <div className="now-playing">
      <i
        className="fas fa-chevron-left"
        onClick={() => dispatch({ type: "first-load" })}
      ></i>
      <p>Now playing</p>
      <i className="fas fa-ellipsis-v white"></i>
    </div>
  );
};

export default TopSection;
