"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import { z } from "zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Wallet name must be at least 3 characters long.",
  }),
});

type WalletNameProps = {
  wallet: Wallet;
  className?: string;
  isEditing?: () => void;
};

const NewWalletNameForm = ({wallet: { name, _id: id }, isEditing, className }: WalletNameProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  });

  const router = useRouter();

  const handleSubmit = async (values: { name: string }) => {
    try {

      const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name,
        }),
      });

      if (!response.ok) {
        return response.statusText;
      }

      router.refresh();

      return response.json();
    } catch (error) {

      console.error("Error while changing wallet name:", error);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="flex gap-2"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormControl>
                  <Input
                    {...field}
                    type="text"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            );
          }}
        />
        <Button type="submit" size="icon">
          Save
        </Button>
      </form>
    </Form>
  );
};

export default NewWalletNameForm;
