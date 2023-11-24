/**
 * @function validateSearch
 * @param {string} source
 * @param {string} dest
 * @param {string} deptDate
 * @param {string} returnDate
 * @param {string} selectTrip
 * @description validate search criteria
 */
const validateSearch = (source, dest, deptDate, returnDate, selectTrip) => {
  let flag = true;

  if (selectTrip?.toUpperCase() === "ONE") {
    flag = source?.length === 0 || dest?.length === 0 || deptDate?.length === 0;
  } else {
    flag =
      source?.length === 0 ||
      dest?.length === 0 ||
      deptDate?.length === 0 ||
      returnDate?.length === 0;
  }

  return flag;
};

/**
 * @function thousandSeparator
 * @param {int} x
 * @description Thosand Separator
 */
const thousandSeparator = (x) => {
  return x.toString().replace(/\B(?<!\.\d*)(?=(\d{3})+(?!\d))/g, ",");
};

/**
 * @function filterBySourceDest
 * @param {object} payload
 * @param {array} response
 * @description filter flight list by source and destination
 */
const filterBySourceDest = (payload, response) => {
  let resultArr = [];

  let tempArr = [...response];
  const sourceCity = payload?.source;
  const destCity = payload?.destination;

  resultArr = tempArr.filter(
    (val) =>
      val?.departure?.toLowerCase() === sourceCity?.toLowerCase() &&
      val?.arrival?.toLowerCase() === destCity?.toLowerCase()
  );

  return resultArr;
};

export { validateSearch, thousandSeparator, filterBySourceDest };
