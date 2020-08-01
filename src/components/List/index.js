import React from "react";
import "./style.css";

export const List = ({ usersArray }) =>
  usersArray.map((item, index) => {
    const color = listColor(item.totalUsers);
    return (
      <div key={index} className={["month-item", color].join(" ")}>
        <h2 className="month-item-title">{`${item.month}: ${item.totalUsers} users`}</h2>
        <ul className="users-list">
          <div className="users-list-title">
            <span>{item.month}</span>
            <span>{item.totalUsers + " - users"}</span>
          </div>
          {item.users.map((user, userIndex) => (
            <li key={user.id} className="users-list-item">
              <span className="users-list-data">
                {userIndex + 1 + ". " + user.firstName + " " + user.lastName}
              </span>
              <span className="users-list-data">
                {user.dob.slice(0, 10).split("-").reverse().join(".")}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  });

const listColor = (number) => {
  switch (true) {
    case number >= 0 && number <= 2:
      return "grey";
    case number >= 3 && number <= 6:
      return "blue";
    case number >= 7 && number <= 10:
      return "green";
    case number >= 11:
      return "red";
    default:
      return false;
  }
};
