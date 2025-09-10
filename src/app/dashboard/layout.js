import DashboardSidebar from "@/components/layout/DashboardSidebar";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import connectDB from "@/utils/connectDB";
import User from "@/models/User";
export const metadata = {
  title: "پنل کاربری | ملک مارکت",
};
async function dashboardLayout({ children }) {
  const sesstion = await getServerSession(authOptions);
  if (!sesstion) redirect("/signin");

  await connectDB();
  const user = await User.findOne({ email: sesstion.user.email });
  return (
    <DashboardSidebar role={user.role} email={user.email}>
      {children}
    </DashboardSidebar>
  );
}

export default dashboardLayout;
