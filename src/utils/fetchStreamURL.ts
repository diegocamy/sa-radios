import axios from "axios";

const fetchStreamUrl = async (radioURL: string) => {
  try {
    const { data: streamURL } = await axios.post(
      "http://localhost:3000/soundcloud",
      {
        radioURL: radioURL,
      }
    );
    return streamURL;
  } catch (error) {
    console.log(error);
  }
};

export default fetchStreamUrl;
