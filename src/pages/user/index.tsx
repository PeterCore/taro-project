import { View, Image, Button } from "@tarojs/components";
import "./index.scss";
import avatarImg from "@/assets/images/user/avatar.png";
import arrowImg from "@/assets/images/user/arrow_right.png";

import { getAccountInfo, removeAccountInfo, toPage } from "@/utils/utils";
import { useEffect, useState } from "react";
import { useAppSelector } from "@/store/hook";
import { UserType } from "@/constants/constants";

enum CellType {
  setting,
  modifer,
}

interface CellItem {
  type: CellType;
  title: string;
}

const login = () => {
  toPage("/pages/pick_login/index");
};

const User = () => {
  const accountInfo = useAppSelector((state) => state.account.accountInfo);
  const [account, setAccount] = useState<{
    avatarUrl: string;
    name: string;
    openid?: string;
    userType?: UserType;
  }>({ avatarUrl: "", name: "" });
  // "设置", "修改学生/孩子信息"
  const [list, setList] = useState<CellItem[]>([
    { type: CellType.setting, title: "设置" },
  ]);

  useEffect(() => {
    if (accountInfo.userType == null) {
      setList([{ type: CellType.setting, title: "设置" }]);
    } else if (accountInfo.userType === UserType.student) {
      setList([
        { type: CellType.setting, title: "设置" },
        { type: CellType.modifer, title: "添加/修改孩子" },
      ]);
    } else if (accountInfo.userType === UserType.teacher) {
      setList([
        { type: CellType.setting, title: "设置" },
        { type: CellType.modifer, title: "修改学生" },
      ]);
    }

    setAccount(accountInfo);
  }, [accountInfo]);

  // useDidShow(() => {
  //   // removeAccountInfo();
  //   const userInfo = getAccountInfo();
  //   console.log(`--${userInfo.openid}---`);
  //   setAccount({
  //     avatarUrl: userInfo.avatarUrl,
  //     name: userInfo.name,
  //     openid: userInfo.openid,
  //     userType: userInfo.userType,
  //   });
  // });

  const pushUserInfo = () => {
    console.log("click");
    if (account.openid != null) {
      toPage("/pages/userinfo/index");
    } else {
      login();
    }
  };

  const selectedCell = (type: CellType) => {
    if (account.openid == null) {
      login();
      return;
    }
    switch (type) {
      case CellType.setting:
        break;
      case CellType.modifer:
        if (account.userType == UserType.student) {
          toPage("/pages/children/index");
        } else if (account.userType == UserType.teacher) {
        }

        break;
      default:
        break;
    }
  };

  return (
    <View className="user-page">
      <View className="not-login">
        <View className="to-login" onClick={() => pushUserInfo()}>
          <View className="left">
            <View className="avatar-container">
              <Image
                className="avatar"
                src={
                  account.avatarUrl.length > 0 ? account.avatarUrl : avatarImg
                }
              ></Image>
            </View>
            {account.openid == null ? (
              <Button className="login-button">注册/登录</Button>
            ) : (
              <View className="name">{account.name}</View>
            )}
          </View>
          <View className="arrow-container">
            <Image className="arrow-right" src={arrowImg}></Image>
          </View>
        </View>
        {list.map((item, _) => (
          <View className="cell" onClick={() => selectedCell(item.type)}>
            <View className="title">{item.title}</View>
            <View className="arrow-container">
              <Image className="arrow-right" src={arrowImg}></Image>
            </View>
          </View>
        ))}
      </View>
    </View>
  );
};

export default User;
