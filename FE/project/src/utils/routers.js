import UserList from "../pages/user/userlist/user";
import ViewOfferList from "../pages/offer/list";

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

  },
  OFFER:{
    OFFER_LIST:"offer-list",
    OFFER_CREATE:"offer-create",
    OFFER_EDIT:"offer-edit",
    OFFER_DETAIL:"offer-detail",


  }
};
