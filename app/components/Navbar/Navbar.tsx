import Link from "next/link";
import CollapsibleNav from "../CollapsibleNav/CollapsibleNav";
import { IoIosCreate } from "react-icons/io";
import { GrTransaction } from "react-icons/gr";
import { GrOverview } from "react-icons/gr";
import { LuWallet } from "react-icons/lu";
import styles from "./Navbar.module.css"

type NavbarProps = {
  show: boolean 
  wallets: Wallet []
}

const Navbar = ({show, wallets}: NavbarProps) => {

  return ( 
    <nav className={ show ? `${styles.sidebar} ${styles.active}` : styles.sidebar}>
      
      {/* <h1 className={styles.logo}>
        <a href="#" className={styles.a}>Terence <span className={styles.span}>Devine</span></a>
      </h1> */}
      
      <ul className={styles.list}>
        <li className={styles.list_item}>
          <GrOverview/>
          <Link className={styles.sidebar_item} href='/'>Overview</Link>
        </li>
        <li className={styles.list_item}>
          <LuWallet/>
          <CollapsibleNav wallets={wallets} title="Wallets" className={styles.sidebar_item} />
        </li>
        <li className={styles.list_item}>
          <GrTransaction/>
          <Link className={styles.sidebar_item} href='#'>Tra</Link>   
        </li>
        <li className={styles.list_item}>
          <IoIosCreate/>
          <Link className={styles.sidebar_item} href="?create=true">Create</Link>
        </li>
      </ul>
    </nav>
 
   );
}
 
export default Navbar;