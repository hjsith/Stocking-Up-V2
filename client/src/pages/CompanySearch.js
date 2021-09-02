import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/CompanySearch.scss";
class CompanySearch extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <h1>Company Search</h1>
      <div class="searchbar">
          <input type="text"
          name="search-form"
          id="search-form"
          placeholder="Type a Company name or ASX Code here..."
          />
        </div>
        </>
    );
  }
}

export default CompanySearch;
