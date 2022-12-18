import React, { useCallback } from "react";
import { View, Text, Button, Image } from "@tarojs/components";
import {
  useEnv,
  useNavigationBar,
  useModal,
  useToast,
  useBackground,
} from "taro-hooks";
import logo from "../../assets/images/logo.png";

import "./index.scss";

const Index = () => {
  const env = useEnv();
  const [_, { setTitle }] = useNavigationBar({ title: "学叶教育" });
  const [show] = useModal({
    title: "Taro Hooks!",
    showCancel: false,
    confirmColor: "#8c2de9",
    confirmText: "支持一下",
    mask: true,
  });
  const [showToast] = useToast({ mask: true });
  const handleModal = useCallback(() => {
    show({ content: "不如给一个star⭐️!" }).then(() => {
      showToast({ title: "点击了支持!" });
    });
  }, [show, showToast]);

  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">学叶教育</Text>
      <Button className="button" onClick={() => setTitle("Taro Hooks Nice!")}>
        老 师 登 录
      </Button>
      <Button className="button" onClick={handleModal}>
        学 生 登 录
      </Button>
    </View>
  );
};

export default Index;
