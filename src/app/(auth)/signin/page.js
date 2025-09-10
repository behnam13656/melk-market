import SignIn from "@/components/template/SinginPage";
import { getServerSession } from "next-auth";
import { authOptions } from "../../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";

async function Signin() {
  const session = await getServerSession(authOptions);
  if (session) redirect("/");
  return <SignIn />;
}

export default Signin;
