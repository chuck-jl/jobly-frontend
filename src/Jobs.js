import React,{useEffect, useState} from "react";
import CardList from "./CardList";
import Search from "./Search";
import JoblyApi from "./JoblyApi";

const Jobs = () =>{
    const [jobs, setJobs] = useState([]);

    const search = async (search) =>{
        let jobs = await JoblyApi.getJobs(search);
        setJobs(jobs);
    }

    useEffect(()=>{
        search();
    },[])

    async function apply(idx) {
        let jobId = jobs[idx].id;
        let message = await JoblyApi.applyToJob(jobId);
        setJobs(j => j.map(job => 
          job.id === jobId ? { ...job, state: message} : job
        ));
    }

    return (
        <div className="Jobs col-md-8 offset-md-2">
            <Search endpoint="jobs" search={search}/>
            <CardList cards= {jobs} apply={apply}/>
        </div>
    )

}

export default Jobs;