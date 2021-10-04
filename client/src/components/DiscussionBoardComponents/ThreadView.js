import React from "react";
import "../../assets/css/DiscussionBoardSearch.scss";
import Arrow from "../../assets/images/RightArrow.png";

class ThreadView extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="threadView">
        <div className="threadViewTitle">{this.props.title}</div>
        <div className="threadViewDescription">{this.props.description}</div>
        <div className="threadViewListingID">
          Company Code: {this.props.listingID}
        </div>
        <a href={"/DiscussionBoard/" + this.props.listingID}>
          <img src={Arrow} className="ArrowIcon" alt="Arrow Icon" />
        </a>
      </div>
    );
  }
}

export default ThreadView;
