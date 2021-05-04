import axios from "axios";
import React from "react";
import Action from "../Components/Radio/Radio.action";

const fetchStreamUrl = async (
  radioURL: string,
  dispatch: React.Dispatch<Action>,
  radioNoise: HTMLAudioElement
) => {
  try {
    const { data: streamURL } = await axios.post(
      "http://localhost:3000/soundcloud",
      {
        radioURL: radioURL,
      }
    );
    return streamURL;
  } catch (error) {
    radioNoise.pause();
    dispatch({ type: "loading", loading: false });
    dispatch({ type: "pause" });
    dispatch({
      type: "error",
      error: "Oops! Something went wrong with the radio station",
    });
  }
};

export default fetchStreamUrl;
