import { Icon } from "./icon.component";

export interface TextItemProps {
  title?: string;
  text?: string;
  icon?: string;
}

export function TextItem(props: TextItemProps) {
  const { title, text, icon } = props;

  return (
    <>
      <div className="flex whitespace-nowrap  ">
        <Icon
          className="translate-y-1 mr-8"
          name={icon || "Cylcing"}
          color="text-green-500"
        />
        <span className="font-BarlowXtraBoldItalic mr-9 ">{title}</span>
      </div>
      {title && (
        <div className="h-[78px] w-[2px] bg-white mx-5 translate-y-2"></div>
      )}
      <div className="font-BarlowRegular whitespace-nowrap overflow-hidden text-ellipsis ml-8">
        {text}
      </div>
    </>
  );
}
export default TextItem;
