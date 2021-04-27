import Slider from "./Components/Slider/Slider";
import { AppWrapper } from "./App.styles";
import ReactSlider from "rc-slider";
import "rc-slider/assets/index.css";

function App() {
  return (
    <AppWrapper>
      <div className="now-playing">
        <i className="fas fa-chevron-left"></i>
        <p>Now playing</p>
        <i className="fas fa-ellipsis-v"></i>
      </div>
      <Slider />
      <div className="radio-info">
        <p>radioname</p>
        <p>host</p>
      </div>
      <div className="icons">
        <i className="fas fa-share-alt"></i>
        <i className="fab fa-github"></i>
        <i className="far fa-heart"></i>
      </div>
      <div className="volume">
        <ReactSlider
          defaultValue={100}
          onChange={(value) => console.log(value)}
        />
        <div className="volume-icons">
          <i className="fas fa-volume-down"></i>
          <i className="fas fa-volume-up"></i>
        </div>
      </div>
      <div className="control-icons">
        <i className="fas fa-step-backward"></i>
        <i className="fas fa-play"></i>
        <i className="fas fa-step-forward"></i>
      </div>
    </AppWrapper>
  );
}

export default App;
