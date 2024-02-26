import WalletActions from "@/components/WalletActions";

const getWallet = async (id: string) => {
  const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(
      `Failed to fetch wallet with ID: ${id}. Status: ${response.status}`
    );
  }

  return response.json();
};

const WalletDetailsPage = async ({ params: { id } }: Params) => {
  const wallet = await getWallet(id);

  const { name, balance, currency } = wallet;

  return (
    <>
      <div className="flex py-2 justify-between items-center">
        <h1 className="text-6xl sm:text-xl md:text-2xl lg:text-3xl xl:text-5xl font-bold underline">
          {name}
        </h1>
        <WalletActions wallet={wallet} />
      </div>
      <div className="flex flex-col pb-5 pt-2 px-2.5 w-full gap-2.5 rounded-md">
        <p className="flex justify-start text-xl sm:text-sm md:text-base lg:text-lg xl:text-xl">
          Wallet balance
        </p>
        <div className="flex justify-center align-center">
          <h1 className="text-4xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
            {currency === "EUR"
              ? new Intl.NumberFormat("en-EU", {
                  style: "currency",
                  currency: "EUR",
                }).format(balance)
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(balance)}
          </h1>
        </div>
      </div>
    </>
  );
};

export default WalletDetailsPage;
