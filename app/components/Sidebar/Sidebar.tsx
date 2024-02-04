'use client'

import { GiHamburgerMenu } from "react-icons/gi";
import { useState } from "react";
import Navbar from "../Navbar/Navbar";
import styles from "./Sidebar.module.css"

type SidebarProps = {
  wallets: Wallet[]
}

const Sidebar = ({wallets}:SidebarProps) => {

  const [showNav, setShowNav] = useState(false)

  return ( 
    <div className={styles.sidebar_wrapper}>
      <div className={styles.header}>
        <GiHamburgerMenu onClick={() => setShowNav(!showNav)} />
      </div>
      <Navbar wallets={wallets} show={showNav}/>
    </div>
   );
}
 
export default Sidebar;