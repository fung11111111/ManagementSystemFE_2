import api from "../api";

const getAllFieldabel = () => {
  return api.get(`fieldMap`);
};

const getFieldLabelByLang = (lang) => {
  return api.get(`fieldMap?lang=${lang}`);
};

export { getAllFieldabel, getFieldLabelByLang };
