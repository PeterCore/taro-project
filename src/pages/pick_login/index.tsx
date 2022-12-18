import { View, Text, Button, Image } from "@tarojs/components";
import {
  useEnv,
  useNavigationBar,
  useModal,
  useToast,
  useBackground,
} from "taro-hooks";
import logo from "@/assets/images/logo.png";
import "./index.scss";
import { toPage } from "@/utils/utils";
import Taro from "@tarojs/taro";

const Index = () => {
  const env = useEnv();
  const [_, {}] = useNavigationBar({ title: "学叶教育" });
  // const [show] = useModal({
  //   title: "Taro Hooks!",
  //   showCancel: false,
  //   confirmColor: "#8c2de9",
  //   confirmText: "支持一下",
  //   mask: true,
  // });
  // const [showToast] = useToast({ mask: true });
  // const handleModal = useCallback(() => {
  //   show({ content: "不如给一个star⭐️!" }).then(() => {
  //     showToast({ title: "点击了支持!" });
  //   });
  // }, [show, showToast]);

  const pushlogin = (type: number) => {
    toPage(`/pages/login/index?type=${type}`);
  };
  // const login = () => {
  //   Taro.getUserProfile({
  //     desc: '用于完善用户信息',
  //     success: res => {
  //       Taro.setStorage({ key: 'userInfo', data: res.userInfo })
  //       cloudFunction({ name: 'login', data: { userInfo: res.userInfo } }).then(() => {
  //         showToast({ title: "登录成功" });
  //       })
  //     }
  //   })
  // }

  return (
    <View className="wrapper">
      <Image className="logo" src={logo} />
      <Text className="title">学叶教育</Text>
      <Button className="button" onClick={() => pushlogin(1)}>
        老 师
      </Button>
      <Button className="button" onClick={() => pushlogin(0)}>
        家 长
      </Button>
    </View>
  );
};

export default Index;
