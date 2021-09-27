import React from "react";
import "../assets/css/MarketsOverview.scss";
import NavBar from "../components/NavBar";
import WhiteLine from "../components/WhiteLine";

import Gains from "../components/MarketsOverviewComponents/Gains";
import Declines from "../components/MarketsOverviewComponents/Declines";
import AsxPrice from "../components/MarketsOverviewComponents/AsxPrice";
import GainsPanel from "../components/MarketsOverviewComponents/GainsPanel";
import TitlePanel from "../components/MarketsOverviewComponents/TitlePanel";

class MarketsOverview extends React.Component {
  render() {
    return (
      <div>
        <NavBar />

        <div className="PanelBackground1">
          {""}
          <Gains />
          <WhiteLine />
          <Declines />
        </div>

        <div className="PanelBackground2">
          {""}
          <AsxPrice />
        </div>
      </div>
    );
  }
}

export default MarketsOverview;
