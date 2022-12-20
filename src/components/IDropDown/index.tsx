import { FC, memo, ReactNode, useEffect, useState } from "react";
import classnames from "classnames";
import { View, Image } from "@tarojs/components";
import "./index.scss";

type Props = {
  expand: boolean;
  label: string;
  onChange?: (expand: boolean) => void;
  renderOverlay?: ReactNode;
};

const IDropDown: FC<Props> = ({ expand, label, onChange, renderOverlay }) => {
  const [isExpand, setIsExpand] = useState(expand);

  const cls = classnames({
    drop__container: true,
    content__collapse: !isExpand,
    content__expand: isExpand,
  });

  useEffect(() => {
    setIsExpand(expand);
  }, [expand]);

  return (
    <View className="drop__container">
      <View
        className="dropdown__component"
        onClick={() => {
          if (onChange != null) {
            onChange(!isExpand);
          }
          setIsExpand(!isExpand);
        }}
      >
        <View className="title">{label}</View>
        <View
          className={classnames({
            arrow__direction: true,
            "arrow__direction--up": isExpand,
          })}
        ></View>
      </View>
      <View className={cls}>{renderOverlay}</View>
    </View>
  );
};

export default memo(IDropDown, (oldProps, newProps) => {
  return oldProps.expand == newProps.expand;
});
