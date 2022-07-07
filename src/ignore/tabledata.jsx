


import React, { useState, useEffect } from 'react';

 
function TableData() {
    const [data, getData] = useState([])
    const URL = 'http://localhost:4001/supply';
 
    useEffect(() => {
        fetchData()
    }, [])
 
 
    const fetchData = () => {
        fetch(URL)
            .then((res) =>
                res.json())
 
            .then((response) => {
                console.log(response);
                getData(response);
            })
 
    }
 
    return (
        <>
            <h1>Applicant information</h1>
            <tbody>
                <tr>
                    <th style = {{border: "1px solid #ddd",
   padding: "8px"}}>Applicant ID</th>
                    <th style = {{border: "1px solid #ddd",
   padding: "8px"}}>First name</th>
                    <th style = {{border: "1px solid #ddd",
   padding: "8px"}}>Surname</th>
                    <th style = {{border: "1px solid #ddd",
   padding: "8px"}}>Status</th>
                    <th style = {{border: "1px solid #ddd",
   padding: "8px"}}>Skills ID</th>
                </tr>
                {data.map((item, i) => (
                    <tr key={i}>
                        <td style = {{border: "1px solid #ddd",
   padding: "8px"}}>{item.ApplicantID}</td>
                        <td style = {{border: "1px solid #ddd",
   padding: "8px"}}>{item.ApplicantFirstName}</td>
                        <td style = {{border: "1px solid #ddd",
   padding: "8px"}}>{item.ApplicantLastName}</td>
                        <td style = {{border: "1px solid #ddd",
   padding: "8px"}}>{item.ApplicantStatus}</td>
                        <td style = {{border: "1px solid #ddd",
   padding: "8px"}}>{item.SkillsID}</td>
                    </tr>
                ))}
            </tbody>
 
        </>
    );
}
 
export default TableData;