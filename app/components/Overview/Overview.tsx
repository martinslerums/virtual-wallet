import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import WalletCard from "../WalletCard/WalletCard";

type CarouselProps = {
  wallets: Wallet [];
  transactions: Transaction [];
}


const Overview = ({transactions, wallets}: CarouselProps) => {


  return (
    <div className="w-full min-h-screen flex justify-center items-center p-36">
      <Carousel opts={{ align: "center", loop: true }}>

        <CarouselContent className="-ml-36 border-red-300 border-2 flex items-stretch">
          {wallets.map((wallet: Wallet) => (
            <CarouselItem key={wallet._id} className="pl-3.5 md:basis-1 lg:basis-1/2 xl:basis-1/2 border-slate-950 border-2">
              <div className="p-1 border-yellow-500 border-2">
                <WalletCard wallet={wallet} transactions={transactions}/>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <CarouselPrevious />
        <CarouselNext />

      </Carousel>
    </div>
  );
};

export default Overview;
