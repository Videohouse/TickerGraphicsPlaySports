import "globals";
import ReactDOM from "react-dom";
import "./index.css";
import { Ticker } from "./pages/ticker.page";

const container = document.getElementById("root");

ReactDOM.render(
  <div
    className="relative overflow-hidden"
    style={{
      backgroundImage: 'url("/src/assets/vb2.png")',
      backgroundSize: "cover",
      width: "1920px",
      height: "1080px",
    }}
  >
    <div
      style={{
        width: "1px",
        height: "1080px",
      }}
      className="bg-[#e92ed9]  absolute left-1/2 "
    ></div>
    <Ticker />
  </div>,
  container
);
