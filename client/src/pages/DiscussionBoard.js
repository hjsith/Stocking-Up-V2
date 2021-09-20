import React from "react";
import NavBar from "../components/NavBar";
import UserProfileIcon from "../components/UserProfileIcon";
class DiscussionBoard extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {}

  render() {
    return (
      <>
        <NavBar />
        {this.props.match.params.id}
      </>
    );
  }
}

export default DiscussionBoard;
