'use client'

import { useState } from "react";
import Link from "next/link";
import styles from "./CollapsibleNav.module.css"

type CollapsibleNav = {
  title: string
  wallets: Wallet []
  className: string
}

const CollapsibleNav = ({title, wallets, className}: CollapsibleNav) => {

  const [isCollapsed, setIsCollapsed] = useState(true)

  const toggleWallets = () => {
    setIsCollapsed(!isCollapsed);
  };

  
  return (
    <>
      <div className={className} onClick={toggleWallets}>
        {title}
      </div>
      {!isCollapsed && (
        <div className={styles.sidebar_item}>
          {wallets && wallets.map((wallet: Wallet) => (
            <div className={styles.sidebar_item} key={wallet._id}>
              <Link className={styles.sidebar_item} href={`/wallet/${wallet._id}`}>
                {wallet.name}
              </Link>
            </div>
          ))}
        </div>
      )}
    </>
  );
}
 
export default CollapsibleNav;