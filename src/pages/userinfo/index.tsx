import { getAccountInfo, removeAccountInfo } from "@/utils/utils";
import { View } from "@tarojs/components";
import { useEffect, useState } from "react";
import { useAppDispatch } from "@/store/hook";
import { setAccountInfo } from "../user/userInfoSlice";
import "./index.scss";
import Taro from "@tarojs/taro";
import { endLoading, startLoading } from "@/utils/loading-util";

interface Info {
  subTitle: string;
  content: string;
}

const UserInfo = () => {
  const [infos, setInfos] = useState<Info[]>([]);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const userInfo = getAccountInfo();
    let res: Info[] = [];
    res.push({ subTitle: "昵称", content: userInfo.name });
    res.push({ subTitle: "手机号", content: userInfo.phone });
    setInfos(res);
  }, []);

  const logout = () => {
    startLoading();
    removeAccountInfo().then(() => {
      endLoading();
      dispatch(
        setAccountInfo({
          avatarUrl: "",
          name: "",
        })
      );
      Taro.navigateBack({ delta: 1 });
    });
  };

  return (
    <View className="user-page">
      {infos.map((item, _) => (
        <View className="info">
          <View className="subtitle">{item.subTitle}</View>
          <View className="content">{item.content}</View>
        </View>
      ))}
      <View className="logout" onClick={() => logout()}>
        退出登录
      </View>
    </View>
  );
};

export default UserInfo;
