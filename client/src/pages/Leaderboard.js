import React from "react";
import NavBar from "../components/NavBar";
import LeaderboardTable from "../components/LeaderboardComponents/LeaderboardTable";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/Leaderboard.scss";

class Leaderboard extends React.Component {
    render() {
        return (
            <div className="LeaderboardTitle">
                <NavBar />
                <h1 className="LeaderboadTitle">Leaderboard</h1>
            <div className="BackgroundPanel">
                <LeaderboardTable />
            </div>
            </div>
    )}}

export default Leaderboard;