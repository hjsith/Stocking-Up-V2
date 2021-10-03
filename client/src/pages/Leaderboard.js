import React, { useState, useRef } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Leaderboard.scss";
import UserProfileIcon from "../components/UserProfileIcon";
/*
const LeaderboardTable = (props) => {
    const { Lresults } = props;
    const LresultsRef = useRef();
    <div className="Ltable">
        <table id="Lresults" ref={LresultsRef}>
        <tr>
            <th>
            <UserProfileIcon
            name={Lresults}
            colorNumber={1}
            company={false}
            size={50}
            />
            </th>
            <th>{Lresults.map((Lresult, index) => {
                return (
                    <th key={index}>
                        {Lresult}
                    </th>
                );})}
            </th>
        </tr>
        </table>  
    </div>
}
*/
const Leaderboard = () => {
const [investors, setInvestors] = useState([]);  
    {
    fetch("/api/allInvestors", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      res.json().then((body) => {
        setInvestors(body);
        console.log(investors)
      })
      
    })
  }

/*function Leaderboard() {
    const [Lresults, setresults] = useState([]);
    setresults(LeaderboardResults);
*/
    return (
        <div className="LeaderboardTitle">
        <NavBar />
        <h1 className="LeaderboadTitle">Leaderboard</h1>
    <div className="BackgroundPanel">
        <table className="TableRows">
          <tr className="TableHeadings">
            <th><b>User</b></th>
            <th><b>Ranking</b></th>
            <th><b>Net Worth</b></th>
          </tr>
          {investors.map((investor, index) => {
                return (
                    <tr>
                        <td key={index}>
                        {investor.Username}
                    </td>
                    <td key={index}>
                        {investor.InvestorRanking}
                    </td>
                    <td key={index}>
                        {investor.NetWorth}
                    </td>
                    </tr>
                );
          })}
        </table>
      </div>
      </div>
    );
}

export default Leaderboard;