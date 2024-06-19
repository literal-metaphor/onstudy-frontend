const validRoutes = ["dashboard", "classrooms", "assignments", "search", "classroom", "assignment", "quiz", "createAssignment"];
if (!sessionStorage.getItem("page") || !validRoutes.includes(sessionStorage.getItem("page"))) {
  sessionStorage.setItem("page", "dashboard");
}
export const page = sessionStorage.getItem("page");