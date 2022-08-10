import { offerObject } from "../store/offers-slice";

const useAddOffer = (addingOffer: offerObject) => {
  const employersId = localStorage.getItem("justHireMeId");
  const date = new Date();

  const addOffer = async () => {
    try {
      const response = await fetch(process.env.REACT_APP_API_DATABASE_URL+".json", {
        method: "POST",
        body: JSON.stringify({
          companyName: addingOffer.companyName,
          description: addingOffer.description,
          aboutUs: addingOffer.aboutUs,
          addedBy: employersId,
          companySize: addingOffer.companySize,
          expLevel: addingOffer.expLevel,
          mainLang: addingOffer.mainLang,
          requirements: addingOffer.requirements,
          jobPosition: addingOffer.jobPosition,
          location: addingOffer.location,
          logo: addingOffer.logo,
          techStack: addingOffer.techStack,
          date: {
            day: date.getDate(),
            month: date.getMonth()+1,
            year: date.getFullYear(),
          },
          fullyRemote: addingOffer.fullyRemote,
          employment: addingOffer.employment,
        }),
        headers: { "Content-Type": "application/json" },
      });

      if (response.ok) {
        console.log("poszło");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return addOffer;
};

export default useAddOffer;
