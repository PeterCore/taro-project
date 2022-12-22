import { View, Image } from "@tarojs/components";
import { FC, memo, useState } from "react";
import arrowImg from "@/assets/images/user/arrow_right.png";
import "./index.scss";

export interface Item {
  title: string;
  content: string;
}

type Props = {
  index: number;
  items: Item[];
  onClick?: (index: number) => void;
};

const ICell: FC<Props> = ({ items, index, onClick }) => {
  return (
    <View
      className="cell"
      onClick={() => {
        if (onClick != null) {
          onClick(index);
        }
      }}
    >
      <View className="left">
        {items.length > 0
          ? items.map((item, _) => (
              <View className="row">
                <View className="title">{item.title}</View>
                <View className="content">{item.content}</View>
              </View>
            ))
          : null}
      </View>
      <View className="arrow-container">
        <Image className="arrow-right" src={arrowImg}></Image>
      </View>
    </View>
  );
};

const equals = (oldProps: Props, newProps: Props) =>
  oldProps.items.length === newProps.items.length &&
  oldProps.items.every((v, i) => {
    v.title === newProps.items[i].title &&
      v.content === newProps.items[i].content;
  });

export default memo(ICell, (oldProps, newProps) => {
  return equals(oldProps, newProps);
});
