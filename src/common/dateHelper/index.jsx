import moment from "moment";

export const dateFormat = "YYYY-MM-DD";

export const dateStrToDate = ({ dateStr, dateFormat }) => {
  return moment(dateStr, dateFormat);
};
