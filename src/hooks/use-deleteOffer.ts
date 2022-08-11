const useDeleteOffer = (offerId: string) => {
  const url = process.env.REACT_APP_API_DATABASE_URL;
  const wholeUrl = url + `/${offerId}.json`;
  const deletingOffer = async () => {
    try {
      await fetch(wholeUrl, {
        method: "DELETE",
      });
    } catch (error) { 
      console.log(error);
    }
  };
  return deletingOffer;
};

export default useDeleteOffer;
