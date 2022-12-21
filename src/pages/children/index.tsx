import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, Image, ScrollView } from "@tarojs/components";
import arrowImg from "@/assets/images/user/arrow_right.png";

import "./index.scss";
import ICell, { Item } from "@/components/ICell";
import { cloudFunction } from "@/services/cloudFunction";
import { useDidShow } from "@tarojs/taro";
import { ChildCourseInfo, getStdCourses } from "./childrenSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";

const Index = () => {
  const scrollTop = 0;
  const [cellItems, setCellItems] = useState<Item[]>([]);
  const dispath = useAppDispatch();
  const configs = useAppSelector((state) => state.ccs.configs);
  useDidShow(() => {});

  useEffect(() => {
    dispath(getStdCourses());
  }, []);

  // const configItems = (opt: ChildCourseInfo) => {
  //   let key: keyof ChildCourseInfo;
  //   for (key in opt) {
  //     console.log(key as string); // 报错消失
  //     console.log(opt[key]); // 报错消失
  //     // do something
  //   }
  // };

  // const getChildCourseInfo = () => {
  //   cloudFunction
  // };

  return (
    <View className="wrapper">
      <ScrollView
        className="scroll"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
      >
        {configs.length > 0
          ? configs.map((item, index) => <ICell items={item}></ICell>)
          : null}
      </ScrollView>
    </View>
  );
};

export default Index;
