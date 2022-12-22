import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, Image, ScrollView } from "@tarojs/components";
import arrowImg from "@/assets/images/user/arrow_right.png";

import "./index.scss";
import ICell, { Item } from "@/components/ICell";
import { cloudFunction } from "@/services/cloudFunction";
import { useDidShow } from "@tarojs/taro";
import { ChildCourseInfo, getStdCourses } from "./childrenSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toPage } from "@/utils/utils";

const Index = () => {
  const scrollTop = 0;
  const dispath = useAppDispatch();
  const configs = useAppSelector((state) => state.ccs.configs);
  useDidShow(() => {
    dispath(getStdCourses());
  });

  // useEffect(() => {
  //   dispath(getStdCourses());
  // }, []);

  return (
    <View className="wrapper">
      <ScrollView
        className="scroll"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
      >
        {configs.length > 0
          ? configs.map((item, _) => <ICell items={item}></ICell>)
          : null}
      </ScrollView>
      <View
        className="float-button"
        onClick={() => toPage("/pages/add_children/index")}
      >
        <View className="float-icon"></View>
      </View>
    </View>
  );
};

export default Index;
