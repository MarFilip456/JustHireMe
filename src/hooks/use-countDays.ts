const useCountDays = (offerDate: {
  year: number;
  month: number;
  day: number;
}) => {
  const currDate = new Date();
  const helperDate = new Date(
    offerDate.year,
    offerDate.month - 1,
    offerDate.day
  );
  const difference =
    (currDate.getTime() - helperDate.getTime()) / 1000 / 3600 / 24;
  if (difference < 1) {
    return "New";
  } else if (difference < 31) {
    const dayNumber = Math.round(difference);

    return `${dayNumber} days ago`;
  } else {
    return "Over month ago";
  }
};

export default useCountDays;
