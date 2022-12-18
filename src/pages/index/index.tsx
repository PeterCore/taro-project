import React, { useCallback, useEffect, useState } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import {
  useEnv,
  useNavigationBar,
  useModal,
  useToast,
  useBackground,
} from "taro-hooks";

import "./index.scss";
import ZCTabbar from "@/components/zctabbar";
import { useAppSelector } from "@/store/hook";
import Home from "../home";
import Mine from "../user";
const Index = () => {
  const currentSelected = useAppSelector((state) => state.tab.curOfselected);
  const [current, setCurrent] = useState(0);

  const [_, {}] = useNavigationBar(
    currentSelected === 0 ? { title: "首页" } : { title: "我的" }
  );

  // useEffect(() => {
  //   console.log(`${currentSelected}`);
  //   setCurrent(currentSelected);
  // }, [currentSelected]);

  return <View className="container"></View>;
};

export default Index;
