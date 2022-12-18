import { cloudFunction } from "@/services/cloudFunction";
import React, { useState, useEffect, useRef, useMemo } from "react";
import { View, Button, Input } from "@tarojs/components";
import "./index.scss";
import { useModal, useNavigationBar, useRouter, useToast } from "taro-hooks";
import Taro, { getCurrentInstance, useDidShow, UserInfo } from "@tarojs/taro";
import { LoginType, UserType } from "@/constants/constants";
import { Md5 } from "ts-md5";
import { setAccountInfo } from "../user/userInfoSlice";
import { useAppDispatch } from "@/store/hook";

const Index = () => {
  // const [courses, setCourses] = useState<course[]>([]);
  // const [grades, setGrades] = useState<grade[]>([]);
  const [number, setNumber] = useState("");
  const [_, { setTitle }] = useNavigationBar({ title: "" });
  const router = useRouter();
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [showToast] = useToast({ mask: true, icon: "error" });
  const [type, setType] = useState(LoginType.login);
  const [userType, setUserType] = useState("0");
  const dispatch = useAppDispatch();

  useEffect(() => {
    const params = router[0].params;
    const identity = `${params.type}`;
    setUserType(identity);
    setTitle(identity === "0" ? "学生家长" : "老师");

    // cloudFunction({ name: "getCourses" }).then((res) => {
    //   let t_courses: course[] = res as course[];
    //   setCourses(t_courses || []);
    // });
    //   cloudFunction({ name: "getGrades" }).then((res) => {
    //     let t_grades: grade[] = res as grade[];
    //     setGrades(t_grades || []);
    //   });
  }, []);

  const loginRegister = () => {
    if (type === LoginType.register) {
      if (name.trim().length == 0) {
        showToast({
          title: "请输入姓名",
          icon: "error",
        });
        return;
      }
    }
    if (number.trim().length == 0) {
      showToast({
        title: "请输入手机号码",
        icon: "error",
      });
      return;
    }
    if (password.trim().length == 0) {
      showToast({
        title: "请输入密码",
        icon: "error",
      });
      return;
    }
    if (type === LoginType.register) {
      if (userType === "0") {
        //学生家长
        registerUser();
      } else if (userType === "1") {
        registerTeacher();
      }
    } else if (type === LoginType.login) {
      if (userType === "0") {
        //学生家长
        slogin();
      } else if (userType === "1") {
        tlogin();
      }
    }
  };

  //学生登录登录
  const slogin = () => {
    cloudFunction({
      name: "s_login",
      data: { phone: number, password: Md5.hashStr(password) },
    })
      .then((res) => {
        if (res.code == 0) {
          const userinfo = res.result;
          Taro.setStorage({
            key: "userInfo",
            data: {
              ...userinfo,
              userType: UserType.student,
            },
          });
          showToast({ title: res.msg });
          console.log(`openid is ---${userinfo.openid}---`);
          dispatch(
            setAccountInfo({
              avatarUrl: userinfo.avatarUrl,
              name: userinfo.name,
              openid: userinfo.openid,
              userType: UserType.student,
            })
          );
          Taro.navigateBack({
            delta: 2,
          });
        } else {
          showToast({
            title: res.msg,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(`---${err.errMsg}---`);
      });
  };

  //添加新的家长/学生
  const registerUser = () => {
    Taro.getUserProfile({
      desc: "获取用户基本信息",
      success: (res) => {
        let userinfo = {
          ...res.userInfo,
          name: name,
          phone: number,
        };
        let authinfo = {
          name: name,
          phone: number,
          password: Md5.hashStr(password),
        };
        cloudFunction({
          name: "s_register",
          data: { userInfo: userinfo, authInfo: authinfo },
        })
          .then((res) => {
            if (res.code == 0) {
              const openid = res.result as string;
              Taro.setStorage({
                key: "userInfo",
                data: {
                  ...userinfo,
                  userType: UserType.student,
                  openid: openid,
                },
              });
              showToast({ title: "注册成功" });
              console.log(`res is ---${openid}---`);
              dispatch(
                setAccountInfo({
                  avatarUrl: userinfo.avatarUrl,
                  name: userinfo.name,
                  openid: openid,
                  userType: UserType.student,
                })
              );
              Taro.navigateBack({
                delta: 2,
              });
            } else {
              showToast({
                title: res.msg,
                icon: "error",
              });
            }
          })
          .catch((err) => {
            console.log(`---${err.errMsg}---`);
          });
      },
    });
  };

  //验证老师有效性
  const vaildTeacher = (): Promise<boolean> => {
    return new Promise<boolean>((resolve, reject) => {
      cloudFunction({
        name: "t_valid_no",
        data: { userInfo: { name: name, phone: number } },
      }).then((value) => {
        if (value) {
          resolve(true);
        } else {
          reject(false);
          showToast({ title: "无效老师", icon: "error" });
        }
      });
    });
  };

  //添加新的老师
  const registerTeacher = () => {
    Taro.getUserProfile({
      desc: "获取用户基本信息",
      success: (res) => {
        vaildTeacher()
          .then((value) => {
            if (value === true) {
              let userinfo = {
                ...res.userInfo,
                name: name,
                phone: number,
              };
              let authinfo = {
                name: name,
                phone: number,
                password: Md5.hashStr(password),
              };
              cloudFunction({
                name: "t_register",
                data: { userInfo: userinfo, authInfo: authinfo },
              })
                .then((res) => {
                  if (res.code == 0) {
                    const openid = res.result as string;
                    Taro.setStorage({
                      key: "userInfo",
                      data: {
                        ...userinfo,
                        userType: UserType.teacher,
                        openid: openid,
                      },
                    });
                    showToast({ title: "注册成功" });
                    console.log(`res is ---${openid}---`);
                    dispatch(
                      setAccountInfo({
                        avatarUrl: userinfo.avatarUrl,
                        name: userinfo.name,
                        openid: openid,
                        userType: UserType.teacher,
                      })
                    );
                    Taro.navigateBack({
                      delta: 2,
                    });
                  } else {
                    showToast({
                      title: res.msg,
                      icon: "error",
                    });
                  }
                })
                .catch((err) => {
                  console.log(`---${err.errMsg}---`);
                });
            }
          })
          .catch((err) => {});
      },
    });
  };

  //登录
  const tlogin = () => {
    cloudFunction({
      name: "tlogin",
      data: { phone: number, password: Md5.hashStr(password) },
    })
      .then((res) => {
        if (res.code == 0) {
          const userinfo = res.result;
          Taro.setStorage({
            key: "userInfo",
            data: {
              ...userinfo,
              userType: UserType.teacher,
            },
          });
          showToast({ title: res.msg });
          console.log(`openid is ---${userinfo.openid}---`);
          dispatch(
            setAccountInfo({
              avatarUrl: userinfo.avatarUrl,
              name: userinfo.name,
              openid: userinfo.openid,
              userType: UserType.teacher,
            })
          );
          Taro.navigateBack({
            delta: 2,
          });
        } else {
          showToast({
            title: res.msg,
            icon: "error",
          });
        }
      })
      .catch((err) => {
        console.log(`---${err.errMsg}---`);
      });
  };

  return (
    <View className="wrapper">
      <View className="row">
        <View
          className={
            type === LoginType.login ? "title-selected" : "title-noselected"
          }
          onClick={() => setType(LoginType.login)}
        >
          登 录
        </View>
        <View
          className={
            type === LoginType.register ? "title-selected" : "title-noselected"
          }
          onClick={() => setType(LoginType.register)}
        >
          注 册
        </View>
      </View>
      <View className="bgtopWrap">
        <View className="loginWrap">
          {type === LoginType.register ? (
            <View className="inpuWrapName">
              <Input
                type="text"
                name="name"
                placeholder="请输入姓名"
                value={name}
                onInput={(e) => setName(e.detail.value)}
              />
            </View>
          ) : null}
          <View className="inpuWrapMpblie">
            <Input
              type="number"
              name="mobile"
              maxlength={11}
              placeholder="请输入手机号"
              value={number}
              onInput={(e) => setNumber(e.detail.value)}
            />
          </View>
          <View className="inpuWrapPassword">
            <Input
              type="safe-password"
              name="password"
              placeholder="请输入密码"
              value={password}
              onInput={(e) => setPassword(e.detail.value)}
            />
          </View>
        </View>
      </View>

      {/* <View className="container">
        <Text className="subtitle">请选择相应的课程</Text>
        <Checkbox.Group direction="horizontal">
          <Space>
            {courses.map((value) => (
              <Checkbox
                className="custom-color"
                shape="square"
                onChange={() => {
                  if (selectedCourses.includes(value.cname)) {
                    return;
                  }
                  selectedCourses.push(value.cname);
                }}
              >
                {value.cname}{" "}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </View>
      <View className="container">
        <Text className="subtitle">请选择年级</Text>
        <Checkbox.Group direction="horizontal">
          <Space>
            {grades.map((value) => (
              <Checkbox
                className="custom-color"
                shape="square"
                onChange={() => {
                  if (selectedGrades.includes(value.grade)) {
                    return;
                  }
                  selectedGrades.push(value.grade);
                }}
              >
                {value.grade}{" "}
              </Checkbox>
            ))}
          </Space>
        </Checkbox.Group>
      </View> */}

      <Button className="button" onClick={loginRegister.bind(this)}>
        {type === LoginType.login ? "登 录" : "注 册"}
      </Button>
    </View>
  );
};

export default Index;
