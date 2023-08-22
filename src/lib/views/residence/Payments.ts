import type {
  Residencies_residencies,
  Residencies_residencies_payments,
} from "$lib/schema/Residencies";
import moment from "moment";

export class Payments {
  public static owed(residence?: Residencies_residencies) {
    if (!residence) {
      return { amountOwed: 0, amountPayed: 0 };
    }
    const { amount, start_date, end_date, payments } = residence;
    const now = moment();
    const leaseStart = moment(parseInt(start_date));
    const leaseEnd = moment(parseInt(end_date));
    const totalMonths = leaseEnd.diff(leaseStart, "months");
    const monthsElapsed = Math.min(now.diff(leaseStart, "months"), totalMonths);
    const paymentUnits = amount / totalMonths;
    const amountOwed = paymentUnits * monthsElapsed;
    const amountPayed = Payments.amountPayed(payments);
    return { amountOwed, amountPayed };
  }

  private static amountPayed(payments: Residencies_residencies_payments[]) {
    return payments.reduce((acc, next) => acc + next.amount, 0);
  }

  public static cardColor(name: string) {
    if (name === "Visa") {
      return "yellow";
    }
    if (name === "American Express" || name === "TD Bank") {
      return "green";
    }
    if (name === "Master Card") {
      return "red";
    }
    if (name === "Discover") {
      return "orange";
    }
    if (name === "Diners") {
      return "grey";
    }
    if (name === "JCB") {
      return "maroon";
    }
    if (name === "China Union Pay" || name === "Chase Bank") {
      return "lightblue";
    }
    return "purple";
  }
}
