import Sidebar from "../Sidebar/Sidebar";

const getWallets = async () => {
  const response = await fetch("http://localhost:3000/api/wallets", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs from route-handler");
  }

  return response.json();
}

const Navigation = async () => {

  const wallets = await getWallets()

  return ( 
    <div className="absolute">
      <Sidebar wallets={wallets} />
    </div>
   );
}
 
export default Navigation;