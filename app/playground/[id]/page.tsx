

// const getWallet = async (id: string) => {
//   const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
//     cache: "no-store",
//   });

//   if (!response.ok) {
//     throw new Error(
//       `Failed to fetch wallet with ID: ${id}. Status: ${response.status}`
//     );
//   }

//   return response.json();
// };

// const getTransactions = async (id: string) => {
//   const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
//       cache: "no-store",
//     });

//   if (!response.ok) {
//     throw new Error(`Failed to fetch transactions for wallet with ID: ${id}. Status: ${response.status}`);
//   }

//   return response.json();
// };

const WalletDetailsPage = ({ params: { id } }: Params) => {

  // const { name, balance, _id: id, currency } = wallet;
  // const [editMode, setEditMode] = useState(false);

  // const isEditing = () => {
  //   setEditMode(false);
  // };

  return (
    <section className="flex flex-col py-2.5 pl-36 gap-2.5 border">
    {/* <div className="flex gap-5 p-2.5 justify-between border">
      <div className="flex flex-col gap-2 w-full">
        {editMode ? (
          <div className="flex p-2 w-auto">
            <NewWalletNameForm wallet={wallet} isEditing={isEditing} />
          </div>
        ) : (
          <div className="flex py-2 w-auto">
            <h1 className="text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">
              {name}
            </h1>

            <button onClick={() => setEditMode(true)}>
              <CiEdit className="text-4xl sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl" />
            </button>
          </div>
        )}

        <div className="flex flex-col p-2 max-w-sm max-h-36 w-full h-full gap-2.5 rounded-md shadow-md">
          <p className="flex justify-start text-xl sm:text-sm md:text-base lg:text-lg xl:text-xl">
            Wallet balance:
          </p>
          <div className="flex justify-center align-center">
            <h1 className="text-5xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold">
              {currency === "EUR" ? 
                new Intl.NumberFormat("en-EU", {
                  style: "currency",
                  currency: "EUR",
                }).format(balance)
              : new Intl.NumberFormat("en-US", {
                  style: "currency",
                  currency: "USD",
                }).format(balance)
              }
            </h1>
          </div>
        </div>
      </div>
    </div> */}
  </section>
  );
};

export default WalletDetailsPage;
