import React from "react";
import NavBar from "../components/NavBar";
import "../assets/css/CompanySearch.scss";
class CompanySearch extends React.Component {
  render() {
    return (
      <>
        <NavBar />
        <h1 className="companySearchTitle">Company Search</h1>
        <div class="searchbar">
          <input
            type="text"
            name="search-form"
            id="search-form"
            placeholder="Type a Company name or ASX Code here..."
            className="companySearchInput"
          />
        </div>
      </>
    );
  }
}

export default CompanySearch;
