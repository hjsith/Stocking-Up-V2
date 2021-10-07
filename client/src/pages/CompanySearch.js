import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/CompanySearch.scss";


const SearchBar = (props) => {
  const { results, onInputChange } = props;
  const resultsRef = useRef()
  const searchbarRef = useRef()
  useEffect(() => { //when clicking outside the search bar, the dropdown is closed
    searchbarRef.current.addEventListener("click", (event) => { 
      event.stopPropagation(); //stop display changing to 'none' (i.e., hide) when the search bar is clicked
      resultsRef.current.style.display = "flex"; //this is the default display (i.e., show dropdown)
      onInputChange(event); //changes results list to include only input value
    });
    document.addEventListener("click", (event) => { //when clicking outside the searchbar,
      resultsRef.current.style.display = "none";    //hide the results list (ul)
    });
  }, [])
  return (
    <div className="searchbar"> 
      <input 
        id="companySearchInput"
        type="text" 
        className="form-control" 
        placeholder="Type an ASX-listed company code or name here..."
        onChange={onInputChange}
        ref={searchbarRef}
      />
      <ul id="results" className="list-group" ref={resultsRef}>
        {results.map((result, index) => {
          return (  //each dropdown item is a link to their respective order page where the URL is /QuoteManagement/[listing ID (shortened to three letters for each ASX code)]
            <Link to ={{pathname: "/QuoteManagement", state:{listingID:result.substring(0,3)}}}>
            <button 
              type="button" 
              key={index}
              className="list-group-item list-group-item-action"
            >
              {result}
            </button>
            </Link>
          );
        })} 
      </ul>
  </div>
  );
};

const searchresults = [] //DB Connection
{
  fetch("/api/listings", {
    method: "GET", //get
    headers: {
      "Content-Type": "application/json", //expect JSON
    },
  })
  .then((res) => {
    res.json().then((body) => {
      for (let i=0; i<body.length; ++i) {
        searchresults.push(`${body[i].ListingID}` + " " + `${body[i].ListingName}`); //search result format: ID Name      
      }
    })
    
  })
}

function CompanySearch() {
  const [results, setresults] = useState([]);
  const onInputChange = (event) => {
    setresults(
      searchresults.filter((result) => result.includes(event.target.value)).slice(0,5) //filters through searchresults, limits result list to 5 entries
    );
  };
  
  return (
    <div className="companySearchTitle">
      <NavBar />
      <h1>Company Search</h1>
      <SearchBar 
        results={results}
        onInputChange={onInputChange} 
      />
      <br />
      <button className="btn btn-primary">Search</button>
    </div>
    );
}

export default CompanySearch;
