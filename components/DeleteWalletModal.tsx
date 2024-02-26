import { DialogHeader, DialogFooter, DialogDescription } from "@/components/ui/dialog";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";

type DeleteWalletModalProps = {
  id: string;
}

const DeleteWalletModal = ({id}: DeleteWalletModalProps) => {

  const router = useRouter();

  const handleDelete = async (id: string) => {
    const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error(`Failed to delete data: ${response.status}`);
    }

    router.push("/")
    router.refresh()
    
    return response.json();
  };

  return ( 
    <Dialog>
    <DialogTrigger>
      <DropdownMenuItem onSelect={(e) => e.preventDefault()}>
        Delete wallet
      </DropdownMenuItem>
    </DialogTrigger>
    <DialogContent>
      <DialogHeader>
        <DialogTitle>Are you absolutely sure?</DialogTitle>
        <DialogDescription>
          This action cannot be undone. This will permanently delete your
          wallet and remove your data from our database.
        </DialogDescription>
      </DialogHeader>
        <DialogFooter className="sm:justify-start">
          <DialogClose asChild>
            <div>
              <Button type="button" variant="secondary" onClick={() => handleDelete(id)}>
                Delete
              </Button>
              <Button type="button" variant="secondary">
                Cancel
              </Button>
            </div>
          </DialogClose>
        </DialogFooter>
    </DialogContent>
  </Dialog>

   );
}
 
export default DeleteWalletModal;