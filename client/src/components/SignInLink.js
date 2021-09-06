import React from "react";
import "../assets/css/SignIn.scss";
class SignInLink extends React.Component {
  render() {
    return (
      <>
        <div className="NoAccount">
          <a href={this.props.link}>{this.props.message} </a>
        </div>
      </>
    );
  }
}

export default SignInLink;
