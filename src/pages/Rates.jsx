import React, { useEffect, useState } from "react";
import CriteriaTable from "../components/tables/CriteriaTable";
import LenderTable from "../components/tables/LenderTable";
import Loader from "../components/helper/Loader";
import Header from "../components/helper/Header";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "../components/helper/DropdownButton";
import { useParams } from "react-router";
import { loanRates, frequencies } from "../util/data";
const lenderService = require("../routes/lenderRoutes");
const customerService = require("../routes/customerRoutes");

const SUCCESS_MESSAGE = "Congratulations, your loan has been pre approved by the following lenders";
const FAILURE_MESSAGE = "Sorry, your loan has not been pre approved by any lender";

const Rates = () => {

    const { id } = useParams();
    const [lenders, setLenders] = useState([]);
    const [validLenders, setValidLenders] = useState([]);
    const [pageLoading, setPageLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);

    const [personal, setPersonal] = useState({});
    const [address, setAddress] = useState({});

    // VEHICLE DETAILS
    const [vehicleYear, setVehicleYear] = useState(0); 
    const [vehiclePrice, setVehiclePrice] = useState(0); 
    const [deposit, setDeposit] = useState(0); 
    const [endOfLoanPayment, setEndOfLoanPayment] = useState(0);
    const [loanTerm, setLoanTerm] = useState(0);
    const [value, setValue] = useState(0);
    const [repaymentFrequency, setRepaymentFrequency] = useState(frequencies[0]);
    const [forBusinessPurpose, setForBusinessPurpose] = useState(false);
    const [frequency, setFrequency] = useState();

    useEffect(() => {
        const fetch = async() => {
            try {
                setPageLoading(true);
                const response = await lenderService.getPreLendersFromCache(id);
                const customer = await customerService.getCustomerFromCache(id);
                setAddress(customer.address);
                setPersonal(customer.personal);
                setDeposit(customer.vehicle.deposit);
                setLoanTerm(customer.vehicle.loanTerm);
                setVehicleYear(customer.vehicle.vehicleYear);
                setValue(customer.vehicle.value);
                setVehiclePrice(customer.vehicle.vehiclePrice)
                setEndOfLoanPayment(customer.vehicle.endOfLoanPayment);
                setRepaymentFrequency(customer.vehicle.repaymentFrequency);
                setFrequency(customer.vehicle.repaymentFrequency);
                setForBusinessPurpose(customer.vehicle.forBusinessPurpose);
                console.log("Pre Lender Criteria Data:", response);
                console.log("Customer Data:", customer);
                setLenders(response.sort((a, b) => {return (a.interestRate - b.interestRate)}));
                setValidLenders(response.filter((lender) => lender.isLenderValid === true));
                setPageLoading(false);
            }
            catch(err) {
                console.log(err);
                setPageLoading(false);
            }
        }
        fetch();
    }, [id]);

    const submit = async(e) => {
        try {
            setButtonLoading(true);
            e.preventDefault();
            const data = {
                personal,
                address,
                vehicle: {
                    vehiclePrice,
                    vehicleYear,
                    deposit,
                    value,
                    endOfLoanPayment,
                    loanTerm,
                    repaymentFrequency,
                    forBusinessPurpose
                }
            }
            console.log("Customer Data:", data);
            const response = await lenderService.getLenders(data);
            console.log("Pre Lender Criteria Data:", response);
            window.location = `/rates/${response.redisKey}`;
            setButtonLoading(false);
        }
        catch(err) {

        }
    }
    
    return (pageLoading) ? <Loader /> : (
        
        <div className = "container rates">

            <Header />

            {/* VEHICLE DETAILS */}
            <div className = "mt-4 text-left home">
                <h5> Vehicle Details </h5>
                <div className = "row">
                    {/* VEHICLE YEAR */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Year Of Vehicle </div>
                        <input 
                            type = "text" 
                            value = {vehicleYear}
                            onChange = {(e) => setVehicleYear(e.target.value)} 
                            autoComplete = "off" 
                            className = "input"
                            required 
                        />
                    </div>
                    {/* VEHICLE PRICE */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Price of Vehicle (in $ from Cars24) </div>
                        <input 
                            type = "number" 
                            value = {vehiclePrice}
                            onChange = {(e) => setVehiclePrice(e.target.value)} 
                            autoComplete = "off" 
                            className = "input"
                            required 
                        />
                    </div>
                    {/* DEPOSIT */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Deposit (in $) </div>
                        <input 
                            type = "number" 
                            value = {deposit}
                            onChange = {(e) => setDeposit(e.target.value)} 
                            autoComplete = "off" 
                            className = "input"
                            required 
                        />
                    </div>
                </div>
                <div className = "row">
                    {/* END OF LOAN PAYMENT */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> End of Loan Payment % </div>
                        <Dropdown>
                            <DropdownButton text = {endOfLoanPayment + "%"} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {loanRates.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setEndOfLoanPayment(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* LOAN TERM */}
                    <div className = "ml-3 mt-2 col">
                        <div className = "heading"> Loan Term (in years)</div>
                        <input 
                            type = "number" 
                            value = {loanTerm}
                            onChange = {(e) => setLoanTerm(e.target.value)} 
                            autoComplete = "off" 
                            className = "input"
                            required 
                        />
                    </div>
                    {/* LOAN REPAYMENT FREQUENCY */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Repayment Frequency </div>
                        <Dropdown>
                            <DropdownButton text = {repaymentFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        onClick = {() => setRepaymentFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className = "row">
                    {/* VALUE */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Value (in future: Glass's) </div>
                        <input 
                            type = "text" 
                            value = {value}
                            onChange = {(e) => setValue(e.target.value)}  
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div>
                    <div className = "ml-4 mr-3 mt-2 col"></div>
                </div>
            </div>

            <div className = "largeHeading ml-4 mr-2 mt-3">
                Loan Amount: {(vehiclePrice - deposit) >= 0 ? 
                vehiclePrice - deposit : 0} $
            </div>

            <div style = {!buttonLoading ? {display: "none"} : null}>
                <Loader />
            </div>
            
            <div>
                <button 
                    className = "btn btn-dark expand mt-4" 
                    onClick = {(e) => submit(e)}> Update Lenders
                </button>
            </div>

            <div className =  "mt-4">
                <h3> Lender Details </h3>
            </div>

            <div className = "mt-4">
                <h4> {(validLenders.length === 0) ? FAILURE_MESSAGE : SUCCESS_MESSAGE} </h4>
            </div>

            <div className = "mt-4" style = {(validLenders.length === 0) ? {display: "none"} : null}>
                <h3> PreApproved Lender Rate Details </h3>
                <LenderTable 
                    frequency = {frequency} 
                    data = {validLenders} 
                    id = {id} 
                    extended = {false}
                />
            </div>

            <div className = "mt-4">
                <h3> Lender Criteria Details </h3>
                <CriteriaTable data = {lenders} />
            </div>
        </div>
    )
}

export default Rates;