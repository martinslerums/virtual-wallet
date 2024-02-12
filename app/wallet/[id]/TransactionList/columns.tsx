"use client";

import { format } from 'date-fns';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { ColumnDef, Row } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from '@/components/ui/input';

const ActionsCell: React.FC<{ row: Row<Transaction> }> = ({ row }) => {
  const router = useRouter()

  const [fraudulentTransactions, setFraudulentTransactions] = useState<string[]>(() => {
    return JSON.parse(localStorage.getItem("fraudulentTransactions") || "[]");
  });
  
  const handleCheckbox = (id: string) => {
    setFraudulentTransactions((prevFraudulentTransactions) => {
      const isFraudulent = prevFraudulentTransactions.includes(id);
      let updatedRows;
  
      if (isFraudulent) {
        updatedRows = prevFraudulentTransactions.filter((rowId) => rowId !== id);
      } else {
        updatedRows = [...prevFraudulentTransactions, id];
      }
  
      // Update local storage data
      localStorage.setItem("fraudulentTransactions", JSON.stringify(updatedRows));
  
      return updatedRows;
    });
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wallets/${id}/transactions`, {
        method: "DELETE",
      });

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
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Actions</DropdownMenuLabel>
        <DropdownMenuItem onClick={() => handleDelete(row.original._id)}>
          Delete payment
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
        <DropdownMenuItem>View payment details</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
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
      return <div className="text-left font-medium max-w-[475px] w-full">{text.length > 50 ? `${text.slice(0, 50)}...` : text }</div>;
    },
  },
  {
    accessorKey: 'createdAt',
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}
        >
          Date
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => {
      const createdAt = row.getValue('createdAt');
      const formattedDate = format(createdAt as string, "dd-MM-yyyy HH:mm");
      return <div className="text-left font-medium">{formattedDate}</div>;
    },
  },
  {
    accessorKey: "type",
    header: "Type",
  },
  {
    id: "actions",
    cell: ActionsCell
  },
];
