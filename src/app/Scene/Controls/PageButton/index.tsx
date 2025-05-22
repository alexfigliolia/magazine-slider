import { use, useCallback } from "react";
import { MagazineContext } from "Components/MagazineSlider";
import "./styles.scss";

export const PageButton = ({ index }: Props) => {
  const { setCurrent } = use(MagazineContext);

  const turnPage = useCallback(() => {
    setCurrent(index);
  }, [setCurrent, index]);

  return (
    <button className="page-button" onClick={turnPage}>
      Page {index + 1}
    </button>
  );
};

interface Props {
  index: number;
}
