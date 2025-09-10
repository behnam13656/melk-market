import AddProfilePage from "@/components/template/AddProfilePage";
import Profile from "@/models/Profile";
import connectDB from "@/utils/connectDB";

async function Edit({params:{profileId}}) {
  await connectDB()
  const profile = await Profile.findOne({_id:profileId})
  if(!profile)return <h3>مشکلی پیش آمده آست</h3>
  return <AddProfilePage data={JSON.parse(JSON.stringify(profile))}/>
}

export default Edit;
