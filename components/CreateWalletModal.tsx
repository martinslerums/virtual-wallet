"use client";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { MdOutlineAddBox } from "react-icons/md";
import { useEffect, EffectCallback } from "react";

const formSchema = z.object({
  name: z
    .string()
    .min(3, {
      message: "Description must be at least 3 characters long.",
    })
    .regex(/^[A-Za-z]+$/, {
      message: "Wallet name can consist only of letters.",
    }),
  currency: z.string().min(3, {
    message: "Select a currency for your wallet.",
  }),
});

type FormValues = z.infer<typeof formSchema>;

type CreateWalletModalProps = {
  showNav: boolean;
};

const CreateWalletModal = ({ showNav }: CreateWalletModalProps) => {
  const router = useRouter();

  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
    },
  });

  useEffect((): ReturnType<EffectCallback> => {
    const unsubscribe = form.watch((values) => {
      form.trigger();
    });
    return unsubscribe.unsubscribe;
  }, [form]);

  const onSubmit = async (values: FormValues) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wallets/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        console.error("Failed to create a wallet:", response.statusText);
        return;
      }

      router.refresh();
    } catch (error) {
      console.error("Error while creating a wallet:", error);
    }
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <li className="sidebar-li cursor-pointer items-center">
          <MdOutlineAddBox className="text-5xl shaking" />
          <span
            className={`${
              !showNav && "scale-0"
            } origin-right duration-500 text-lg`}
          >
            Create
          </span>
        </li>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl">Create a wallet</DialogTitle>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormControl>
                      <Input
                        required
                        {...field}
                        placeholder="Wallet name"
                        type="text"
                        className="w-full h-full rounded-md p-2 focus:outline-none text-sm"
                      />
                    </FormControl>
                    <div className="w-full h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />
            <FormField
              control={form.control}
              name="currency"
              render={({ field }) => {
                return (
                  <FormItem>
                    <Select onValueChange={field.onChange} required>
                      <FormControl>
                        <SelectTrigger className="w-full h-full rounded-md p-2 focus:outline-none text-sm">
                          <SelectValue placeholder="Wallet currency" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="EUR">EUR</SelectItem>
                        <SelectItem value="USD">USD</SelectItem>
                      </SelectContent>
                    </Select>
                    <div className="w-full h-6">
                      <FormMessage />
                    </div>
                  </FormItem>
                );
              }}
            />

            <DialogFooter className="mt-10">
              {form.formState.errors.name ? (
                <Button
                  disabled
                  variant="secondary"
                  className="w-full h-full border-none outline-none rounded-md p-2 text-sm text-darkgray font-bold"
                >
                  Create
                </Button>
              ) : (
                <DialogClose asChild>
                  <Button
                    type="submit"
                    variant="secondary"
                    className="w-full h-full border-none outline-none rounded-md p-2 text-sm text-darkgray font-bold"
                  >
                    Create
                  </Button>
                </DialogClose>
              )}
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateWalletModal;
