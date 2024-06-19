import { useState } from "react";
import App from "../App";
import { api } from "./API";

// eslint-disable-next-line react/prop-types
export function Cache() {
  function getCacheData() {
    // Keys of cache data
    const keys = ["user", "classrooms"];

    // Store cache data in variable
    const cache = {};

    // Loop across the keys to update cache
    for (const key of keys) {
      const data = localStorage.getItem(key);
      if (data) {
        cache[key+"Data"] = JSON.parse(data);
      } else {
        localStorage.setItem(key, null);
      }
    }

    return cache;
  }

  async function syncData(userId) {
    try {
      // Sync user data
      const userData = await fetchUserData(userId);
      localStorage.setItem("user", JSON.stringify(userData));

      // Sync classroom data
      const classroomsData = await fetchClassroomsData(userId);
      await Promise.all(classroomsData.map(async (classroom) => {
        classroom.assignments = await fetchAssignmentsData(classroom.id);
      }));
      localStorage.setItem("classrooms", JSON.stringify(classroomsData));
    } catch (error) {
      console.error("Error during sync:", error);
    }
  }

  async function fetchUserData(userId) {
    const response = await api.get(`/users/profile?id=${userId}`);
    return response.data;
  }

  async function fetchClassroomsData(userId) {
    // Get all classrooms which the user is member of
    const userClassroomsResponse = await api.get(`/user_classrooms/read_by_user_id?id=${userId}`);

    if (userClassroomsResponse.data.message === "Record not found") {
      return null;
    } else {
      // Get data for each classroom
      const classroomPromises = userClassroomsResponse.data.map(async (userClassroom) => {
        const classroomResponse = await api.get(`/classrooms/read?id=${userClassroom.classroom_id}`);
        const teacherResponse = await api.get(`/classrooms/find_teacher?id=${userClassroom.classroom_id}`);
        classroomResponse.data.teacher = teacherResponse.data;
        return classroomResponse.data;
      });

      // Return classroom data
      const classroomResponses = await Promise.all(classroomPromises);
      return classroomResponses;
    }
  }

  async function fetchAssignmentsData(classroomId) {
    // Get all assignments in the classroom
    const assignmentsResponse = await api.get(`/assignments/read_by_classroom_id?id=${classroomId}`);

    if (assignmentsResponse.data.message === "Record not found") {
      return null;
    } else {
      // Create promise schema to append details of questions and submissions
      const assignmentPromises = assignmentsResponse.data.map(async (assignment) => {
        const assignmentData = { ...assignment };

        // Fetch questions and submissions
        const [questionsResponse, submissionsResponse] = await Promise.all([
          api.get(`/questions/read_by_assignment_id?id=${assignmentData.id}`),
          api.get(`/submissions/read_by_assignment_id?id=${assignmentData.id}`)
        ]);

        // Append questions with answers
        assignmentData.questions = await Promise.all(questionsResponse.data.map(async (question) => {
          const answersResponse = await api.get(`/answers/read_by_question_id?id=${question.id}`);
          question.answers = answersResponse.data;
          return question;
        }));

        // Append submissions
        assignmentData.submissions = submissionsResponse.data || null;

        // Return assignment data
        return assignmentData;
      });

      // Return assignment data after resolving all promises
      return await Promise.all(assignmentPromises);
    }
  }

  // Store cache data in app state to make sure it'll re-render if changed
  const [cacheData, setCacheData] = useState(getCacheData());

  function updateCacheData() {
    // Get temporary client cache
    setCacheData(getCacheData());
  }

  function syncWithServer() {
    // Sync data with server
    syncData(cacheData.userData.id).then(() => {
      // Update client cache
      updateCacheData();
    });
  }

  return <App cacheData={cacheData} updateCacheData={updateCacheData} syncWithServer={syncWithServer} />;
}
