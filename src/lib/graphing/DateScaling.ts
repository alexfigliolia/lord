import moment from "moment";

export class DateScaling {
  static months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  static last12Months() {
    return new Array(12).fill("").map((_, i) => {
      const date = moment();
      date.subtract(11 - i, "months");
      date.hours(0);
      return date.toDate().getTime();
    });
  }
}
