import DashboardSidebar from "@/components/layout/DashboardSidebar";
import User from "@/models/User";
import connectDB from "@/utils/connectDB";
import { getServerSession } from "next-auth";
import React from "react";
import { authOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import AdminPage from "@/components/template/AdminPage";
import Profile from "@/models/Profile";
export const metadata = {
  title: "پنل ادمین | ملک مارکت",
};
async function Admin() {
  await connectDB();
  const session = await getServerSession(authOptions);
  if (!session) redirect("/signin");

  const user = await User.findOne({ email: session.user.email });
  if (user.role !== "ADMIN") redirect("/dashboard");
  

  const profiles = await Profile.find({ published: false });
  return (
    <DashboardSidebar role={user.email} email={user.email}>
      <AdminPage profiles={profiles} />
    </DashboardSidebar>
  );
}

export default Admin;
