'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import Form from "../Form/Form";
import Input from "../Input/Input";
import Select from "../Select/Select";
import Button from "../Button/Button";

const initialNewWalletValues = {
  name: '',
  currency: '',
}

const CreateForm = () => {

  const [newWallet, setNewWallet] = useState(initialNewWalletValues)

  const handleBlogAdd = async () => {
    const newBlog = await fetch(`http://localhost:3000/api/wallets/`,
      {
        method: "POST",
        body: JSON.stringify(newWallet),
      }
    ); 

    await newBlog.json(); 
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setNewWallet({
      ...newWallet,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <Form onSubmit={handleBlogAdd}>
      <Input 
        type="text"
        name="name"
        value={newWallet.name} 
        onChange={handleInputChange}
        placeholder="Enter wallet name"
        required
      />
      <Select 
        name="currency" 
        value={newWallet.currency} 
        onChange={handleInputChange} 
        required
        options={{"": "","EUR": "Euro", "USD": "Dollars"}} 
      />
      <Button type="submit" label="Create" />
    </Form>
  )
}
 
export default CreateForm;