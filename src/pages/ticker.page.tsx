import anime from "animejs";
import "globals";
import { useCallback, useEffect, useRef, useState } from "react";
import ParseXmlString from "../functions/parseXmlString";
import TextItem from "../components/textItem.component";

export const Ticker = () => {
  const [text, setText] = useState(
    "OH Leuven - Charlerio eindigt zoals het begon, 0-0"
  );
  const [title, setTitle] = useState("JUPILER PRO LEAGUE");

  const bgRef = useRef<HTMLDivElement>(null);
  const text1Ref = useRef<HTMLDivElement>(null);

  const Update = useCallback((data: string) => {
    const json = JSON.parse(data);

    if (json.TickerTitle !== undefined) {
      setTitle(json.TickerTitle);
    } else {
      setTitle("TEST");
    }
    if (json.TickerText !== undefined) {
      setText(json.TickerText);
    } else {
      setText("TEST");
    }
  }, []);

  const Play = useCallback(() => {
    anime({
      targets: [bgRef.current],
      translateY: [-100],
      easing: "easeOutExpo",
      duration: 600,
      loop: false,
    });
  }, []);

  const Next = useCallback(() => {
    anime({
      targets: [bgRef.current],
      translateY: [0],
      easing: "easeOutExpo",
      duration: 600,
      loop: false,
    });
  }, []);

  useEffect(() => {
    window.update = (args: string) => {
      const result = ParseXmlString(args);
      Update(result.Data);
    };

    window.play = () => {
      Play();
    };

    window.next = () => {
      Next();
    };
  }, [Update, Next, Play]);

  return (
    <>
      <div
        ref={bgRef}
        style={{
          // bottom: "-100px",
          bottom: 100,
          width: "1920px",
          height: "91px",
        }}
        className="origin-bottom absolute overflow-hidden"
      >
        <div
          style={{
            width: "1920px",
            height: "91px",
            fontSize: "29px",
            letterSpacing: 0.5,
          }}
          className="bg-[#15191f] border-t-[6px] border-[#ffff00] bottom-0 "
        >
          <div
            ref={text1Ref}
            className="w-full h-full flex items-center justify-center text-white translate-x-7"
          >
            <TextItem title={title} text={text} icon={"B"}></TextItem>
          </div>
        </div>
      </div>
    </>
  );
};
