import TransactionList from "./TransactionList/TransactionList";
import WalletDetails from "./WalletDetails/WalletDetails";

const WalletDetailsPage = ({ params }: Params) => {
  return (
    <>
      <WalletDetails params={params} />
    </>
  );
};

export default WalletDetailsPage;
