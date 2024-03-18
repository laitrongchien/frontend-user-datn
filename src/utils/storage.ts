export const getLocalAccessToken = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.access_token;
  }
};

export const getLocalRefreshToken = () => {
  if (typeof window !== "undefined") {
    const user = JSON.parse(localStorage.getItem("user") as string);
    return user?.refresh_token;
  }
};

export const setUser = (user: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("user", JSON.stringify(user));
  }
};

export const removeUser = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("user");
  }
};

export const setRentalData = (rentalData: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("rentalData", JSON.stringify(rentalData));
  }
};

export const getRentalData = () => {
  if (typeof window !== "undefined") {
    const rentalData = JSON.parse(localStorage.getItem("rentalData") as string);
    return rentalData;
  }
};

export const removeRentalData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("rentalData");
  }
};

export const setBookingData = (bookingTourData: any) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("bookingTourData", JSON.stringify(bookingTourData));
  }
};

export const getBookingData = () => {
  if (typeof window !== "undefined") {
    const bookingTourData = JSON.parse(
      localStorage.getItem("bookingTourData") as string
    );
    return bookingTourData;
  }
};

export const removeBookingData = () => {
  if (typeof window !== "undefined") {
    localStorage.removeItem("bookingTourData");
  }
};

export const clear = () => {
  if (typeof window !== "undefined") {
    localStorage.clear();
  }
};
