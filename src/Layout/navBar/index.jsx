import { Menu } from "antd";
import { Link } from "react-router-dom";
import { getLabelMap } from "../../common";
import { useContext, useEffect, useState } from "react";
import { InitContext } from "../appLayout";
import { HomeOutlined } from "@ant-design/icons";
import "./index.css";
const NavBar = () => {
  const { fieldLabel } = useContext(InitContext);
  const [labelMap, setLabelMap] = useState(new Map());

  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "COMMON");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);

  return (
    <div className="nav-bar-menu">
      <Menu theme="dark" mode="horizontal" defaultSelectedKeys={["i1"]}>
        <Menu.Item key="i1">
          <Link to="/">
            <HomeOutlined />{" "}
            {labelMap && labelMap.get("C1") ? labelMap.get("C1") : "HOME"}
          </Link>
        </Menu.Item>
        {/* <Menu.Item key="i2">
          <Link to="/staffInfo">
            {labelMap && labelMap.get("C1") ? labelMap.get("C2") : "STAFF INFO"}
          </Link>
        </Menu.Item> */}
      </Menu>
    </div>
  );
};

export default NavBar;
