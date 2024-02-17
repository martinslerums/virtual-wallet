import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register";


const RegisterPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  };

  return  <RegisterForm />;
}
 
export default RegisterPage;