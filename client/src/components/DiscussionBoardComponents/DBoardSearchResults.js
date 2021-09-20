import React from "react";
import "../../assets/css/DiscussionBoardSearch.scss";
import ThreadView from "./ThreadView";

const threadsPerPage = 100;

class DBoardSearchResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      allThreads: [],
      threadsToShow: [],
      currentPage: 0,
      buttons: [],
    };
    this.handleFormButtonClick = this.handleFormButtonClick.bind(this);
  }

  handleFormButtonClick(pageNumber) {
    this.setState({
      currentPage: pageNumber,
      threadsToShow: this.state.allThreads.slice(
        threadsPerPage * pageNumber,
        threadsPerPage * pageNumber + threadsPerPage
      ),
    });
  }

  createControls() {
    var rows = [];
    for (
      var i = 0;
      i < Math.ceil(this.props.threads.length / threadsPerPage);
      i++
    ) {
      rows.push(
        <div
          className={"FormButton"}
          onClick={this.handleFormButtonClick.bind(null, i)}
        >
          {i + 1}
        </div>
      );
    }
    this.setState({ buttons: rows });
  }

  displayControls() {
    var rows = [];
    rows.push(
      <div
        className={"FormButton"}
        onClick={this.handleFormButtonClick.bind(null, 0)}
      >
        &lt;&lt;
      </div>
    );
    if (this.state.currentPage - 2 >= 0) {
      rows.push(this.state.buttons[this.state.currentPage - 2]);
    }
    if (this.state.currentPage - 1 >= 0) {
      rows.push(this.state.buttons[this.state.currentPage - 1]);
    }
    rows.push(this.state.buttons[this.state.currentPage]);
    if (this.state.currentPage + 1 <= this.props.threads.length - 1) {
      rows.push(this.state.buttons[this.state.currentPage + 1]);
    }
    if (this.state.currentPage + 2 <= this.props.threads.length - 1) {
      rows.push(this.state.buttons[this.state.currentPage + 2]);
    }
    rows.push(
      <div
        className={"FormButton"}
        onClick={this.handleFormButtonClick.bind(
          null,
          Math.ceil(this.props.threads.length / threadsPerPage) - 1
        )}
      >
        &gt;&gt;
      </div>
    );
    return rows;
  }

  componentDidMount() {
    this.createControls();
  }

  componentDidUpdate(oldProps) {
    const newProps = this.props;
    if (oldProps !== newProps) {
      this.setState({
        allThreads: this.props.threads,
        threadsToShow: this.props.threads.slice(0, threadsPerPage),
      });
      this.createControls();
    }
  }

  render() {
    return (
      <>
        <h1 className="DBoardSearchResultsH1">
          Discussion Boards
          <hr />
        </h1>
        <div className="listControl">{this.displayControls()}</div>

        {this.state.threadsToShow.map((element) => (
          <ThreadView
            key={element.ThreadID}
            title={element.Title}
            listingID={element.ListingID}
            description={element.Description}
          />
        ))}
      </>
    );
  }
}

export default DBoardSearchResults;
