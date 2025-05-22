import { Propless } from "Types/React";
import { Scene } from "./Scene";
import "./styles.scss";

export default function Home(_: Propless) {
  return (
    <main className="home">
      <Scene />
    </main>
  );
}
