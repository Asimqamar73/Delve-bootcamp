import React, { useEffect } from "react";
import { useState } from "react";
import ButtonComponent from "../../components/commonComponents/ButtonComponent";
import InputComponent from "../../components/commonComponents/InputComponent";
import { HiPlus } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import Divider from "../../components/commonComponents/Divider";
import PageHeading from "../../components/commonComponents/PageHeading";
import {
  modifyCourse,
} from "../../services/store/courseListing/courseListingSlice";
import DeleteIcon from "./components/DeleteIcon";
import { STATUSES } from "../../services/requestStatues";
import { toast } from "react-toastify";

function CourseOutcome() {
  const dispatch = useDispatch();
  const { course, status, message } = useSelector((state) => state.courseListing);
  const [goals, setGoals] = useState(course?.courseObjectives);
  const [requirements, setRequirements] = useState(course?.courseRequirements);

  const handleInputAddition = () => {
    setGoals((currentState) => [...currentState, ""]);
  };
  const handleRequirementsAddition = () => {
    setRequirements((currentState) => [...currentState, ""]);
  };
  const onMutate = (value, index) => {
    const values = [...goals];
    values[index] = value;
    setGoals(values);
  };
  const handleRequirementsChanges = (value, index) => {
    const values = [...requirements];
    values[index] = value;
    setRequirements(values);
  };
  const handleDeleteInput = (indexTofilter) => {
    const filtered = goals.filter((goal, index) => {
      return index != indexTofilter;
    });
    setGoals(filtered);
  };
  const handleRemoveRequirementInput = (indexTofilter) => {
    const filtered = requirements.filter((requirement, index) => {
      return index != indexTofilter;
    });
    setRequirements(filtered);
  };
  useEffect(() => {
    if (status === STATUSES.SUCCESS) {
      toast.success("Course updated.")
      console.log("course updated")
    }
    if (status === STATUSES.ERROR) {
      toast.error(message)
    }

  }, [])
  const handleSubmit = (event) => {
    event.preventDefault();
    const courseEssentials = {};
    courseEssentials.courseObjectives = goals;
    courseEssentials.courseRequirements = requirements;
    courseEssentials.id = course._id;
    dispatch(modifyCourse(courseEssentials));
  };
  return (
    <div>
      <PageHeading title="Objectives & requirements" />
      <Divider />
      <p>
        The following descriptions will be publicly visible on your Course
        Landing Page and will have a direct impact on your course performance.
        These descriptions will help learners decide if your course is right for
        them.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="my-4">
          <p className="text-lg font-bold ">
            What will student learn in this course?
          </p>
          <p>
            Write learning objectives or outcomes that learners can expect to
            achieve after completing this course.{" "}
            <span className="text-red-400 font-semibold">
              Write alteast three objectives/outcomes
            </span>
          </p>
          <div>
            {goals?.map((goal, index) => (
              <div className="flex gap-2 my-2" key={index}>
                <div className="flex-1 relative">
                  <InputComponent
                    type="text"
                    placeholder="Course Learning objective."
                    className="w-full p-4"
                    id={index}
                    name={index}
                    value={goal}
                    handleChange={(event) =>
                      onMutate(event.target.value, index)
                    }
                  />
                  <DeleteIcon
                    handleDeleteInput={() => handleDeleteInput(index)}
                  />
                </div>
              </div>
            ))}

            <div
              className="capitalize font-bold text-green-400 hover:cursor-pointer w-fit"
              onClick={handleInputAddition}
            >
              <div className="flex items-center gap-1">
                <HiPlus size={24} />
                <p>Add more learning objective</p>
              </div>
            </div>
          </div>
        </div>
        <div className="my-4">
          <div>
            <p className="text-lg font-bold ">
              What are the requirements or prerequisites for taking your course?
            </p>
            <p>
              List the required skills, experience, tools or equipment learners
              should have prior to taking your course. If there are no
              requirements, use this space as an opportunity to lower the
              barrier for beginners.
            </p>
          </div>
          <div>
            {requirements?.map((requirement, index) => (
              <div className="my-2" key={index}>
                <div className="flex gap-2">
                  <div className="flex-1 relative">
                    <InputComponent
                      type="text"
                      placeholder="Requirements or prerequisites for this course (Eg. Basic knowlodge of javascript or no programming skills.)"
                      className="w-full p-4"
                      id={index}
                      name={index}
                      value={requirement}
                      handleChange={(event) =>
                        handleRequirementsChanges(event.target.value, index)
                      }
                    />
                    <DeleteIcon
                      handleDeleteInput={() =>
                        handleRemoveRequirementInput(index)
                      }
                    />
                  </div>
                </div>
              </div>
            ))}
            <div
              className="capitalize font-bold text-green-400 hover:cursor-pointer w-fit"
              onClick={handleRequirementsAddition}
            >
              <div className="flex items-center gap-1">
                <HiPlus size={24} />
                <p>Add more prerequisites</p>
              </div>
            </div>
          </div>
        </div>
        <div className="float-right">
          <ButtonComponent
            name="save"
            className="btn-wide bg-green-500 hover:bg-green-600 border-none text-white"
          />
        </div>
      </form>
    </div>
  );
}

export default CourseOutcome;
