import {
  Form,
  FormField,
  FormItem,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { DialogHeader, DialogFooter } from "@/components/ui/dialog";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useEffect, EffectCallback } from "react";
import { zodResolver } from "@hookform/resolvers/zod";

type EditWalletModalProps = {
  wallet: Wallet;
};

const formSchema = z.object({
  name: z.string()
    .min(3, {
      message: "Wallet name must be at least 3 characters long.",
    })
    .regex(/^[A-Za-z]+$/, {
      message: "Wallet name can consist only of letters.",
    }),
});

const EditWalletModal = ({ wallet }: EditWalletModalProps) => {
  const { name, _id: id } = wallet;
  const router = useRouter();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  useEffect((): ReturnType<EffectCallback> => {
    const unsubscribe = form.watch((values) => {
      form.trigger();
    });
    return unsubscribe.unsubscribe;
  }, [form]);

  
  const handleSubmit = async (values: { name: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
        }),
      });

      if (!response.ok) {
        console.error("Failed to change wallet name:", response.statusText);
        return;
      }

      router.refresh();

      return response.json();
    } catch (error) {
      console.error("Error while changing wallet name:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger>
        <DropdownMenuItem
          onSelect={(e) => {
            e.preventDefault();
          }}
        >
          Edit wallet
        </DropdownMenuItem>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(handleSubmit)}
            className="flex flex-col gap-2"
          >
            <DialogHeader>
              <DialogTitle>Update wallet title</DialogTitle>
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input {...field} type="text" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </DialogHeader>
            <DialogFooter className="sm:justify-start">
              {form.formState.errors.name ? (
                <Button  disabled variant="secondary">
                  Edit
                </Button>
                ) : (
                <DialogClose asChild>
                  <Button type="submit" variant="secondary">
                    Edit
                  </Button>
                </DialogClose>
                )
              }
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default EditWalletModal;
