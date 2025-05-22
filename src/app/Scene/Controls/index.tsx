import { Photos } from "Tools/Photos";
import { Propless } from "Types/React";
import { PageButton } from "./PageButton";
import "./styles.scss";

export const Controls = (_: Propless) => {
  return (
    <div className="controls">
      {Photos.map((_, i) => (
        <PageButton key={i} index={i} />
      ))}
      <PageButton index={Photos.length} />
    </div>
  );
};
