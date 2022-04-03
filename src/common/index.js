import { dateFormat } from "./dateHelper";

const getLabelMap = (lang, type) => {
  let labelMap = new Map();
  if (lang) {
    lang.map((field) => {
      if (field.type === type) {
        labelMap.set(field.field_code, field.label);
      }
    });
  }
  return labelMap;
};

const getEmployeeFromForm = (formRef) => {
  let emp = {
    name: formRef.current.getFieldValue("name"),
    contact: formRef.current.getFieldValue("contact"),
    building: formRef.current.getFieldValue("building"),
    employmentDate: formRef.current
      .getFieldValue("contactPeriod")[0]
      .format(dateFormat),
    expiryDate: formRef.current
      .getFieldValue("contactPeriod")[1]
      .format(dateFormat),
  };
  return emp;
};

const isFormValid = (formRef, fieldList) => {
  return formRef.current
    .validateFields(fieldList)
    .then((val) => {
      console.log("no error");
      return true;
    })
    .catch((err) => {
      console.log(err);
      return false;
    });
};

//employee status
const STATUS_NORMAL = "normal";
const STATUS_EXPIRED = "expired";
const STATUS_WITHIN_A_MONTH = "almost";
const STATUS_WITHIN_3_MONTH = "soon";

//select options
const SELECT_ALL = "ALL";
const SELCT_WITHIN_A_MONTH = "M1";
const SELECT_WITHIN_3_MONTHS = "M3";

const formFieldList = ["name", "contact", "building", "contactPeriod"];

export {
  getLabelMap,
  isFormValid,
  getEmployeeFromForm,
  formFieldList,
  STATUS_NORMAL,
  STATUS_EXPIRED,
  STATUS_WITHIN_A_MONTH,
  STATUS_WITHIN_3_MONTH,
  SELECT_ALL,
  SELCT_WITHIN_A_MONTH,
  SELECT_WITHIN_3_MONTHS,
};
