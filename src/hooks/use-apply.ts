const useApply = (jobId: string) => {
  const actualApply = async () => {
    const devId = localStorage.getItem("justHireMeId");
    const url = process.env.REACT_APP_API_DATABASE_URL;
    const continueUrl = `/${jobId}/appliers.json`;
    try {
      const response = await fetch(url + continueUrl, {
        method: "POST",
        body: JSON.stringify({
          devId: devId,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        alert("Something went wrong");
      }
      console.log(response);
    } catch (error) {
      alert(error);
    }
  };
  return actualApply;
};

export default useApply;
