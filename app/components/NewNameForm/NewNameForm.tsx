"use client"

import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { z } from "zod"

const formSchema = z.object({
  name: z.string().min(3, {
    message: "Wallet name must be at least 3 characters long.",
  })
})

type WalletNameProps = {
  wallet: Wallet
  className?: string
  isEditing: () => void
}

const NewWalletNameForm = ({wallet: { name, _id: id }, isEditing, className}: WalletNameProps) => {

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: name,
    },
  })

  const router = useRouter();

  const handleSubmit = async (values: { name: string }) => {
    try {
      const response = await fetch(`http://localhost:3000/api/wallets/${id}`, {
        method: "PATCH",
        body: JSON.stringify({
          name: values.name
        }),
      });
      
      if (!response.ok) {
        console.error("Failed to change wallet name:", response.statusText);
        return;
      }

      isEditing()
      router.refresh();

      return response.json();
    } catch (error) {

      console.error("Error while changing wallet name:", error);
    }
  };

  return ( 
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="flex flex-row gap-2" >
          <FormField control={form.control} name="name" render={({ field }) => {
              return ( 
                <FormItem>
                  <FormControl className="w-auto">
                    <Input {...field} type="text" className="text-4xl p-0 w-auto" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )
            }} 
          />
          <Button type="submit" size="icon" >Save</Button>
        </form>
      </Form>
    </div>
   );
}
 
export default NewWalletNameForm;