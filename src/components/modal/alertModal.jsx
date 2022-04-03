import { Modal, Button } from "antd";
import { useContext, useState, useEffect } from "react";
import { AppContext } from "../employeeTable";
import { InitContext } from "../../Layout/appLayout";
import { getLabelMap } from "../../common";
import "./index.css";
import { deleteEmployee } from "../../api/employee";
const AlertModal = ({ id, name }) => {
  const { initForm, alert, iniEmployees } = useContext(AppContext);
  const [alertVisible, setAlertVisible] = alert;
  const [initFormVal, setInitFormVal] = initForm;
  const { fieldLabel } = useContext(InitContext);
  const [labelMap, setLabelMap] = useState(new Map());

  let deleMsg = "Are you sure to delete ?";

  const handleOk = () => {
    if (initFormVal && initFormVal.id) {
      deleteEmployee(initFormVal.id)
        .then((rsp) => {
          iniEmployees();
        })
        .catch((err) => {
          console.log(err);
        });
    }
    setAlertVisible(false);
  };

  const handleCancel = () => {
    setAlertVisible(false);
  };

  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "ALERTMODAL");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);

  if (initFormVal && initFormVal.name) {
    deleMsg =
      labelMap && labelMap.get("A1")
        ? labelMap.get("A1") + " " + initFormVal.name + "?"
        : "Are you sure to delete ?";
  }

  return (
    <Modal
      width={1000}
      className="modal-content"
      title={labelMap && labelMap.get("A4") ? labelMap.get("A4") : "WARNING"}
      visible={alertVisible}
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
      <p>{deleMsg}</p>
    </Modal>
  );
};

export default AlertModal;
