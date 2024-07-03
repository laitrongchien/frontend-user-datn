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
      "Để tối ưu khả năng sắp xếp xe thuê một cách tốt nhất, ngày nhận xe dự kiến sớm nhất là 1 ngày và muộn nhất là 3 ngày so với ngày hiện tại",
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
  {
    question: "Tôi có thể thanh toán bằng tiền mặt không ?",
    answer: "Có, bạn có thể thanh toán bằng tiền mặt",
  },
];
