import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./login";


const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/overview");
  }

  return (
    <div className="flex justify-center items-center h-full ">
      <LoginForm />
    </div>
   )
};

export default LoginPage;
