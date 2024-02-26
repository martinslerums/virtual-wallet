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
      <Calendar
        fixedWeeks
        mode="range"
        className="flex rounded-md border text-xs bg-white"
        modifiers={dateModifiers}
        modifiersStyles={modifiersStyles}
      />
  );
}
 
export default TransactionCalendar;