"use client"

import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  amount: z.string().min(1, {
    message: "Please enter amount.",
  }),
  description: z.string().min(3, {
    message: "Description must be at least 3 characters long.",
  })
})

type TransactionFormProps = {
  wallet_id: string
}

const NewTransactionForm = ({wallet_id}: TransactionFormProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: "",
      description: "",
    },
  })

  const router = useRouter();

  const handleSubmit = async (values: { amount: string; description: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wallets/${wallet_id}/transactions`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          amount: parseFloat(values.amount),
          description: values.description,
        }),
      });
      
      if (!response.ok) {
        console.error("Failed to add transaction:", response.statusText);
        return;
      }

      form.reset();
      router.refresh();

    } catch (error) {
      console.error("Error while adding transaction:", error);
    }
  };

  return ( 
   <div className="flex h-full w-full">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <FormField control={form.control} name="amount" render={({ field }) => {
                return <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Amount" type="number" className="flex"/>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              }} 
            />
            <FormField control={form.control} name="description" render={({ field }) => {
                return <FormItem>
                  <FormControl>
                    <Textarea {...field} placeholder="Transaction descriptiuon" className="flex grow"/>
                  </FormControl>
                  <FormMessage className="text-wrap"/>
                </FormItem>
              }} 
            />
          </div>
          <Button type="submit" variant="outline" className="flex">Create</Button>
        </form>
      </Form>
   </div>
   );
}
 
export default NewTransactionForm;