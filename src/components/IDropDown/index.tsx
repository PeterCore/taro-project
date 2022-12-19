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
  // const cls = classnames({
  //   dropdown_component: true,
  //   arrow_up: true,
  //   arrow_down: false,
  // });

  useEffect(() => {
    // setIsExpand(expand);
  }, []);

  return (
    <View className="drop_container">
      <View
        className="dropdown_component"
        onClick={() => {
          if (onChange != null) {
            onChange(!expand);
          }
          setIsExpand(!expand);
        }}
      >
        <View className="title">{label}</View>
        <View className={expand == true ? "arrow_up" : "arrow_down"}></View>
      </View>
      <View className={expand == false ? "collapse" : "expand"}>
        {renderOverlay}
      </View>
    </View>
  );
};

export default memo(IDropDown, (oldProps, newProps) => {
  return oldProps.expand === newProps.expand;
});
