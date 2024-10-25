import "globals";
import ReactDOM from "react-dom";
import "./index.css";
import { Ticker } from "./pages/ticker.page";

const container = document.getElementById("root");

ReactDOM.render(
  <div
    className="relative overflow-hidden bg-slate-200"
    style={{
      //backgroundImage: 'url("/src/assets/vb2.png")',
      backgroundSize: "cover",
      width: "1920px",
      height: "1080px",
    }}
  >
    <Ticker />
  </div>,
  container
);
