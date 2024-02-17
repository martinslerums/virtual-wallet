
type RootLayoutProps = {
  children:  React.ReactNode;
  transactions:  React.ReactNode
  statistics: React.ReactNode
};

const WalletDetailsLayout = ({ children, transactions ,statistics }: RootLayoutProps) => {

  return (
    <section className="py-8 px-5 flex flex-col">
      <div>{children} </div> 
      <div> {statistics}</div> 
      <div> {transactions}</div> 
    </section>
  );
};

export default WalletDetailsLayout;
