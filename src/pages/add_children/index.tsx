import React, { useCallback, useState, useEffect } from "react";
import {
  View,
  Image,
  Input,
  Checkbox,
  CheckboxGroup,
} from "@tarojs/components";
import dropDownImg from "@/assets/images/user/expand_more_black.png";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import "./index.scss";
import { fetchGrades } from "./gradeSlice";
import { fetchCourses } from "./courseSlice";
import ICheckBox from "@/components/ICheckBox";
import IDropDown from "@/components/IDropDown";

const Index = () => {
  const grades = useAppSelector((state) => state.grades.grades);
  const courses = useAppSelector((state) => state.course.courses);
  const dispath = useAppDispatch();
  const [name, setName] = useState("");
  const [gexpand, setGExpand] = useState(false);
  const [cexpand, setCExpand] = useState(false);
  const [grade, setGrade] = useState("");

  useEffect(() => {
    dispath(fetchGrades());
    dispath(fetchCourses());
  }, []);

  return (
    <View className="child-page">
      <View className="bgtopWrap">
        <View className="childWrap">
          <View className="inpuWrapName">
            <Input
              type="text"
              name="name"
              placeholder="请输入姓名"
              value={name}
              onInput={(e) => setName(e.detail.value)}
            />
          </View>
          <IDropDown
            label={grade.length == 0 ? "请选择年级" : grade}
            expand={gexpand}
            onChange={(value) => {
              console.log(value);
              setGExpand(value);
            }}
            renderOverlay={grades.map((item, _) => (
              <View
                className="grade"
                onClick={() => {
                  console.log(item.grade);
                  setGrade(item.grade);
                  setGExpand(!gexpand);
                }}
              >
                {item.grade}
              </View>
            ))}
          ></IDropDown>

          <IDropDown
            label="请选择课程"
            expand={cexpand}
            onChange={(value) => {
              console.log(value);
              setCExpand(value);
            }}
            renderOverlay={
              <View className="course-container">
                <View className="dash-top">
                  <View className="left-checkbox">
                    <ICheckBox
                      label="全部"
                      checked={false}
                      onChange={(e) => {}}
                    ></ICheckBox>
                  </View>
                  <View className="right-button">完 成</View>
                </View>
                <View className="course-wrapper">
                  {courses.map((item, _) => (
                    <View className="item">
                      <ICheckBox
                        label={item.cname}
                        checked={false}
                        onChange={(e) => {}}
                      ></ICheckBox>
                    </View>
                  ))}
                </View>
              </View>
            }
          ></IDropDown>
        </View>
      </View>
    </View>
  );
};

export default Index;
