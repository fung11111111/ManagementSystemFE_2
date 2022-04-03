import Home from "../components/home";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AppLayout from "../Layout/appLayout";
import StaffInfo from "../components/staff/indes";

const AppRouter = () => {
  return (
    <Router>
      <AppLayout>
        <Routes>
          <Route exact path="/" element={<Home />} />
          {/* <Route exact path="/staffInfo" element={<StaffInfo />} /> */}
        </Routes>
      </AppLayout>
    </Router>
  );
};

export default AppRouter;
