// "use client"

// import { Calendar } from "@/components/ui/calendar"
// import {
//   Carousel,
//   CarouselContent,
//   CarouselItem,
//   CarouselNext,
//   CarouselPrevious,
// } from "@/components/ui/carousel";
// import WalletCard from "../components/WalletCard/WalletCard";

// import { format } from "date-fns"
// import { useSession } from "next-auth/react";

// const getWallets = async () => {
//   const response = await fetch("http://localhost:3000/api/wallets", {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch wallets from route-handler");
//   }

//   return response.json();
// };

// const getTransactions = async () => {
//   const response = await fetch("http://localhost:3000/api/transactions", {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error("Failed to fetch transactions from route-handler");
//   }

//   return response.json();
// };

// const addUser = async () => {
//   const newuser = await fetch('http://localhost:3000/api/users', {
//     method: 'POST',
//     headers: {
//       'Content-type': 'application/json',
//     },
//   });

//   return newuser.json();
// };

// const CarouselSpacing =  () => {

//   const session = useSession()
//   console.log("Session: ", session.status)

//   // const wallets = await getWallets();
//   // const transactions = await getTransactions();

//   // const dates = transactions.map((transaction: Transaction) => transaction.createdAt);

//   //  const dates = transactions.map((transaction: Transaction) =>{
//   //   const date = new Date(transaction.createdAt);
//   //   date.setUTCHours(0, 0, 0, 0);
//   //   return date;
//   // });

//   // const transactionCountByDate = dates.reduce((acc, date) => {
//   //   const formattedDate = new Date(date.getTime() - (date.getTimezoneOffset() * 60000)).toISOString();
//   //   acc[formattedDate] = (acc[formattedDate] || 0) + 1;
//   //   return acc;
//   // }, {});

//   // console.log("All dates ", dates)
//   // console.log("Dates grouped by count ", transactionCountByDate)

//   // const getCountColor = (count) => {
//   //   if (count === 1) {
//   //     return '#98FB98'; // lightgreen
//   //   } else if (count === 2) {
//   //     return '#008000'; // green
//   //   } else if (count >= 3) {
//   //     return '#006400'; // darkgreen
//   //   }
//   //   return '#ffffff'; // default color
//   // };

//   // const dateModifiers = {
//   //   hasTransactions: dates.map((date: string) => new Date(date)),
//   // };

//   // const modifiersStyles = {
//   //   hasTransactions: {
//   //     color: 'white',
//   //     backgroundColor: "#33CC33"
//   //   }
//   // };

//   return (
//     <div className="flex">
//       {/* <Calendar
//         fixedWeeks
//         mode="range"
//         className="rounded-md border text-xs"
//         modifiers={dateModifiers}
//         modifiersStyles={modifiersStyles}
//       /> */}
//       <br />
//       <br />

//       <button type="button" onSubmit={}>
//         FIRE USER
//       </button>
      
//     </div>
//   );
// };

// export default CarouselSpacing;

// // const dates = transactions.map((transaction: Transaction) => {
// //   const date = new Date(transaction.createdAt);
// //   return `${date.getDate()}-${date.getMonth() + 1}-${date.getFullYear()}`;
// // });

// // const dates2 = transactions.map((transaction: Transaction) => transaction.createdAt);

// // console.log("All dates2222 ", dates2);
// // console.log("All dates ", dates);

// // const transactionCountByDate = dates.reduce((acc, date) => {
// //   acc[date] = (acc[date] || 0) + 1;
// //   return acc;
// // }, {});





// // <div className="w-full max-w-2xl flex justify center items-center">
// //       <Carousel opts={{ align: "center", loop: true }}>
// //         <CarouselContent className="-ml-1 border-red-300 border-2 h-full">
// //           {wallets.map((wallet: Wallet) => (
// //             <CarouselItem key={wallet._id} className="pl-1 md:basis-1 lg:basis-1/2 xl::basis-1/3 flex h-full">
// //               <div className="p-1 border-yellow-500 border-2">
// //                 <WalletCard wallet={wallet} transactions={transactions}/>
// //               </div>
// //             </CarouselItem>
// //           ))}
// //         </CarouselContent>
// //         <CarouselPrevious />
// //         <CarouselNext />
// //       </Carousel>
// //     </div>