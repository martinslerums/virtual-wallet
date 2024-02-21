import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

const Home = async () => {

  const session = await getServerSession();

  if (session) {
    redirect("/overview");
  }

  if (!session) {
    redirect("/login");
  }

  return
};

export default Home;
 