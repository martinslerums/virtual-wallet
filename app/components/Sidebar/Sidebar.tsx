import Link from "next/link";
import styles from "./Sidebar.module.css"
import Modal from "../Modal/Modal";


const getWallets = async () => {
  const response = await fetch("http://localhost:3000/api/wallets", {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch blogs from route-handler");
  }

  return response.json();
}

const Sidebar = async () => {



  const wallets = await getWallets()

  return (  
    <nav className={styles.nav}>
      <Link href='/'>Overview</Link>
      
      My wallets
      {wallets && wallets.map((wallet: Wallet) => (
        <ul className={styles.nav_item} key={wallet._id}>
          <Link className={styles.link} href={`/wallet/${wallet._id}`}>
            <li>{wallet.name}</li>
          </Link>
        </ul>
      ))}

      <Link href='#'>Transactions</Link>      
      <Link href="?create=true">Create</Link>
    </nav>
  );
}
 
export default Sidebar;