import { useState, useEffect } from "react";
import useColorThief from "use-color-thief";
import { Card } from "./RadioCard.styles";

type Props = {
  img: string;
};

const RadioCard = ({ img }: Props) => {
  const [borderColor, setBorderColor] = useState("");
  const { color } = useColorThief(img, { colorCount: 20 });

  useEffect(() => {
    setBorderColor(`${color?.toString()},0.3`);
  }, [color]);

  return (
    <Card style={{ background: `rgba(${borderColor})` }}>
      <img src={img} alt="radio logo" />
    </Card>
  );
};

export default RadioCard;
