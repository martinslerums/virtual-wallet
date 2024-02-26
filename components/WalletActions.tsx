"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import EditWalletModal from "./EditWalletModal";
import DeleteWalletModal from "./DeleteWalletModal";

import { IoSettingsOutline } from "react-icons/io5";

type WalletActionsProps = {
  wallet: Wallet;
};

const WalletActions = ({ wallet }: WalletActionsProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="link">
          <IoSettingsOutline className="text-4xl font-bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <EditWalletModal wallet={wallet} />
        <DropdownMenuSeparator />
        <DeleteWalletModal id={wallet._id} />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default WalletActions;
