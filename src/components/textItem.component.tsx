export interface TextItemProps {
  title: string;
  text: string;
  icon: string;
}

export function TextItem(props: TextItemProps) {
  const { title, text, icon } = props;

  return (
    <>
      <div className="flex  whitespace-nowrap -translate-y-3 ">
        <div className="w-10 h-10 bg-green-500 rounded-full mr-10">{icon}</div>
        <span className="font-BarlowXtraBoldItalic mr-8 ">{title}</span>
      </div>
      <div className="h-full w-[2px] bg-white mx-5"></div>
      <div className="font-BarlowRegular whitespace-nowrap overflow-hidden text-ellipsis -translate-y-3 ml-8">
        {text}
      </div>
    </>
  );
}
export default TextItem;
