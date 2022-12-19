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
  const [expand, setExpand] = useState(false);
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
          {/* <IDropDown
            label={grade.length == 0 ? "请选择年级" : grade}
            expand={expand}
            onChange={(value) => {
              console.log(value);
              setExpand(value);
            }}
            renderOverlay={grades.map((item, _) => (
              <View
                className="grade"
                onClick={() => {
                  console.log(item.grade);
                  setGrade(item.grade);
                  setExpand(!expand);
                }}
              >
                {item.grade}
              </View>
            ))}
          ></IDropDown>
          <IDropDown
            label="请选择课程"
            expand={expand}
            onChange={(value) => {}}
          ></IDropDown> */}
          {/* <View
            className={expand == false ? "grade-collapse" : "grade-expand"}
          ></View> */}
          <View
            className="dropdown"
            onClick={() => {
              setExpand(!expand);
            }}
          >
            <View className="content">
              <View className="title">
                {grade.length == 0 ? "请选择年级" : grade}
              </View>
              <Image
                className={expand === false ? "arrow-down" : "arrow-up"}
                src={dropDownImg}
              ></Image>
            </View>
          </View>
          <View className={expand == false ? "grade-collapse" : "grade-expand"}>
            {grades.map((item, _) => (
              <View
                className="grade"
                onClick={() => {
                  console.log(item.grade);
                  setGrade(item.grade);
                  setExpand(false);
                }}
              >
                {item.grade}
              </View>
            ))}
          </View>
          <View className="course-check-expand" onClick={() => {}}>
            <View className="course-view">
              <View className="course-title">请选择课程</View>
              <Image className="arrow-right" src={dropDownImg}></Image>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

export default Index;
