import { useState, useEffect } from "react";
import { View, Input, Button } from "@tarojs/components";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import "./index.scss";
import { fetchGrades } from "./gradeSlice";
import {
  addAll,
  addCourse,
  Course,
  deleteAll,
  deleteCourse,
  fetchCourses,
} from "./courseSlice";
import ICheckBox from "@/components/ICheckBox";
import IDropDown from "@/components/IDropDown";
import { useDidShow } from "@tarojs/taro";
import { useToast } from "taro-hooks";
import { cloudFunction } from "@/services/cloudFunction";
import Taro from "@tarojs/taro";

const Index = () => {
  const dispath = useAppDispatch();
  const grades = useAppSelector((state) => state.grades.grades);
  const courses = useAppSelector((state) => state.course.courses);
  const selectCourses = useAppSelector((state) => state.course.selecteds);
  const [name, setName] = useState("");
  const [expands, setExpands] = useState<boolean[]>([false, false]);
  const [grade, setGrade] = useState("");
  const [all, setAll] = useState(false);
  const [showToast] = useToast({ mask: true, icon: "error" });

  useDidShow(() => {
    dispath(fetchGrades());
    dispath(fetchCourses());
  });

  useEffect(() => {}, [courses]);

  const allSelected = (selected: boolean) => {
    setExpands([false, false]);
    if (selected) {
      dispath(addAll());
    } else {
      dispath(deleteAll());
    }
    setAll(selected);
  };

  const addStudents = () => {
    if (name.trim().length == 0) {
      showToast({
        title: "请输入姓名",
        icon: "error",
      });
      return;
    } else if (grade.trim().length == 0) {
      showToast({
        title: "请选择年级",
        icon: "error",
      });
      return;
    } else if (selectCourses.length == 0) {
      showToast({
        title: "请选择课程",
        icon: "error",
      });
      return;
    }

    cloudFunction({
      name: "bind_courses",
      data: {
        courseInfo: { name: name, grade: grade, courses: selectCourses },
      },
    })
      .then((res) => {
        if (res.code == 0) {
          showToast({ title: res.msg, icon: "success" });
          dispath(deleteAll());
          Taro.navigateBack({
            delta: 1,
          });
        } else if (res.code == 1) {
          showToast({ title: res.msg, icon: "error" });
        }
      })
      .catch((err) => {});
  };

  return (
    <View className="child-page">
      <View className="bgtopWrap">
        <View className="childWrap">
          <View className="title">学生姓名</View>
          <View className="inpuWrapName">
            <Input
              type="text"
              name="name"
              placeholder="请输入姓名"
              value={name}
              onInput={(e) => setName(e.detail.value)}
            />
          </View>
          <View className="title">年级</View>
          <IDropDown
            label={grade.length == 0 ? "请选择年级" : grade}
            expand={expands[0]}
            onChange={(value) => {
              console.log(value);
              var states = expands;
              states[0] = value;
              setExpands([value, false]);
            }}
            renderOverlay={grades.map((item, _) => (
              <View
                className="grade"
                onClick={() => {
                  console.log(item.grade);
                  setGrade(item.grade);
                  setExpands([false, false]);
                }}
              >
                {item.grade}
              </View>
            ))}
          ></IDropDown>
          <View className="title">课程</View>
          <IDropDown
            label="请选择课程"
            expand={expands[1]}
            onChange={(value) => {
              setExpands([false, value]);
              console.log(`请选择课程 ${value}`);
            }}
            renderOverlay={
              <View className="course-container">
                <View className="dash-top">
                  <View className="left-checkbox">
                    <ICheckBox
                      label="全部"
                      checked={all}
                      onChange={(selected) => allSelected(selected)}
                    ></ICheckBox>
                  </View>
                  <View
                    className="right-button"
                    onClick={() => {
                      setExpands([false, false]);
                    }}
                  >
                    完 成
                  </View>
                </View>
                <View className="course-wrapper">
                  {courses.map((item, _) => (
                    <View className="item">
                      <ICheckBox
                        label={item.cname}
                        checked={selectCourses.includes(item.cname)}
                        onChange={(value) => {
                          if (value) {
                            dispath(addCourse(item.cname));
                          } else {
                            dispath(deleteCourse(item.cname));
                          }
                        }}
                      ></ICheckBox>
                    </View>
                  ))}
                </View>
              </View>
            }
          ></IDropDown>
          <View className="selected-course">
            {selectCourses.length > 0
              ? selectCourses.map((item, _) => (
                  <View className="course-item">{`${item},`}</View>
                ))
              : null}
          </View>
          <Button className="button" onClick={() => addStudents()}>
            添 加
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Index;
