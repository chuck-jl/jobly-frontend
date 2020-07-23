import React,{useEffect,useState} from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";

const Companies = ()=>{
    const [companies, setCompanies] = useState([]);
    const search = async (search) =>{
        let companies = await JoblyApi.getCompanies(search);
        setCompanies(companies);
    }
    useEffect(()=>{
        search();
    },[])

    return (
        <div className="Companies col-md-8 offset-md-2">
            <Search endpoint="companies" search={search}/>
            <CardList cards={companies}/>
        </div>
    )
}

export default Companies;