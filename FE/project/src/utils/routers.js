import UserList from "../pages/user/userlist/user";

export const ROUTERS = {
  COMMON: {
    HOME: "/",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
  },
  USER: {
    USER_LIST: "/user-list",
    USER_DETAILS: "/user-details",
    USER_EDIT: "/user-edit",
    USER_CREATE: "/user-create",
  },
  INTERVIEW:{
    INTERVIEW_SCHEDULE:"/interview-list",
    INTERVIEW_CREATE:"/interview-create",
    INTERVIEW_DETAILS:"/interview-details",
    INTERVIEW_EDIT:"/interview-edits",
    INTERVIEW_SUBMIT:"/interview-submit",
    INTERVIEW_CANCEL:"/interview-cancel",
    INTERVIEW_REMINDER:"/interview-remind",

  }
};
