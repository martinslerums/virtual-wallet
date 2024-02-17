import { Skeleton } from "@/components/ui/skeleton";

const Transactions =  async () => {


  return ( 
        <div className="flex items-center space-x-4">
            <Skeleton className="h-[125px] w-[250px] rounded-xl">Loading transactions...</Skeleton>
        </div>
   );
}
 
export default Transactions;