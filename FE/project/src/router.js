import { Route, Routes } from "react-router-dom";
import MasterLayout from "./pages";
import { ROUTERS } from "./utils/routers";
import HomePage from "./pages/common/homePage";
import Login from "./pages/common/login";
import ForgotPassword from "./pages/common/forgotPassword";
import ResetPassword from "./pages/common/resetPassword";

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
