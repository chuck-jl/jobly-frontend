import React, {useState} from "react";
import "./Search.scss";

const Search = ({search}) =>{
    const [searchData, setSearchData] = useState("");
    const handleChange = (e) =>{
        setSearchData(e.target.value)
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        search(searchData);
    }

    return (
        <div className="Search mb-4">
            <form className="form-inline" onSubmit={handleSubmit}>
                <input
                  className="form-control form-control-lg flex-grow-1"
                  name="searchData"
                  placeholder="Enter search term..."
                  value= {searchData}
                  onChange={handleChange}
                />
                <button className="btn btn-lg btn-primary">Search</button>
            </form>
        </div>
    )
}

export default Search;