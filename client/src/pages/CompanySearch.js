import React, {useState} from "react";
//import NavBar from "../components/NavBar"; - need to add this in, not sure where/how
import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/CompanySearch.scss";

const SearchBar = (props) => {
  const { options, onInputChange } = props;
  return (
    <div className="searchbar"> 
      <input 
        type="text" 
        className="form-control" 
        placeholder="Type an ASX-listed company code or name here..."
        onChange={onInputChange}
      />
      <ul className="list-group">
        {options.map((option, index) => {
          return ( 
            <button 
             type="button" 
              key={index}
             className="list-group-item list-group-item-action"
            >
              {option}
            </button>
          );
        })} 
      </ul>
  </div>
  );
};

const dummyOptions = [] //fake data for now, an array of strings
{
  dummyOptions.push('A2M - The A2 Milk Company');
  dummyOptions.push('WTC - WiseTech Global');
  dummyOptions.push('CBA - Commonwealth Bank');
}

function CompanySearch() {
  const [options, setOptions] = useState([]);
  const onInputChange = (event) => {
    setOptions(
      dummyOptions.filter((option) => option.includes(event.target.value))
    );
  };
  
  return (
    <div className="companySearchTitle">
      <h1>Company Search</h1>
      <SearchBar 
        options={options}
        onInputChange={onInputChange} 
      />
    </div>
    );
}

export default CompanySearch;
