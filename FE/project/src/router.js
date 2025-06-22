import { Route, Routes } from "react-router-dom";
import MasterLayout from "./pages";
import { ROUTERS } from "./utils/routers";
import HomePage from "./pages/common/homePage";
import Login from "./pages/common/login";
import ForgotPassword from "./pages/common/forgotPassword";
import ResetPassword from "./pages/common/resetPassword";
import UserList from "./pages/user/userlist/user";
import UserDetails from "./pages/user/userlist/detail";
import UserEdit from "./pages/user/userlist/edit";
import CreateUser from "./pages/user/userlist/create";
import InterviewSchedule from "./pages/common/interview/interviewschedule";
import CreateInterviewSchedule from "./pages/common/interview/create";
import ViewInterviewSchedule from "./pages/common/interview/details";
import ViewInterviewDetail from "./pages/common/interview/details";
import CancelInterviewSchedule from "./pages/common/interview/cancel";
import SubmitInterviewResult from "./pages/common/interview/submit";
import InterviewList from "./pages/common/interview/interviewschedule";
import InterviewDetails from "./pages/common/interview/details";
import CreateInterview from "./pages/common/interview/create";
import EditInterview from "./pages/common/interview/edit";
import SendInterviewReminder from "./pages/common/interview/reminder";
import ViewOfferList from "./pages/offer/list";
import CreateNewOffer from "./pages/offer/create";
import EditOffer from "./pages/offer/edit";
import OfferDetails from "./pages/offer/detail";

const renderRouter = () => {
  const routers = [
    {
      path: ROUTERS.COMMON.HOME,
      component: <HomePage />,
    },
    {
      path: ROUTERS.COMMON.LOGIN,
      component: <Login />,
    },
    {
      path: ROUTERS.COMMON.FORGOT_PASSWORD,
      component: <ForgotPassword />,
    },
    {
      path: ROUTERS.COMMON.RESET_PASSWORD,
      component: <ResetPassword />,
    },
    {
      path: ROUTERS.USER.USER_LIST,
      component: <UserList />,
    },
    {
      path: ROUTERS.USER.USER_DETAILS,
      component: <UserDetails />,
    },
    {
      path: ROUTERS.USER.USER_EDIT,
      component: <UserEdit/>,
    },
    {
      path: ROUTERS.USER.USER_CREATE,
      component: <CreateUser/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_SCHEDULE,
      component: <InterviewList/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_CREATE,
      component: <CreateInterview/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_DETAILS,
      component: <InterviewDetails/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_EDIT,
      component: <EditInterview/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_SUBMIT,
      component: <SubmitInterviewResult/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_CANCEL,
      component: <CancelInterviewSchedule/>,
    },
    {
      path: ROUTERS.INTERVIEW.INTERVIEW_REMINDER,
      component: <SendInterviewReminder/>,
    },
    {
      path: ROUTERS.OFFER.OFFER_LIST,
      component: <ViewOfferList/>,
    },
    {
      path: ROUTERS.OFFER.OFFER_CREATE,
      component: <CreateNewOffer/>,
    },
    {
      path: ROUTERS.OFFER.OFFER_EDIT,
      component: <EditOffer/>,
    },
    {
      path: ROUTERS.OFFER.OFFER_DETAIL,
      component: <OfferDetails/>,
    },

  ];
  return (
    <MasterLayout>
      <Routes>
        {routers.map((item, index) => (
          <Route key={index} path={item.path} element={item.component} />
        ))}
      </Routes>
    </MasterLayout>
  );
};

const RouterCustom = () => {
  return renderRouter();
};

export default RouterCustom;
