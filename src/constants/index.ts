export const colors = {
  primary: "#ff7a33",
  black: "#000",
};

export const DEFAULT_LOCATION = "Số 10, Hoàn Kiếm, Hà Nội";

export const REVIEWS_PER_TOUR = 5;

export const REVIEWS_PER_MOTOR = 5;

export const TOURS_PER_PAGE = 6;

export const MOTORS_PER_PAGE = 6;

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

export const servicesInTour = [
  "Hướng dẫn viên",
  "Xe đầy xăng",
  "Mũ bảo hiểm",
  "Thức ăn + Đồ uống",
  "Chỗ nghỉ ngơi",
  "Phí vào cửa/ Giấy phép",
  "Video chuyến đi",
];

export const servicesInRent = [
  {
    label: "Mũ bảo hiểm",
    image: "https://cdn.riderly.com/storage/media/img/addons/helmet.svg",
  },
  {
    label: "Găng tay",
    image: "https://cdn.riderly.com/storage/media/img/addons/gloves.svg",
  },
  {
    label: "Khóa xe",
    image: "https://cdn.riderly.com/storage/media/img/addons/padlock.svg",
  },
  {
    label: "Hỗ trợ sửa chữa",
    image: "https://cdn.riderly.com/storage/media/img/addons/mechanic.svg",
  },
  {
    label: "Thay thế xe",
    image:
      "https://cdn.riderly.com/storage/media/img/addons/bike_replacement.svg",
  },
  {
    label: "Bình đầy xăng",
    image: "https://cdn.riderly.com/storage/media/img/addons/full_tank.svg",
  },
  {
    label: "GPS",
    image: "https://cdn.riderly.com/storage/media/img/addons/gps.svg",
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

export const faqs = [
  {
    question: "Ngày nhận xe thuê dự kiến có thể vào ngày nào ?",
    answer:
      "Để tối ưu khả năng sắp xếp xe thuê một cách tốt nhất, ngày nhận xe dự kiến sớm nhất là 2 ngày và muộn nhất là 4 ngày so với ngày hiện tại, ví dụ bạn đặt thuê xe vào ngày 07/07/2024 bạn có thể nhận xe trong vòng ngày 09/07/2024 - 11/07/2024, ngày trả xe có thể tùy ý",
  },
  {
    question: "Khi gặp trường hợp khẩn cấp có thể liên hệ qua đâu ?",
    answer:
      "Hotline của chúng tôi là 0904392423. Nếu gặp vấn đề gì, hãy gọi cho chúng tôi để nhận được sự trợ giúp tốt nhất",
  },
  {
    question: "Nếu xe gặp sự cố trên đường thì sao ?",
    answer:
      "Chúng tôi cung cấp một số dụng cụ kèm theo để sửa nếu vấn đề nhẹ, nếu tình trạng phức tạp hãy gọi cho chúng tôi qua hotline để có thể sửa chữa lưu động với chi phí phù hợp",
  },
];
