import { useAppSelector, useAppDispatch } from "@/store/hook";
import { Tabbar } from "@taroify/core";
import { View } from "@tarojs/components";
import { selectTabbar } from "./tabbarSlice";
import { UserOutlined, HomeOutlined } from "@taroify/icons";
import { tabbarUrlList } from "@/constants/constants";
import Taro from "@tarojs/taro";

const ZCTabBar = () => {
  const currentSelected = useAppSelector((state) => state.tab.curOfselected);
  const dispatch = useAppDispatch();
  const handleClick = (value) => {
    console.log(`--${value}----`);
    dispatch(selectTabbar(value));
    // const url = tabbarUrlList[value];
    // Taro.reLaunch({ url });
    // Taro.hideHomeButton();
  };

  return (
    <Tabbar value={currentSelected} onChange={handleClick.bind(this)}>
      <Tabbar.TabItem icon={<HomeOutlined />}>首页</Tabbar.TabItem>
      <Tabbar.TabItem icon={<UserOutlined />}>我的</Tabbar.TabItem>
    </Tabbar>
  );
};
export default ZCTabBar;
