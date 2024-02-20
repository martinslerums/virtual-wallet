"use client";

import Link from "next/link";
import { useState } from "react";
import { Session } from "next-auth";
import { signOut } from "next-auth/react";

import { GiWallet } from "react-icons/gi";
import { GrOverview } from "react-icons/gr";
import { LuWallet, LuLogOut } from "react-icons/lu";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";

type SidebarProps = {
  wallets: Wallet[];
  session: Session | null;
};

const Navigation = ({ wallets, session }: SidebarProps) => {
  const [showNav, setShowNav] = useState(false);
  const [showSub, setShowSub] = useState(false);

  return (
    <nav
      className={`bg-darkpurple h-screen p-5 pt-8 ${
        showNav ? "w-60" : "w-40"
      } relative duration-300 h-scr`}
    >
      <BsArrowLeftShort
        className={`absolute cursor-pointer rounded-full -right-3 top-9 border text-3xl bg-white border-darkpurple text-darkpurple ${
          !showNav && "rotate-180"
        }`}
        onClick={() => setShowNav(!showNav)}
      />
      <div className="inline-flex duration-300 text-white items-center">
        <GiWallet
          className={`text-white text-6xl rounded cursor-pointer block float-left mr-2 duration-500 ${
            showNav && "rotate-[360deg]"
          }`}
        />
        {session && 
          <span className={`${!showNav && "scale-0"} origin-right duration-500 text-xl font-bold`}>
            {session.user?.username}
          </span>
        }
      </div>
      {session && (
        <div className="border flex flex-col h-[90%] justify-between">
          <ul className="pt-16">
            <li className="sidebar-li ">
              <Link href="/overview" className="flex gap-2 items-center">
                <GrOverview className="text-5xl shaking" />
                <span
                  className={`${
                    !showNav && "scale-0"
                  } origin-right duration-500 text-lg`}
                >
                  Overview
                </span>
              </Link>
            </li>
            <li className="sidebar-li duration-300 ">
              <div
                className="flex cursor-pointer gap-2 items-center"
                onClick={() => setShowSub(!showSub)}
              >
                <LuWallet className="text-5xl shaking" />
                <span
                  className={`${
                    !showNav && "scale-0"
                  } origin-right duration-500 text-lg`}
                >
                  Wallets
                </span>
                <BsChevronDown
                  className={`${!showNav && "scale-0"} ${
                    showSub && "rotate-180 duration-300"
                  } ${!showSub && "duration-300"}`}
                />
              </div>
            </li>
            {showSub && (
              <ul className="top-full left-0 text-white duration-300">
                {wallets &&
                  wallets.map((wallet) => (
                    <li
                      key={wallet._id}
                      className={`${
                        showNav ? "p-2 pl-10 mt-1 list-item" : "p-2 pl-3.5 mt-1"
                      }`}
                    >
                      <Link href={`/wallet/${wallet._id}`}>
                        {showNav ? (
                          <span>{wallet.name}</span>
                        ) : (
                          <Avatar className="squared bg-transparent border rounded h-5 w-5 list-item">
                            <AvatarFallback className="bg-transparent">
                              {wallet.name.split("")[0]}
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </Link>
                    </li>
                  ))}
              </ul>
            )}
            <CreateWalletModal showNav={showNav} />
          </ul>
          <div className="sidebar-li duration-300 items-center">
            <LuLogOut className="text-5xl text-white cursor-pointer" onClick={() => signOut()}/>
            <span className={`${!showNav && "scale-0"} origin-right duration-500`}>
              Leave
            </span>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navigation;
