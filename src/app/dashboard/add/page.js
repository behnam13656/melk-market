"use client"
import AddProfilePage from "@/components/template/AddProfilePage";
import { useState } from "react";

function AddProfile() {
    
  const [profileData, setProfileData] = useState({
    title: "",
    description: "",
    location: "",
    phone: "",
    price: "",
    realState: "",
    constructionDate: new Date(),
    category: "",
    rules: [],
    amenities: [],
  });
  return <AddProfilePage />;
}

export default AddProfile;
