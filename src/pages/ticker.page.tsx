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
  {
    title: "TITEL4",
    text: "Text text texttexttexttexttexttext",
    icon: "Soccer",
  },
];
export const Ticker = () => {
  const [currentItem, setCurrentItem] = useState<TickerItem>(dummy[0]);
  const [newItem, setNewItem] = useState<TickerItem | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [updated, setUpdated] = useState(false);

  const textRef = useRef<HTMLDivElement>(null);
  const newTextRef = useRef<HTMLDivElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  const Update = useCallback(
    (data: string) => {
      console.log(updated);
      //TODO: add json data code here
      //TODO: remove dummy
      if (!updated) {
        setCurrentItem(dummy[0]);
        setUpdated(true);
      } else {
        const nextIndex = (currentIndex + 1) % dummy.length;
        setNewItem(dummy[nextIndex]);
        anime({
          targets: [textRef.current],
          translateY: [-100],
          easing: "easeOutExpo",
          duration: 600,
          complete: () => {
            setCurrentItem(dummy[nextIndex]);
            setCurrentIndex(nextIndex);
            setNewItem(null);

            if (textRef.current) {
              textRef.current.style.transform = "translateY(0)";
            }
          },
        });

        anime({
          targets: [newTextRef.current],
          translateY: [-85],
          easing: "easeOutExpo",
          duration: 600,
          complete: () => {
            if (newTextRef.current) {
              newTextRef.current.style.transform = "translateY(0)";
            }
          },
        });
      }
    },
    [currentIndex, updated]
  );

  const Play = useCallback(() => {
    anime({
      targets: [bgRef.current],
      translateY: [-90],
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
    setUpdated(false);
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
        ></div>
        <div
          style={{
            width: "1920px",
            height: "85px",
            fontSize: "29px",
            letterSpacing: 0.5,
          }}
          className="bg-[#15191f] bottom-0 overflow-hidden"
        >
          {/*CURRENT*/}
          <div ref={textRef}>
            <div
              key={0}
              className="w-full h-full flex items-center justify-center text-white -translate-y-3"
            >
              <TextItem
                title={currentItem.title}
                text={currentItem.text}
                icon={currentItem.icon}
              ></TextItem>
            </div>
          </div>

          {/*NEW*/}

          <div ref={newTextRef}>
            <div
              key={1}
              className="w-full h-full flex items-center justify-center text-white -translate-y-3"
            >
              <TextItem
                title={newItem?.title}
                text={newItem?.text}
                icon={newItem?.icon}
              ></TextItem>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
