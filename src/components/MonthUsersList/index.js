import React, { useState, useEffect } from "react";
import { List } from "../";
export const MonthUsersList = () => {
  const [usersArray, setUsersArray] = useState(false);

  useEffect(() => {
    fetch("https://yalantis-react-school-api.yalantis.com/api/task0/users")
      .then((response) => response.json())
      .then((response) => setUsersArray(getFilterList(response)));
  }, []);
  return usersArray ? <List usersArray={usersArray} /> : null;
};

const getFilterList = (array) => {
  const sortedArray = array.sort(
    (a, b) => new Date(a.dob).getMonth() - new Date(b.dob).getMonth()
  );
  return filterByMonth(sortedArray);
};

const filterByMonth = (entryArray, resultArray = []) => {
  if (entryArray.length) {
    const filterArray = entryArray.filter(
      (item) =>
        new Date(entryArray[0].dob).getMonth() === new Date(item.dob).getMonth()
    );
    const totalUsers = filterArray.length;
    // slice entry array to repeat current function with next values
    const sliceArray = entryArray.slice(totalUsers, entryArray.length);
    const userMonth = new Date(entryArray[0].dob).toLocaleString("en", {
      month: "long",
    });
    const monthList = {
      month: userMonth,
      totalUsers: totalUsers,
      users: filterArray,
    };
    resultArray.push(monthList);
    return filterByMonth(sliceArray, resultArray);
  } else {
    return resultArray;
  }
};
