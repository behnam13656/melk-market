import BuyResidentialPage from "@/components/template/BuyResidentialPage";

async function BuyResidential({ searchParams }) {
  // await کردن searchParams قبل از استفاده
  const awaitedSearchParams = await searchParams;

  let data = { data: [] };

  try {
    const res = await fetch("http://localhost:3000/api/profile", {
      cache: "no-store", // یا "no-store" اگه داده لحظه‌ای میخوای
    });
    data = await res.json();
  } catch (err) {
    console.error(err);
    return <h3>مشکلی پیش آمده است</h3>;
  }

  let finalData = data.data;

  if (awaitedSearchParams.category) {
    finalData = finalData.filter(
      (i) => i.category === awaitedSearchParams.category
    );
  }

  return <BuyResidentialPage data={finalData} />;
}

export default BuyResidential;
