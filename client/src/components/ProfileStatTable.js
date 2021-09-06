import React from "react";
import "../assets/css/Profile.scss";
import ProfileStat from "./ProfileStat";

class ProfileStatTable extends React.Component {
  render() {
    return (
      <div className="ProfileStat">
        <table className="ProfileStatTable">
          <tr>
            <td>
              <ProfileStat title="Rank" value="#20" />
            </td>
            <td>
              <ProfileStat title="Net Worth" value="$130 Billion" />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat title="Difficulty" value="Easy" />{" "}
            </td>
            <td>
              <ProfileStat title="Title" value="Veteran" />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat title="Friends" value="243" />{" "}
            </td>
            <td>
              <ProfileStat title="Posts" value="51" />
            </td>
          </tr>
          <tr>
            <td>
              <ProfileStat title="Date Joined" value="01/01/2021" />{" "}
            </td>
            <td>
              <ProfileStat
                title="Days till next simulator wipe"
                value="122 Days"
              />
            </td>
          </tr>
        </table>
      </div>
    );
  }
}

export default ProfileStatTable;
