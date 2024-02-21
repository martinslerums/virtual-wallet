import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import RegisterForm from "./register";

const RegisterPage = async () => {
  const session = await getServerSession();

  if (session) {
    redirect("/overview");
  }

  return (
    <div className="flex justify-center items-center h-full ">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
