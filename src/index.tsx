import "globals";
import ReactDOM from "react-dom";
import "./index.css";
import { Ticker } from "./pages/Ticker.page";

const container = document.getElementById("root");

ReactDOM.render(
  <div
    className="relative overflo"
    style={{
      backgroundImage: 'url("/src/assets/vb.png")',
      backgroundSize: "cover",
      width: "1920px",
      height: "1080px",
    }}
  >
    <Ticker />
  </div>,
  container
);
