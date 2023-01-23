import { createSlice } from "@reduxjs/toolkit";
import { authFetch } from "../../../lib/axios/authFetch";

export const coursesSlice = createSlice({
  name: "Courses",
  initialState: {
    courses: null,
    course: null,
  },
  reducers: {
    setCourses: (state, action) => {
      state.courses = action.payload;
    },
    setCourse: (state, action) => {
      state.courses = action.payload;
    },
  },
});

export const { setCourses, setCourse } = coursesSlice.actions;
export default coursesSlice.reducer;

// Thunks

export function fetchAllCourses() {
  return async function (dispatch, getState) {
    try {
      const { data } = await authFetch.get("/courses/publishedCourses");
      console.log(data);
      dispatch(setCourses(data));
    } catch (error) {
      console.log(error);
    }
  };
}

export function fetchCourseDetails(courseId) {
  return async function fetchCourseDetailsThunk(dispatch, getState) {
    console.log(courseId);
    try {
      const { data } = await authFetch.get(`/course/courseDetails/${courseId}`);
      console.log(data);
      dispatch(setCourse(data));
    } catch (error) {
      console.log(error);
    }
  };
}
