import axios from "axios";
import React from "react";
import Action from "../Components/Radio/Radio.action";

const identifyTrack = (dispatch: React.Dispatch<Action>) => {
  navigator.mediaDevices
    .getUserMedia({ audio: true })
    .then((stream) => {
      const mr = new MediaRecorder(stream);

      let chunks: any[] = [];
      mr.start(); //start recording audio

      //dispatch identifying action
      dispatch({ type: "identifying", identifying: true });

      mr.ondataavailable = (e) => {
        chunks.push(e.data); //push data into chunks array
      };

      mr.onstop = async (e) => {
        //on stop create the audio blob
        const audioBlob = new Blob(chunks, { type: "audio/wav" });
        //create form data and append the blob
        const form = new FormData();
        form.append("file", audioBlob);

        //send recording to backend
        try {
          const { data } = await axios.post(
            "http://localhost:3000/shazam",
            form,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );

          dispatch({ type: "identified-track", track: data });
          dispatch({ type: "identifying", identifying: false });
        } catch (error) {
          dispatch({ type: "identifying", identifying: false });
          return dispatch({
            type: "error",
            error: "Oops! Something went wrong",
          });
        }
      };

      setTimeout(() => {
        mr.stop();
      }, 5000);
    })
    .catch((e) => {
      dispatch({ type: "identifying", identifying: false });
      if (e.message === "Permission denied") {
        return dispatch({
          type: "error",
          error: "SA-Radios has no permission to use the microphone",
        });
      }

      return dispatch({
        type: "error",
        error: "Oops! Something went wrong",
      });
    });
};

export default identifyTrack;
