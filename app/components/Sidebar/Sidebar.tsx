import { getServerSession } from "next-auth";
import { headers } from "next/headers";
import Navigation from "../Navigation/Navigation";
import { authOptions } from "@/libs/services/authoptions";

const getWallets = async () => {
  try { 

    const response = await fetch("http://localhost:3000/api/wallets", {
      cache: "no-store",
      headers: headers()
    });

    if (!response.ok) {
      throw new Error("Failed to fetch wallets from route-handler");
    }

    return response.json();
  } catch (error) { 

    console.log(error)
  }
 
}

const Sidebar = async () => {

  const wallets = await getWallets()
  const session = await getServerSession(authOptions);

  return ( 
    <div className="absolute">
      <Navigation wallets={wallets} session={session} />
    </div>
   );
}
 
export default Sidebar;