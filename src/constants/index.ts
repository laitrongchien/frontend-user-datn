export const colors = {
  primary: "#ff7a33",
};

export const startLocationOptions = [
  {
    label: "Hà Nội",
    value: "Hà Nội",
  },
  {
    label: "Huế",
    value: "Huế",
  },
  {
    label: "Đà Nẵng",
    value: "Đà Nẵng",
  },
  {
    label: "Hội An",
    value: "Hội An",
  },
];

export const tourDurationOptions = [
  {
    label: "1 - 3 ngày",
    value: "1-3",
    minDuration: 1,
    maxDuration: 3,
  },
  {
    label: "4 - 6 ngày",
    value: "4-6",
    minDuration: 4,
    maxDuration: 6,
  },
  {
    label: "7 - 10 ngày",
    value: "7-10",
    minDuration: 7,
    maxDuration: 10,
  },
  {
    label: "Hơn 10 ngày",
    value: "over 10",
    minDuration: 11,
  },
];

export const typeMotorOptions = [
  {
    label: "Xe tay côn",
    value: "manual",
  },
  {
    label: "Xe số",
    value: "semi-automatic",
  },
  {
    label: "Xe ga",
    value: "automatic",
  },
];

export const PASSWORD_REGEX =
  /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
