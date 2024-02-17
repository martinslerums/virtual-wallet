import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import LoginForm from "./login";


const LoginPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/");
  }

  return <LoginForm />;
};

export default LoginPage;
