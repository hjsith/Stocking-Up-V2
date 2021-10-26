import React, { useState, useContext } from "react";
import { Redirect } from "react-router-dom";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Leaderboard.scss";
import { UserContext } from "../components/UserContext";

const Leaderboard = () => {
  //DB connection
  const cont = useContext(UserContext);
  const [unauth, setunauth] = useState(false);
  const [investors, setInvestors] = useState([]); //create array investors using React useState
  {
    fetch("/api/allInvestors", {
      //HTTP get request for all investors/users on platform
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      if (res.status === 200) {
        res.json().then((body) => {
          setInvestors(body); //set investor array to be the get response
          console.log(investors); //log response for testing purposes
        });
      } else if (res.status === 401) {
        setunauth(true);
      }
    });
  }

  if (unauth || cont.user.name === "") {
    return (
      <Redirect
        to={{
          pathname: "/SignIn",
        }}
      />
    );
  }

  return (
    //front end
    <div className="LeaderboardTitle">
      <NavBar />
      <h1 className="LeaderboadTitle">Leaderboard</h1>
      <div className="BackgroundPanel">
        <table className="TableRows">
          <tr className="TableHeadings">
            <th>
              <b>User</b>
            </th>
            <th>
              <b>Ranking</b>
            </th>
            <th>
              <b>Net Worth</b>
            </th>
          </tr>
          {investors.map((investor, index) => {
            //map investor to the front end display- attributes from investor table used below include Username, Ranking, NetWorth
            return (
              <tr>
                <td key={index}>{investor.Username}</td>
                <td key={index}>{investor.InvestorRanking}</td>
                <td key={index}>{investor.NetWorth}</td>
              </tr>
            );
          })}
        </table>
      </div>
    </div>
  );
};

export default Leaderboard;
