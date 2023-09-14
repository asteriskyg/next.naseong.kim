import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import type { ConfigType, OpUnitType, QUnitType } from "dayjs";
import "dayjs/locale/ko";

dayjs.extend(relativeTime);

export const getFormattedDate = (date: ConfigType, format: string) => {
  return dayjs(date).format(format);
};

export const getTimeFromNow = (date: ConfigType) => {
  return dayjs(date).locale("ko").fromNow();
};

export const getTimeDiff = (
  to: ConfigType,
  from: ConfigType,
  format: QUnitType | OpUnitType
) => {
  return dayjs(to).diff(from, format);
};

export const getClippedTimestamp = (to: ConfigType, from: ConfigType) => {
  const diff = dayjs(from).diff(to, "s");

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor((diff % 3600) / 60);
  const seconds = diff % 60;

  return {
    hours,
    minutes,
    seconds,
  };
};
