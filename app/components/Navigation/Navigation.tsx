import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
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
  const session = await getServerSession(authOptions);

  return ( 
    <div className="absolute">
      <Sidebar wallets={wallets} session={session} />
    </div>
   );
}
 
export default Navigation;