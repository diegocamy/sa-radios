import { useState, useEffect } from "react";
import useColorThief from "use-color-thief";
import { Card } from "./RadioCard.styles";

interface Props {
  img: string;
}

const RadioCard = ({ img }: Props) => {
  const [borderColor, setBorderColor] = useState("");
  const { color } = useColorThief(img, { colorCount: 20 });

  useEffect(() => {
    setBorderColor(`${color?.toString()},0.3`);
  }, [color]);

  return (
    <Card
      style={{
        background: `${
          img.includes("master")
            ? "rgba(246, 114, 4, 0.3)" //workaround for mastersound border color
            : img.includes("wctr")
            ? "rgba(156, 12, 188, 0.3)"
            : img.includes("kjah")
            ? "rgba(4, 132, 4, 0.3)" //workaround for wctr border color
            : `rgba(${borderColor})`
        }`,
      }}
    >
      <img src={img} alt="radio logo" />
    </Card>
  );
};

export default RadioCard;
