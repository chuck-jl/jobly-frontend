import React, { useState, useEffect,useContext } from 'react';
import { useParams } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import CardList from './CardList';
import UserContext from "./UserContext";

const Company = () => {
	const { handle } = useParams();
    const [ company, setCompany ] = useState(null);
    const {currentUser} =useContext(UserContext);
	useEffect(
		() => {
			async function getCompanyByHandle() {
                const company = await JoblyApi.getCompany(handle);
                const { jobs } = currentUser;
				const jobsIDsAppliedTo = new Set(jobs.map((job) => job.id));

				// add key for each job in company if it is applied to ---
				// this let us handle the "apply/applied" button
				company.jobs = company.jobs.map((job) => ({
					...job,
					state: jobsIDsAppliedTo.has(job.id) ? 'applied' : null
				}));
				setCompany(company);
			}
			getCompanyByHandle();
		},
		[ handle, currentUser ]
    );
    
    async function apply(idx) {
        if (company && Array.isArray(company.jobs) && idx < company.jobs.length) {
          let jobId = company.jobs[idx].id;
          let message = await JoblyApi.applyToJob(jobId);
          setCompany(c => {
            let newCompany = { ...c };
            newCompany.jobs = newCompany.jobs.map(job =>
              job.id === jobId ? { ...job, state: message } : job
            );
            return newCompany;
          });
        }
      }

	if (!company) {
		return <div>Loading...</div>;
	}

	return (
		<div className="Company col-md-8 offset-md-2">
			<h5 className="text-capitalize">{company.title}</h5>
			<p className="lead">{company.description}</p>
			<CardList cards={company.jobs} apply={apply}/>
		</div>
	);
};

export default Company;
