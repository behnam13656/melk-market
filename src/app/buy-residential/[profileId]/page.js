import DetailsPage from "@/components/template/DetailsPage";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";
import { ObjectId } from "mongodb"; // 👈 Import ObjectId

async function ProfileDetails({ params }) {
  await connectDB();

  const { profileId } = await params;

  // ✅ Validate ObjectId — essential to prevent BSONError
  if (!ObjectId.isValid(profileId)) {
    return <h3>شناسه نامعتبر است</h3>;
    // Or use: notFound() from 'next/navigation' for 404 page
  }

  // ✅ Convert to ObjectId before querying
  const profile = await Profile.findOne({ _id: new ObjectId(profileId) });

  if (!profile) return <h3>مشکلی پیش آمده است</h3>;

  return <DetailsPage data={profile} />;
}

export default ProfileDetails;
export const generateMetadata = async ({ params }) => {
  const { profileId } = await params; // ✅ Await FIRST, then destructure

  await connectDB();

  // ✅ Validate ObjectId BEFORE querying
  if (!profileId || !ObjectId.isValid(profileId)) {
    return {
      title: "صفحه یافت نشد",
      description: "شناسه پروفایل نامعتبر است.",
    };
  }

  const profile = await Profile.findOne({ _id: new ObjectId(profileId) });

  if (!profile) {
    return {
      title: "پروفایل یافت نشد",
      description: "متاسفانه پروفایل مورد نظر وجود ندارد.",
    };
  }

  return {
    title: profile.title || "جزئیات پروفایل",
    description: profile.description || "مشاهده جزئیات پروفایل",
  };
};
