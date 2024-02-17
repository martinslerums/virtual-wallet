"use client"

import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import LineChart from "@/app/components/LineChart/LineChart";
import TransactionCalendar from "@/app/components/TransactionCalendar/TransactionCalendar";

type WalletStatisticsProps = {
  transactions: Transaction [];
}

const WalletStatistics = ({ transactions }: WalletStatisticsProps) => {
  return ( 
    <div>
        <div className="w-full">
          <AspectRatio ratio={16 / 9}>
            <LineChart transactions={transactions} />
          </AspectRatio>
        </div>
        <div>
          <TransactionCalendar transactions={transactions} />
        </div>
    </div>
   );
}
 
export default WalletStatistics;