"use client"

import { format } from "date-fns";
import { useLocalStorage } from "@uidotdev/usehooks";
import { useRouter } from "next/navigation";
import { useContext, useEffect } from "react";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FraudulentTransactionsContext, useFraudulentTransactionsContext } from "@/hooks/useFraudulentContext/FraudulentTransactionsContext";
import { CiWarning } from "react-icons/ci";
import { CgCornerRightUp } from "react-icons/cg";
import { CgCornerRightDown } from "react-icons/cg";


const ActionsCell: React.FC<{ row: Row<Transaction> }> = ({ row }) => {

  const router = useRouter();
  
  const { fraudulentTransactions, setFraudulentTransactions } = useContext(
    FraudulentTransactionsContext
  )!;
  
  const [localFraudulentTransactions, setLocalFraudulentTransactions] =
    useLocalStorage<string[]>("fraudulentTransactions", []);

  useEffect(() => {
    setFraudulentTransactions(localFraudulentTransactions);
  }, []);

  const handleCheckbox = (id: string) => {
    const isFraudulent = fraudulentTransactions.includes(id);

    const updatedRows = isFraudulent
      ? fraudulentTransactions.filter((rowId: string) => rowId !== id)
      : [...fraudulentTransactions, id];

    setFraudulentTransactions(updatedRows);
    setLocalFraudulentTransactions(updatedRows);
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(
        `http://localhost:3000/api/wallets/${id}/transactions`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          `Failed to delete payment with ID: ${id}. Status: ${response.status}`
        );
      }

      router.refresh();
    } catch (error) {
      const errorObject = error as Error;
      console.error("Error deleting payment:", errorObject.message);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleDelete(row.original._id)} className="cursor-pointer">
          Delete transaction
        </DropdownMenuItem>
        <DropdownMenuItem>
          <label className="flex items-center space-x-2 cursor-pointer">
            <Input
              type="checkbox"
              checked={fraudulentTransactions.includes(row.original._id)}
              onChange={() => handleCheckbox(row.original._id)}
            />
            <span>Mark as fraudulent</span>
          </label>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem>View transaction details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

const TypeCell: React.FC<{ row: Row<Transaction> }> = ({ row }) => {
  const type: string = row.getValue("type");
  const { fraudulentTransactions } = useFraudulentTransactionsContext();
  const isFraudulent = fraudulentTransactions.includes(row.original._id);

  return (
  <>
    { isFraudulent ? (
      <div className="flex gap-2 items-baseline">{ type }
        <CiWarning className="text-sm"/>
      </div>
    ) : ( 
      type === "Deposit" ? (
        <div className="flex gap-2 items-baseline">
          { type }<CgCornerRightUp className="text-sm"/>
        </div>
      ) : (
        <div  className="flex gap-2 items-baseline">
          { type } <CgCornerRightDown className="text-sm"/>
        </div>
      )
    )}
  </>
  )
};

export const columns: ColumnDef<Transaction>[] = [
  {
    accessorKey: "amount",
    header: () => <div className="text-left">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-EU", {
        style: "currency",
        currency: "EUR",
      }).format(amount);

      return <div className="text-left font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => {
      const text: string = row.getValue("description");
      return (
        <div className="text-left font-medium max-w-[475px] w-full">
          {text.length > 50 ? `${text.slice(0, 50)}...` : text}
        </div>
      );
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue("createdAt");
      const formattedDate = format(createdAt as string, "HH:mm dd.MM.yyyy");
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
    cell: TypeCell,
  },
  {
    id: "actions",
    header: "Actions",
    cell: ActionsCell,
  },
];
