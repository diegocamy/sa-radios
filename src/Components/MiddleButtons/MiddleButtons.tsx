import { useEffect, useRef, useContext } from "react";
import { toast } from "react-toastify";
import {
  EmailShareButton,
  FacebookShareButton,
  WhatsappShareButton,
  TwitterShareButton,
  TelegramShareButton,
} from "react-share";
import identifyTrack from "../../utils/identifyTrack";

import { StateContext } from "../Radio/Radio";

const MiddleButtons = () => {
  const { dispatch, state } = useContext(StateContext);
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
  }, [shareRef, state.showShareButtons, dispatch]);
  return (
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
  );
};
export default MiddleButtons;
