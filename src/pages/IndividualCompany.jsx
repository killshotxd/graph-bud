import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const IndividualCompany = () => {
  const params = useParams();
  const id = params.id;

  const [company, setCompany] = useState();

  const fetchCompanyDetails = async () => {
    try {
      const data = await fetch(
        `https://talented-toad-bedclothes.cyclic.app/company/${id}`,
        {
          method: "GET",
        }
      );

      const res = await data.json();
      console.log(res);
      setCompany(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCompanyDetails();
  }, []);

  return (
    <div className="containerWrap min-h-screen flex justify-center items-center">
      {company ? (
        <>
          <div className="flex flex-col gap-4">
            <p>Company Name: {company?.name}</p>
            <p>Company Location: {company?.location}</p>
          </div>
        </>
      ) : (
        ""
      )}
    </div>
  );
};

export default IndividualCompany;
