export const ROUTERS = {
  COMMON: {
    HOME: "/",
    LOGIN: "/login",
    FORGOT_PASSWORD: "/forgot-password",
    RESET_PASSWORD: "/reset-password",
    CANDIDATE_LIST: "/candidate-list",
    CANDIDATE_CREATE: "/candidate-create",
  },
  ADMIN: {
    USER_LIST: "/admin/user-list",
    USER_DETAILS: "/admin/user-details/:id",
    USER_EDIT: "/admin/user-edit/:id",
    USER_CREATE: "/admin/user-create",
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
