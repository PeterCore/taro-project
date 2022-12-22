import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, Image, ScrollView } from "@tarojs/components";
import arrowImg from "@/assets/images/user/arrow_right.png";

import "./index.scss";
import ICell, { Item } from "@/components/ICell";
import { cloudFunction } from "@/services/cloudFunction";
import { useDidShow } from "@tarojs/taro";
import { ChildCourseInfo, getStdCourses, modiferInfo } from "./childrenSlice";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toPage } from "@/utils/utils";
import { addselectCourses } from "../add_children/courseSlice";

const Index = () => {
  const scrollTop = 0;
  const dispath = useAppDispatch();
  const configs = useAppSelector((state) => state.ccs.configs);
  const children = useAppSelector((state) => state.ccs.courses);

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
          ? configs.map((item, i) => (
              <ICell
                items={item}
                index={i}
                onClick={(i) => {
                  const child = children[i];
                  dispath(modiferInfo(child));
                  dispath(addselectCourses(child.courses ?? []));
                  toPage("/pages/add_children/index?type=1"); //修改
                }}
              ></ICell>
            ))
          : null}
      </ScrollView>
      <View
        className="float-button"
        onClick={() => toPage("/pages/add_children/index?type=0")} //添加
      >
        <View className="float-icon"></View>
      </View>
    </View>
  );
};

export default Index;
