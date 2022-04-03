import { EditOutlined, DeleteOutlined, DownOutlined } from "@ant-design/icons";
import { useState, useEffect, createContext, useContext, useRef } from "react";
import { Table, Button, Select } from "antd";
import AlertModal from "../modal/alertModal";
import EditFormModal from "../modal/editFormModal";
import { getAllEmployees } from "../../api/employee";
import { InitContext } from "../../Layout/appLayout";
import {
  getLabelMap,
  STATUS_WITHIN_A_MONTH,
  STATUS_WITHIN_3_MONTH,
  SELECT_ALL,
  SELCT_WITHIN_A_MONTH,
  SELECT_WITHIN_3_MONTHS,
} from "../../common";
import "./index.css";
import NewFormModal from "../modal/newFormModal";
import moment from "moment";
import { dateFormat } from "../../common/dateHelper";
export const AppContext = createContext(null);
const EmployeeTable = () => {
  const { fieldLabel } = useContext(InitContext);
  const [alertVisible, setAlertVisible] = useState(false);
  const [editFormVisible, setEditFormVisible] = useState(false);
  const [newFormVisible, setNewFormVisible] = useState(false);

  const [employees, setEmployees] = useState([]);
  const [labelMap, setLabelMap] = useState(new Map());
  const [initFormVal, setInitFormVal] = useState(null);
  const [filterOption, setFilterOption] = useState(SELECT_ALL);
  const [tableDate, setTableData] = useState(null);

  const selectRef = useRef(null);

  const iniEmployees = () => {
    getAllEmployees().then((rsp) => {
      setEmployees(rsp.data);
      if (filterOption === SELECT_ALL) {
        setTableData(rsp.data);
      }
    });
  };

  useEffect(() => {
    iniEmployees();
  }, []);

  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "HOME");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);

  const { Option } = Select;

  const columns = [
    {
      title: `${labelMap && labelMap.get("H5") ? labelMap.get("H5") : "Name"}`,
      dataIndex: "name",
      editable: true,
      inputType: "text",
      render: (_, record) => {
        if (record.status === STATUS_WITHIN_A_MONTH) {
          return <span className="m1Alert">{record.name}</span>;
        } else if (record.status === STATUS_WITHIN_3_MONTH) {
          return <span className="m3Alert">{record.name}</span>;
        } else {
          return <span>{record.name}</span>;
        }
      },
    },
    {
      title: `${
        labelMap && labelMap.get("H6") ? labelMap.get("H6") : "Contact No."
      }`,
      dataIndex: "contact",
      editable: true,
      inputType: "text",
      render: (_, record) => {
        if (record.status === STATUS_WITHIN_A_MONTH) {
          return <span className="m1Alert">{record.contact}</span>;
        } else if (record.status === STATUS_WITHIN_3_MONTH) {
          return <span className="m3Alert">{record.contact}</span>;
        } else {
          return <span>{record.contact}</span>;
        }
      },
    },
    {
      title: `${
        labelMap && labelMap.get("H7") ? labelMap.get("H7") : "Building"
      }`,
      dataIndex: "building",
      editable: true,
      inputType: "text",
      render: (_, record) => {
        if (record.status === STATUS_WITHIN_A_MONTH) {
          return <span className="m1Alert">{record.building}</span>;
        } else if (record.status === STATUS_WITHIN_3_MONTH) {
          return <span className="m3Alert">{record.building}</span>;
        } else {
          return <span>{record.building}</span>;
        }
      },
    },
    {
      title: `${
        labelMap && labelMap.get("H8") ? labelMap.get("H8") : "Employment Date"
      }`,
      dataIndex: "employmentDate",
      editable: true,
      inputType: "date",
      render: (_, record) => {
        if (record.status === STATUS_WITHIN_A_MONTH) {
          return <span className="m1Alert">{record.employmentDate}</span>;
        } else if (record.status === STATUS_WITHIN_3_MONTH) {
          return <span className="m3Alert">{record.employmentDate}</span>;
        } else {
          return <span>{record.employmentDate}</span>;
        }
      },
    },
    {
      title: `${
        labelMap && labelMap.get("H9")
          ? labelMap.get("H9")
          : "Contract Expiry Date"
      }`,
      dataIndex: "expiryDate",
      editable: true,
      inputType: "date",
      render: (_, record) => {
        if (record.status === STATUS_WITHIN_A_MONTH) {
          return <span className="m1Alert">{record.expiryDate}</span>;
        } else if (record.status === STATUS_WITHIN_3_MONTH) {
          return <span className="m3Alert">{record.expiryDate}</span>;
        } else {
          return <span>{record.expiryDate}</span>;
        }
      },
    },
    {
      title: `${
        labelMap && labelMap.get("H10") ? labelMap.get("H10") : "Tools"
      }`,
      dataIndex: "action",
      render: (_, record) => {
        return (
          <>
            <Button
              className="editButton"
              shape="circle"
              icon={<EditOutlined />}
              size="large"
              onClick={() => editEmpoyee(record)}
            ></Button>
            <Button
              className="deleteButton"
              shape="circle"
              icon={<DeleteOutlined />}
              size="large"
              onClick={() => removeEmpoyee(record)}
            ></Button>
          </>
        );
      },
    },
  ];

  const addEmployee = () => {
    setNewFormVisible(true);
  };

  const editEmpoyee = (record) => {
    let startDate = null;
    let endDate = null;

    if (record.employmentDate) {
      startDate = moment(record.employmentDate, dateFormat);
    }
    if (record.expiryDate) {
      endDate = moment(record.expiryDate, dateFormat);
    }
    let iniVal = {
      id: record.id,
      name: record.name,
      contact: record.contact,
      building: record.building,
      contactPeriod: [startDate, endDate],
    };
    setInitFormVal(iniVal);
    setEditFormVisible(true);
  };

  const removeEmpoyee = (record) => {
    setInitFormVal(record);
    setAlertVisible(true);
  };

  const handleSelectChange = (val) => {
    console.log(val);
    if (val === SELECT_ALL) {
      setTableData(employees);
    } else if (val === SELCT_WITHIN_A_MONTH) {
      let filteredEmps = employees.filter(
        (emp) => emp.status === STATUS_WITHIN_A_MONTH
      );
      setTableData(filteredEmps);
    } else if (val === SELECT_WITHIN_3_MONTHS) {
      let filteredEmps = employees.filter(
        (emp) => emp.status === STATUS_WITHIN_3_MONTH
      );
      setTableData(filteredEmps);
    }
  };

  return (
    <div className="main-container">
      <AppContext.Provider
        value={{
          initForm: [initFormVal, setInitFormVal],
          alert: [alertVisible, setAlertVisible],
          editForm: [editFormVisible, setEditFormVisible],
          newForm: [newFormVisible, setNewFormVisible],
          iniEmployees: iniEmployees,
        }}
      >
        <Button shape="circle" className="newButton" onClick={addEmployee}>
          +
        </Button>
        <Select
          ref={selectRef}
          defaultValue={SELECT_ALL}
          style={{ width: 200 }}
          className="filter-selector"
          onChange={handleSelectChange}
        >
          <Option value={SELECT_ALL}>
            {labelMap && labelMap.get("H11") ? labelMap.get("H11") : "Show All"}
          </Option>
          <Option value={SELCT_WITHIN_A_MONTH}>
            {labelMap && labelMap.get("H12")
              ? labelMap.get("H12")
              : "Expire within 1 Month"}
          </Option>
          <Option value={SELECT_WITHIN_3_MONTHS}>
            {labelMap && labelMap.get("H13")
              ? labelMap.get("H13")
              : "Expire within 3 Months"}
          </Option>
        </Select>
        <Table columns={columns} dataSource={tableDate} />
        <AlertModal />
        <EditFormModal />
        <NewFormModal />
      </AppContext.Provider>
    </div>
  );
};

export default EmployeeTable;
