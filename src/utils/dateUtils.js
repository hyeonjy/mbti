import { format } from "date-fns";

export const getFormattedDate = () => {
  const now = new Date();
  let formattedDate = format(now, "yyyy. MM. dd. a hh:mm:ss");
  formattedDate = formattedDate.replace("AM", "오전").replace("PM", "오후");

  return formattedDate;
};
