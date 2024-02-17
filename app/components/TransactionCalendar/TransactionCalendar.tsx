"use client"

import { Calendar } from "@/components/ui/calendar";

type TransactionCalendarProps = {
  transactions: Transaction [];
}

const TransactionCalendar = ({transactions}: TransactionCalendarProps) => {


  const dates = transactions.map((transaction: Transaction) => transaction.createdAt);

  const dateModifiers = {
    hasTransactions: dates.map(date => new Date(date)),
  };

  const modifiersStyles = {
    hasTransactions: {
      color: 'white',
      backgroundColor: "#33CC33"
    }
  };

  return (
    <div className="flex">
      <Calendar
        fixedWeeks
        mode="range"
        className="rounded-md border text-xs"
        modifiers={dateModifiers}
        modifiersStyles={modifiersStyles}
      />
    </div>
  );
}
 
export default TransactionCalendar;