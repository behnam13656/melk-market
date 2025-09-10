import DashboardPage from "@/components/template/DashboardPage";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";

import { authOptions } from "../api/auth/[...nextauth]/route";
import User from "@/models/User";

async function Dashboard() {
  await connectDB();
  const session = await getServerSession(authOptions);
  const user = await User.findOne({ email: session.user.email });

  return (
    <DashboardPage
      email={user.email}
      createdAt={user.createdAt}
      Name={user.name}
      Lastname={user.lastname}
    />
  );
}

export default Dashboard;
