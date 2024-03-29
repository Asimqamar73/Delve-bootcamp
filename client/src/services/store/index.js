import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../store/auth/authSlice";
import statsReducer from "./stats/statsSlice";
import coursesReducer from "../store/courses/coursesSlice";
import courseListingReducer from "../store/courseListing/courseListingSlice";
import courseLearningReducer from "../store/courseLearnig/courseLearningSlice"
import courseReviewsReducer from "../store/courseReview/courseReviewSlice"


const store = configureStore({
  reducer: {
    auth: authReducer,
    stats:statsReducer,
    courseListing: courseListingReducer,
    courses: coursesReducer,
    courseLearning: courseLearningReducer,
    courseReview: courseReviewsReducer
  },
});

export default store;
