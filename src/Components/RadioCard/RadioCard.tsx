import { useState, useEffect } from "react";
import useColorThief from "use-color-thief";
import { RadioCardProps } from "../../interfaces";
import { Card } from "./RadioCard.styles";

const RadioCard: React.FC<RadioCardProps> = ({ img }) => {
  const [borderColor, setBorderColor] = useState("");
  const { color } = useColorThief(img, { colorCount: 20 });

  useEffect(() => {
    setBorderColor(`${color?.toString()},0.5`);
  }, [color]);

  return (
    <Card style={{ background: `rgba(${borderColor})` }}>
      <img src={img} alt="radio logo" />
    </Card>
  );
};

export default RadioCard;
