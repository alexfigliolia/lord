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

  static unitToScale(time: number) {
    const oneDay = 1000 * 60 * 60 * 24;
    const oneYear = oneDay * 365;
    const years = Math.ceil(time / oneYear);
    if (years > 3) {
      return "Years";
    }
    if (Math.floor(time / (oneDay * 30)) < 1) {
      return "Days";
    }
    return "Months";
  }
}
