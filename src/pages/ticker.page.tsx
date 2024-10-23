import anime from "animejs";
import "globals";
import { useCallback, useEffect, useRef, useState } from "react";
import ParseXmlString from "../functions/parseXmlString";
import TextItem from "../components/textItem.component";

export type TickerItem = {
  title: string;
  text: string;
  icon: string;
};
const dummy = [
  {
    title: "JUPILER PRO LEAGUE",
    text: "OH Leuven - Charlerio eindigt zoals het begon, 0-0",
    icon: "Soccer",
  },
  {
    title: "PREMIER LEAGUE",
    text: "West Ham verliest nu ook met 2-0 van Nottingham Forest",
    icon: "Soccer",
  },
  {
    title: "RONDE VAN ZWITSERLAND",
    text: "Nairo Quintana breekt middenhandsbeentje in 2de rit van Zwitserland",
    icon: "Cycling",
  },
];
export const Ticker = () => {
  const [content, setContent] = useState<TickerItem[]>(dummy);
  const bgRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const [totalSteps, setTotalSteps] = useState(0);
  const [currentStep, setCurrentStep] = useState(0);

  const Update = useCallback((data: string) => {
    const json = JSON.parse(data);
    setTotalSteps(json.TickerContent.length);
    if (json.TickerContent !== undefined) {
      setTotalSteps(json.TickerContent.length);
      setContent(json.TickerContent);
    } else {
      setTotalSteps(dummy.length);
      setContent(dummy);
    }
    setCurrentStep(0);
  }, []);

  const Play = useCallback(() => {
    setTotalSteps(content.length);
    setCurrentStep(0);
    anime({
      targets: [bgRef.current],
      translateY: [-100],
      easing: "easeOutExpo",
      duration: 600,
      loop: false,
    });
  }, []);

  const Next = useCallback(() => {
    setCurrentStep((prevStep) => {
      const nextStep = prevStep + 1;

      if (nextStep >= totalSteps) {
        anime({
          targets: [bgRef.current],
          translateY: [0],
          easing: "easeOutExpo",
          duration: 600,
          loop: false,
        });
        return 0;
      } else {
        anime({
          targets: [textRef.current],
          translateY: [-85 * nextStep],
          easing: "easeOutExpo",
          duration: 600,
          loop: false,
        });
        return nextStep;
      }
    });
  }, [totalSteps]);

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

  useEffect(() => {
    console.log("Current Step:", currentStep, "Total Steps:", totalSteps);
  }, [currentStep, totalSteps]);

  return (
    <>
      <div
        ref={bgRef}
        style={{
          bottom: "-100px",
          width: "1920px",
          height: "91px",
        }}
        className="origin-bottom absolute "
      >
        <div
          style={{
            width: "1920px",
            height: "6px",
          }}
          className="bg-[#ffff00]   "
        >
          {" "}
        </div>
        <div
          style={{
            width: "1920px",
            height: "85px",
            fontSize: "29px",
            letterSpacing: 0.5,
          }}
          className="bg-[#15191f] bottom-0 overflow-hidden"
        >
          <div ref={textRef}>
            {content.map((item, id) => {
              return (
                <div
                  key={id}
                  className="w-full h-full flex items-center justify-center text-white translate-x-[30px] -translate-y-3"
                >
                  {" "}
                  <div
                    style={{
                      width: "5px",
                      height: "100px",
                    }}
                    className="bg-[#ffff00]  absolute left-1/2 "
                  ></div>
                  <TextItem
                    title={item.title}
                    text={item.text}
                    icon={item.icon}
                  ></TextItem>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
};
