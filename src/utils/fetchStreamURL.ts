import axios from "axios";
const client_id = "b59a98b55410a274c03d37a76b263c56";

const fetchStreamUrl = async (radioURL: string) => {
  try {
    const {
      data: { id },
    } = await axios.get(
      `https://api.soundcloud.com/resolve?url=${radioURL}&client_id=${client_id}`
    );

    //get track info
    const { data } = await axios.get(
      `/tracks/${id}?client_id=5MlCU9alf35yL0Ub7owwSlLVcGLgiFIB`
    );

    const transcodings = data.media.transcodings;

    //get stream url from transcodings array
    const streamUrl = transcodings.filter(
      (t: any) => t.format.protocol === "progressive"
    )[0].url as string;

    //get mp3 url
    const {
      data: { url },
    } = await axios.get(
      `${streamUrl.replace(
        //remove first part of the url to use the proxy
        "https://api-v2.soundcloud.com/",
        "/"
      )}?client_id=5MlCU9alf35yL0Ub7owwSlLVcGLgiFIB`
    );

    return url;
  } catch (error) {
    console.log(error);
  }
};

export default fetchStreamUrl;
