import { Modal, Button } from "antd";
import { useContext, useState, useEffect, useRef } from "react";
import { AppContext } from "../employeeTable";
import InputForm from "../inputForm";
import { InitContext } from "../../Layout/appLayout";
import {
  getLabelMap,
  isFormValid,
  formFieldList,
  getEmployeeFromForm,
} from "../../common";
import { updateEmployee } from "../../api/employee";
import { dateFormat } from "../../common/dateHelper";
import "./index.css";
const EditFormModal = () => {
  const { initForm, editForm, iniEmployees } = useContext(AppContext);
  const [formVisible, setFormVisible] = editForm;
  const [initFormVal, setInitFormVal] = initForm;
  const { fieldLabel } = useContext(InitContext);
  const [labelMap, setLabelMap] = useState(new Map());
  const formRef = useRef();

  useEffect(() => {
    if (formRef && formRef.current) {
      formRef.current.resetFields();
    }
  }, [initFormVal]);

  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "ALERTMODAL");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);

  const handleOk = async () => {
    formRef.current.submit();

    let valid = await isFormValid(formRef, formFieldList);
    console.log(valid);
    if (valid) {
      let emp = getEmployeeFromForm(formRef);

      updateEmployee(initFormVal.id, emp)
        .then((rsp) => {
          if (rsp.data) {
            iniEmployees();
          }
        })
        .catch((err) => {
          console.log(err);
        });

      setFormVisible(false);
    }
  };

  const handleCancel = () => {
    setFormVisible(false);
  };

  return (
    <Modal
      width={1000}
      className="modal-content"
      title={labelMap && labelMap.get("A5") ? labelMap.get("A5") : "EDIT"}
      visible={formVisible}
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
        >
          {labelMap && labelMap.get("A2") ? labelMap.get("A2") : "Yes"}
        </Button>,
      ]}
    >
      <InputForm initFormVal={initFormVal} formRef={formRef} />
    </Modal>
  );
};

export default EditFormModal;
