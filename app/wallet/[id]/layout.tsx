const WalletDetailsLayout = ({
  children,
  transactions,
  statistics,
}: {
  children: React.ReactNode;
  transactions: React.ReactNode;
  statistics: React.ReactNode;
}) => {
  return (
    <section className="max-w-full px-5 flex flex-col gap-2.5">
      <div className="w-full flex flex-col lg:flex-row gap-2.5 max-h-[300px]">
        <div className="flex flex-col gap-5 w-full">{children}</div>
        <div className="flex lg:flex-row justify-between gap-2.5 w-full">{statistics}</div>
      </div>
      <div className="flex gap-5 h-[297px]">
        {transactions}
      </div>
    </section>
  );
};

export default WalletDetailsLayout;
