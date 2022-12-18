import { ScrollView, View } from "@tarojs/components";
import "./index.scss";
import { getAccountInfo, removeAccountInfo, toPage } from "@/utils/utils";
import { useEffect, useState } from "react";
import { AccountInfo, UserType } from "@/constants/constants";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { setAccountInfo } from "../user/userInfoSlice";

const Home = () => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userinfo = getAccountInfo();
    if (userinfo.openid != null) {
      console.log(`--${userinfo.userType}--`);
      dispatch(
        setAccountInfo({
          avatarUrl: userinfo.avatarUrl ?? "",
          name: userinfo.name ?? "",
          openid: userinfo.openid,
          userType: userinfo.userType,
        })
      );
    }
  }, []);

  const scrollStyle = {
    height: "150px",
  };
  const scrollTop = 0;
  const Threshold = 20;
  const vStyleA = {
    height: "150px",
    backgroundColor: "rgb(26, 173, 25)",
  };
  const vStyleB = {
    height: "150px",
    backgroundColor: "rgb(39,130,215)",
  };
  const vStyleC = {
    height: "150px",
    backgroundColor: "rgb(241,241,241)",
    color: "#333",
  };
  return (
    <View className="wrapper">
      <ScrollView
        className="scrollview"
        scrollY
        scrollWithAnimation
        scrollTop={scrollTop}
        style={scrollStyle}
      >
        <View style={vStyleA}>A</View>
        <View style={vStyleB}>B</View>
        <View style={vStyleC}>C</View>
      </ScrollView>
    </View>
  );
};

export default Home;
function dispatch(arg0: {
  payload: {
    avatarUrl: string;
    name: string;
    openid?: string | undefined;
    userType?: UserType | undefined;
  };
  type: "account/setAccountInfo";
}) {
  throw new Error("Function not implemented.");
}
