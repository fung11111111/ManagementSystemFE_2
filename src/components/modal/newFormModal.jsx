import { Modal, Button } from "antd";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../employeeTable";
import InputForm from "../inputForm";
import { InitContext } from "../../Layout/appLayout";
import {
  getLabelMap,
  formFieldList,
  isFormValid,
  getEmployeeFromForm,
} from "../../common";
import moment from "moment";
import { dateFormat } from "../../common/dateHelper";
import { createEmployee } from "../../api/employee";
import "./index.css";
const NewFormModal = () => {
  const { newForm, iniEmployees, initForm } = useContext(AppContext);
  const [newFormVisible, setNewFormVisible] = newForm;
  const { fieldLabel } = useContext(InitContext);
  const [labelMap, setLabelMap] = useState(new Map());
  const formRef = useRef();

  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "ALERTMODAL");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);
  const handleOk = async () => {
    let isValid = true;
    formRef.current.submit();

    let valid = await isFormValid(formRef, formFieldList);

    if (valid) {
      let emp = getEmployeeFromForm(formRef);
      createEmployee(emp)
        .then((rsp) => {
          if (rsp.data) {
            iniEmployees();
            formRef.current.resetFields();
          }
        })
        .catch((err) => {
          console.log(err);
        });
      setNewFormVisible(false);
    }
  };

  const handleCancel = () => {
    setNewFormVisible(false);
  };

  return (
    <Modal
      width={1000}
      className="modal-content"
      title={labelMap && labelMap.get("A6") ? labelMap.get("A6") : "NEW"}
      visible={newFormVisible}
      onCancel={handleCancel}
      footer={[
        <Button key="cancel" onClick={handleCancel} className="modalNoButton">
          {labelMap && labelMap.get("A3") ? labelMap.get("A3") : "No"}
        </Button>,
        <Button
          key="ok"
          type="primary"
          onClick={handleOk}
          className="modalOkButton"
          htmlType="submit"
        >
          {labelMap && labelMap.get("A2") ? labelMap.get("A2") : "Yes"}
        </Button>,
      ]}
    >
      <InputForm formIniVal={null} formRef={formRef} />
    </Modal>
  );
};

export default NewFormModal;
