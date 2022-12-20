import { useState, useEffect } from "react";
import { View, Input } from "@tarojs/components";
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
  const [expands, setExpands] = useState<boolean[]>([false, false]);
  const [grade, setGrade] = useState("");
  const [selectedCourses, setSelectedCourses] = useState<string[]>([]);
  const [all, setAll] = useState(false);
  useEffect(() => {
    dispath(fetchGrades());
    dispath(fetchCourses());
  }, []);

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
                      onChange={(selected) => {
                        var curCourses: string[] = selectedCourses;
                        setAll(selected);
                        if (selected) {
                          courses.forEach((item, _) => {
                            if (!curCourses.includes(item.cname)) {
                              curCourses.push(item.cname);
                            }
                          });
                          setSelectedCourses(curCourses);
                        } else {
                          setSelectedCourses([]);
                        }
                      }}
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
                        checked={selectedCourses.includes(item.cname)}
                        onChange={(_) => {
                          var curCourses: string[] = selectedCourses;
                          const index = curCourses.indexOf(item.cname);
                          if (index !== -1) {
                            curCourses.splice(index, 1);
                          } else {
                            curCourses.push(item.cname);
                          }
                          setSelectedCourses(curCourses);
                          console.log(item.cname);
                        }}
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
