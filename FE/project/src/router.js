import { Route, Routes } from "react-router-dom";
import MasterLayout from "./pages";
import { ROUTERS } from "./utils/routers";
import HomePage from "./pages/common/homePage";
import Login from "./pages/common/login";

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
