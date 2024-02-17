"use client";

import Link from "next/link";
import { useState } from "react";

import { GiWallet } from "react-icons/gi";
import { LuWallet } from "react-icons/lu";
import { GrOverview } from "react-icons/gr";
import { MdOutlineAddBox } from "react-icons/md";
import { BsArrowLeftShort, BsChevronDown } from "react-icons/bs";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import CreateWalletModal from "../CreateWalletModal/CreateWalletModal";
import { Button } from "@/components/ui/button";
import { signOut } from "next-auth/react";
import { Session } from "next-auth";
import { Span } from "next/dist/trace";

type SidebarProps = {
  wallets: Wallet[];
  session: Session | null;
};

const Sidebar = ({ wallets, session }: SidebarProps) => {
  const [showNav, setShowNav] = useState(false);
  const [showSub, setShowSub] = useState(false);

  console.log("is session?", session)

  return (
    <nav
      className={`bg-darkpurple h-screen p-5 pt-8 ${
        showNav ? "w-56" : "w-36"
      } relative duration-300`}
    >
      <BsArrowLeftShort
        className={`absolute cursor-pointer rounded-full -right-3 top-9 border text-3xl bg-white border-darkpurple text-darkpurple ${
          !showNav && "rotate-180"
        }`}
        onClick={() => setShowNav(!showNav)}
      />
      <div className="inline-flex">
        <GiWallet
          className={`text-white text-4xl rounded cursor-pointer block float-left mr-2 duration-500 ${
            showNav && "rotate-[360deg]"
          }`}
        />
        <h1
          className={`text-white origin-right font-medium text-2xl duration-500 ${
            !showNav && "scale-0"
          }`}
        >
          {session ? (
            <span className="text-xs">{`Logged in as ${session.user?.username}`}</span>
          ) : (
            <span className="text-xs">Welcome guest</span>
          )}
        </h1>
      </div>
      {session ? (
        <>
          <ul className="pt-16">
            <li className="sidebar-li">
              <Link href="/" className="flex gap-2">
                <GrOverview className="text-3xl shaking" />
                <span
                  className={`${
                    !showNav && "scale-0"
                  } origin-right duration-500`}
                >
                  Overview
                </span>
              </Link>
            </li>

            <li className="sidebar-li duration-300">
              <div
                className="flex cursor-pointer gap-2"
                onClick={() => setShowSub(!showSub)}
              >
                <LuWallet className="text-3xl shaking" />
                <span
                  className={`${
                    !showNav && "scale-0"
                  } origin-right duration-500`}
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
          <Button onClick={() => signOut()}>Logout</Button>
        </>
      ) : (
        <>
          <div className="flex flex-col gap-2">
            <Link href="/login">Login</Link>
            <span className="text-xs">Does not have account?</span>
            <Link href="/register">Register</Link>
          </div>
        </>
      )}
    </nav>
  );
};

export default Sidebar;
