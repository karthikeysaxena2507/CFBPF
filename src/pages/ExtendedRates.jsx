import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import LenderTable from "../components/tables/LenderTable";
import ExtendedCriteriaTable from "../components/tables/ExtendedCriteriaTable";
import Loader from "../components/helper/Loader";
import Header from "../components/helper/Header";
import Heading from "../components/helper/Heading";
const financeService = require("../routes/financeRoutes");
const lenderService = require("../routes/lenderRoutes");
const ratesService = require("../routes/ratesRoutes");
const illionService = require("../routes/illionRoutes");

const UPLOAD = "Click to upload";

const ExtendedRates = () => {

    const { id } = useParams();
    const [pageLoading, setPageLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [validLenders, setValidLenders] = useState([]);
    const [extendedLenders, setExtendedLenders] = useState([]);
    const [preLenders, setPreLenders] = useState([]);
    const [frequency, setFrequency] = useState("");

    const [username, setUsername] = useState("12345678");
    const [password, setPassword] = useState("TestMyMoney");
    const [institution, setInstitution] = useState("bank_of_statements");

    useEffect(() => {
        const fetch = async() => {
            try {
                setPageLoading(true);
                const finance = await financeService.getFinanceFromCache(id);
                console.log("Financial Data:", finance);
                const response = await ratesService.getRatesFromCache(id);
                console.log("Financial Rates:", response);
                setFrequency(response.repaymentFrequency);
                const lenders = await lenderService.getPreLendersFromCache(id);
                console.log("Pre Lender Criteria Data:", lenders);
                const data = await lenderService.getExtendedLendersFromCache(id);
                console.log("Extended Lender Criteria Data:", data);
                setExtendedLenders(data.sort((a, b) => {return (a.interestRate - b.interestRate)}));
                setPreLenders(lenders.sort((a, b) => {return (a.interestRate - b.interestRate)}));
                let arr = [];
                for (let i = 0; i < 4; i++) {
                    if (data[i].isLenderValid && lenders[i].isLenderValid) {
                        arr.push(lenders[i]);
                    }
                }
                setValidLenders(arr);
                setPageLoading(false);
            }
            catch(err) {
                setPageLoading(false);
                console.log(err);
            }
        }
        fetch();
    }, [id]);

    const submit = async() => {
        try {
            setButtonLoading(true);
            const body = {
                credentials: {
                    institution,
                    username,
                    password
                }
            };
            const data = await illionService.getUpdatedLenders(body, id);
            console.log("Updated Extended Lender Criteria Data:", data);
            const lenders = await lenderService.getPreLendersFromCache(id);
            setExtendedLenders(data.sort((a, b) => {return (a.interestRate - b.interestRate)}));
            setPreLenders(lenders.sort((a, b) => {return (a.interestRate - b.interestRate)}));
            let arr = [];
            for (let i = 0; i < 4; i++) {
                if (data[i].isLenderValid && lenders[i].isLenderValid) {
                    arr.push(lenders[i]);
                }
            }
            setValidLenders(arr);
            setButtonLoading(false);
        }
        catch(err) {
            setButtonLoading(false);
            console.log(err);
        }
    }

    return (pageLoading) ? <Loader /> : (
    <div className = "container rates">
        <Header />

        {/* FILE INPUTS FROM USER */}
        <div>
            <div className = "mt-3">
                <h3> Upload Application Documents </h3>
            </div>

            <div className = "mt-2">
                <p> In order to process the loan, you will need to provide the following application documents </p>
            </div>

            <div className = "mt-4 box">
                <input type = "file" style = {{display: "none"}} id = "file1"/>
                <Heading text = "Front of driver's license" />
                <label htmlFor = "file1"> 
                    <span className = "text"> {UPLOAD} </span>
                </label>
                <span className = "required"> REQUIRED </span>
            </div>

            <div className = "mt-4 box">
                <input type = "file" style = {{display: "none"}} id = "file2"/>
                <Heading text = "Back of driver's license" />
                <label htmlFor = "file2"> 
                    <span className = "text"> {UPLOAD} </span>
                </label>
                <span className = "required"> REQUIRED </span>
            </div>

            <div className = "mt-4 box">
                <input type = "file" style = {{display: "none"}} id = "file3"/>
                <Heading text = "Most recent payslip" />
                <label htmlFor = "file3"> 
                    <span className = "text"> {UPLOAD} </span>
                </label>
                <span className = "required"> REQUIRED </span>
            </div>

            <div className = "mt-4 box">
                <input type = "file" style = {{display: "none"}} id = "file4"/>
                <Heading text = "Second most recent payslip" />
                <label htmlFor = "file4"> 
                    <span className = "text"> {UPLOAD} </span>
                </label>
                <span className = "required"> REQUIRED </span>
            </div>

            <div className = "mt-4 box">
                <input type = "file" style = {{display: "none"}} id = "file5"/>
                <Heading text = "Bank statement" />
                <label htmlFor = "file5"> 
                    <span className = "text"> {UPLOAD} </span>
                </label>
                <span className = "required"> REQUIRED </span>
            </div>

            <div className = "mt-5">
                <h3> Bank Statements From Illion </h3>
                <div className = "mt-3">
                    <div className = "heading"> Institution Name </div>
                    <input  
                        type = "text" 
                        value = {institution}
                        onChange = {(e) => setInstitution(e.target.value)}
                        placeholder = "Bank Name" 
                        className = "input"
                    />
                </div>
                <div className = "mt-3">
                    <div className = "heading"> Username </div>
                    <input  
                        type = "text" 
                        value = {username}
                        onChange = {(e) => setUsername(e.target.value)}
                        placeholder = "Username" 
                        className = "input"
                    />
                </div>
                <div className = "mt-3">
                    <div className = "heading"> Password </div>
                    <input  
                        type = "password" 
                        value = {password}
                        onChange = {(e) => setPassword(e.target.value)}
                        placeholder = "Username" 
                        className = "input"
                    />
                </div>
            </div>

            <div style = {!buttonLoading ? {display: "none"} : null}>
                <Loader />
            </div>

            <div className = "mt-2">
                <button 
                    className = "btn btn-dark expand mt-4" 
                    onClick = {(e) => submit(e)}> Update Criteria Table
                </button>
            </div>

        </div>

        <div className = "mt-5" style = {(validLenders.length === 0) ? {display: "none"} : null}>
            <h3> Lender Rate Details </h3>
            <LenderTable 
                frequency = {frequency}
                data = {validLenders} 
                id = {id} 
                extended = {true} 
            />
        </div>

        <div className = "mt-4">
            <h3> Lender Criteria Details </h3>
            <ExtendedCriteriaTable 
                preLenders = {preLenders} 
                extendedLenders = {extendedLenders}
            />
        </div>

    </div>
    )

} 

export default ExtendedRates;