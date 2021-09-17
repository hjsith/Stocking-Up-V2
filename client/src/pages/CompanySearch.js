import React, { useState, useEffect, useRef } from "react";
import NavBar from "../components/NavBar";
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/CompanySearch.scss";

/* need to fix:
- Navbar
- adding links to the dropdown results
- toggle dropdown on type, not click
*/

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
          return ( 
            <button 
              type="button" 
              key={index}
              onClick={(e) => { //when dropdown result is clicked, the input bar inherits the value of that result
                searchbarRef.current.value = result;
              }}
              className="list-group-item list-group-item-action"
            >
              {result}
            </button>
          );
        })} 
      </ul>
  </div>
  );
};

const dummyresults = [] //fake data for now, an array of strings
{
  dummyresults.push('A2M The A2 Milk Company');
  dummyresults.push('WTC WiseTech Global');
  dummyresults.push('CBA Commonwealth Bank');
  dummyresults.push('ANZ Australia and New Zealand Banking Group Ltd');
}

function CompanySearch() {
  const [results, setresults] = useState([]);
  const onInputChange = (event) => {
    setresults(
      dummyresults.filter((result) => result.includes(event.target.value)) //filters through dummyresults
    );
  };
  
  return (
    <div className="companySearchTitle">
      <h1>Company Search</h1>
      <NavBar />
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
