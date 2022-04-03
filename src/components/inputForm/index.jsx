import { Form, Input, DatePicker } from "antd";

import { dateFormat } from "../../common/dateHelper";
import React, { useState, useEffect, useContext, forwardRef } from "react";
import { InitContext } from "../../Layout/appLayout";
import { getLabelMap } from "../../common";
import { AppContext } from "../employeeTable";
import "./index.css";
import moment from "moment";
const InputForm = ({ initFormVal, formRef }) => {
  const { RangePicker } = DatePicker;
  const { fieldLabel } = useContext(InitContext);
  const [labelMap, setLabelMap] = useState(new Map());

  const [form] = Form.useForm();
  let iniValue = null;
  useEffect(() => {
    if (fieldLabel) {
      let labelMap = getLabelMap(fieldLabel, "INPUTFORM");
      setLabelMap(labelMap);
    }
  }, [fieldLabel]);

  return (
    <Form
      form={form}
      ref={formRef}
      initialValues={initFormVal}
      className="form-container"
      labelCol={{ span: 4 }}
      wrapperCol={{ span: 14 }}
      layout="horizontal"
    >
      <Form.Item
        name="name"
        label={labelMap && labelMap.get("E1") ? labelMap.get("E1") : "Name"}
        rules={[
          {
            required: true,
            message: `${
              labelMap && labelMap.get("E10")
                ? labelMap.get("E10")
                : "Name is missing!"
            }`,
          },
        ]}
      >
        <Input
          placeholder={
            labelMap && labelMap.get("E6")
              ? labelMap.get("E6")
              : "Please input the employee’s name"
          }
        />
      </Form.Item>
      <Form.Item
        name="contact"
        label={
          labelMap && labelMap.get("E2") ? labelMap.get("E2") : "Contact No."
        }
        rules={[
          {
            required: true,
            message: `${
              labelMap && labelMap.get("E11")
                ? labelMap.get("E11")
                : "Contact is missing!"
            }`,
          },
        ]}
      >
        <Input
          placeholder={
            labelMap && labelMap.get("E7")
              ? labelMap.get("E7")
              : "Please input the employee’s contact number"
          }
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: `${
              labelMap && labelMap.get("E12")
                ? labelMap.get("E12")
                : "Building is missing!"
            }`,
          },
        ]}
        name="building"
        label={labelMap && labelMap.get("E3") ? labelMap.get("E3") : "Building"}
      >
        <Input
          placeholder={
            labelMap && labelMap.get("E8")
              ? labelMap.get("E8")
              : "Please input the name of the building"
          }
        />
      </Form.Item>
      <Form.Item
        rules={[
          {
            required: true,
            message: `${
              labelMap && labelMap.get("E13")
                ? labelMap.get("E13")
                : "Contact peroid is missing!"
            }`,
          },
        ]}
        name="contactPeriod"
        label={
          labelMap && labelMap.get("E9") ? labelMap.get("E9") : "Contact Peroid"
        }
      >
        <RangePicker
          placeholder={[
            labelMap && labelMap.get("E4") ? labelMap.get("E4") : "Start Date",
            labelMap && labelMap.get("E5") ? labelMap.get("E5") : "End Date",
          ]}
          format={dateFormat}
        />
      </Form.Item>
    </Form>
  );
};

export default InputForm;
