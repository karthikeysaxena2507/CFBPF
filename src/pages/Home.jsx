/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState } from "react";
import { Dropdown } from "react-bootstrap";
import DropdownButton from "../components/helper/DropdownButton";
import { 
    residencyStatuses, 
    livingStatuses, 
    employmentStatuses, 
    stateValues, 
    dataMap, 
    scenarios,
    loanRates, 
    frequencies, 
    genderValues } from "../util/data";
import { getDateInString } from "../util/date";
import Loader from "../components/helper/Loader";
import Header from "../components/helper/Header";
const lenderService = require("../routes/lenderRoutes");

const Home = () => {

    const [scenario, setScenario] = useState(scenarios[0]);

    // PERSONAL DETAILS
    const [firstName, setFirstName] = useState(dataMap.get(scenario).firstName); 
    const [middleName, setMiddleName] = useState("A");
    const [lastName, setLastName] = useState(dataMap.get(scenario).lastName);
    const [gender, setGender] = useState(dataMap.get(scenario).gender);
    const [dateOfBirth, setDateOfBirth] = useState(getDateInString());
    const [residencyStatus, setResidencyStatus] = useState(residencyStatuses[0]);
    const [livingStatus, setLivingStatus] = useState(livingStatuses[0]);
    const [employmentStatus, setEmploymentStatus] = useState(employmentStatuses[0]);
    const [creditScore, setCreditScore] = useState(650);

    // ADDRESS DETAILS
    const [unitNumber, setUnitNumber] = useState(5);
    const [streetNumber, setStreetNumber] = useState(dataMap.get(scenario).streetNumber);
    const [streetType, setStreetType] = useState(dataMap.get(scenario).streetType);
    const [streetName, setStreetName] = useState(dataMap.get(scenario).streetName);
    const [suburb, setSuburb] = useState(dataMap.get(scenario).suburb);
    const [state, setState] = useState(dataMap.get(scenario).state);
    const [postCode, setPostCode] = useState(dataMap.get(scenario).postCode);
    const [yearsOfLiving, setYearsOfLiving] = useState(4);
    const [monthsOfLiving, setMonthsOfLiving] = useState(2);

    // VEHICLE DETAILS
    const [vehicleYear, setVehicleYear] = useState(2018); 
    const [vehiclePrice, setVehiclePrice] = useState(35000); 
    const [deposit, setDeposit] = useState(1000); 
    const [endOfLoanPayment, setEndOfLoanPayment] = useState(10);
    const [forBusinessPurpose, setForBusinessPurpose] = useState(false);
    const [repaymentFrequency, setRepaymentFrequency] = useState(frequencies[0]);
    const [loanTerm, setLoanTerm] = useState(5);
    const [value, setValue] = useState(35000);

    // OTHER DETAILS
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async(e) => {
        try {
            e.preventDefault();
            setLoading(true);

            const personal = {
                firstName,
                middleName,
                lastName,
                dateOfBirth,
                gender,
                residencyStatus,
                livingStatus,
                employmentStatus,
                creditScore
            }

            const address = {
                unitNumber,
                streetNumber,
                streetType,
                streetName,
                suburb,
                state,
                postCode,
                yearsOfLiving,
                monthsOfLiving
            }

            const vehicle = {
                vehicleYear,
                vehiclePrice,
                deposit,
                endOfLoanPayment,
                forBusinessPurpose,
                repaymentFrequency,
                loanTerm,
                value
            }

            const data = {
                personal,
                address,
                vehicle
            }

            console.log("Customer Data:", data);
            const response = await lenderService.getLenders(data);
            console.log("Pre Lender Criteria Data:", response);
            setLoading(false);
            window.location = `/rates/${response.redisKey}`;
        }
        catch(err) {
            setLoading(false);
            console.log(err.response);
            if (Array.isArray(err.response.data)) {
                setMessage(
                    err.response.data[0].errorCausingField +
                    " " + err.response.data[0].errorCause
                );
            }
            else {
                setMessage(err.response.data.error);
            }
        }
    }

    const changeScenario = (text) => {
        console.log("Changing Input Scenario...");
        setScenario(text);
        setFirstName(dataMap.get(text).firstName);
        setLastName(dataMap.get(text).lastName);
        setGender(dataMap.get(text).gender);
        setStreetNumber(dataMap.get(text).streetNumber);
        setStreetName(dataMap.get(text).streetName);
        setStreetType(dataMap.get(text).streetType);
        setSuburb(dataMap.get(text).suburb);
        setState(dataMap.get(text).state);
        setPostCode(dataMap.get(text).postCode);
        console.log("Input Scenario Changed");
    }

    return (
    <div className = "container home mb-5">

        <Header />

        <div className = "mt-2">
            <div className = "heading"> Input Scenario </div>
            <Dropdown>
                <DropdownButton text = {scenario} />
                <Dropdown.Menu style={{ margin: 0 }}>
                {scenarios.map((text) => {
                    return (
                        <Dropdown.Item
                            key = {text}
                            className = "dropdown-item" 
                            onClick = {() => changeScenario(text)} 
                            > {text}
                        </Dropdown.Item>)
                })}
                </Dropdown.Menu>
            </Dropdown>
        </div>

        <form> 
        {/* PEROSNAL DETAILS */}
            <div className = "mt-3 text-left">
                <h5> Personal Details </h5>
                <div className = "row"> 
                    {/* FIRST NAME */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> First Name </div>
                        <input 
                            type = "text" 
                            value = {firstName}
                            onChange = {(e) => setFirstName(e.target.value)}
                            placeholder = "First Name" 
                            className = "input"
                        />
                    </div>
                    {/* MIDDLE NAME */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Middle Name </div>
                        <input 
                            type = "text" 
                            value = {middleName}
                            onChange = {(e) => setMiddleName(e.target.value)}
                            placeholder = "Middle Name" 
                            className = "input"
                        />
                    </div>
                    {/* LAST NAME */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Last Name </div>
                        <input 
                            type = "text" 
                            value = {lastName}
                            onChange = {(e) => setLastName(e.target.value)}
                            placeholder = "Last Name" 
                            className = "input"
                        />
                    </div>
                </div>
            </div>

            <div className = "row text-left">
                {/* DATE OF BIRTH */}
                <div className = "mt-3 ml-4 col">
                    <div className = "heading"> Date of Birth </div>
                        <input 
                            type = "date" 
                            value = {dateOfBirth}
                            onChange = {(e) => setDateOfBirth(e.target.value)}
                            placeholder = "Date of Birth" 
                            className = "input"
                        />
                </div>
                {/* CREDIT SCORE */}
                <div className = "mt-3 ml-4 col">
                    <div className = "heading"> Credit Score (Not a User Input) </div>
                    <input 
                        type = "number" 
                        value = {creditScore}
                        onChange = {(e) => setCreditScore(e.target.value)} 
                        className = "input"
                    />
                </div>
                <div className = "mt-3 ml-4 col">
                    <div className = "heading"> Gender </div>
                    <Dropdown>
                        <DropdownButton text = {gender} />
                        <Dropdown.Menu style={{ margin: 0 }}>
                        {genderValues.map((text) => {
                            return (
                                <Dropdown.Item
                                    key = {text}
                                    className = "dropdown-item" 
                                    onClick = {() => setGender(text)} 
                                    > {text}
                                </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            <div className = "row mt-3 text-left"> 
                {/* RESIDENCY STATUS */}
                <div className = "dropdown text-left col ml-4 mt-1">
                    <div className = "heading"> Residency Status </div>
                    <Dropdown>
                        <DropdownButton text = {residencyStatus} />
                        <Dropdown.Menu style={{ margin: 0 }}>
                        {residencyStatuses.map((text) => {
                            return (
                                <Dropdown.Item
                                    key = {text}
                                    className = "dropdown-item" 
                                    onClick = {() => setResidencyStatus(text)} 
                                    > {text}
                                </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* EMPLOYMENT STATUS */}
                <div className = "dropdown text-left col ml-4 mt-1">
                    <div className = "heading"> Employment Status </div>
                    <Dropdown>
                        <DropdownButton text = {employmentStatus} />
                        <Dropdown.Menu style={{ margin: 0 }}>
                        {employmentStatuses.map((text) => {
                            return (
                                <Dropdown.Item
                                    key = {text}
                                    className = "dropdown-item" 
                                    onClick = {() => setEmploymentStatus(text)} 
                                    > {text}
                                </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                {/* LIVING STATUS */}
                <div className = "dropdown text-left col ml-4 mt-1">
                    <div className = "heading"> Living Status </div>
                    <Dropdown>
                        <DropdownButton text = {livingStatus} />
                        <Dropdown.Menu style={{ margin: 0 }}>
                        {livingStatuses.map((text) => {
                            return (
                                <Dropdown.Item
                                    key = {text}
                                    className = "dropdown-item" 
                                    onClick = {() => setLivingStatus(text)} 
                                    > {text}
                                </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
            </div>

            {/* ADDRESS DETAILS */}
            <div className = "mt-4 text-left">
                <h5> Current Address Details </h5>
                <div className = "row"> 
                    {/* UNIT NUMBER */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Unit Number </div>
                        <input 
                            type = "number" 
                            value = {unitNumber}
                            onChange = {(e) => setUnitNumber(e.target.value)}
                            placeholder = "Unit Number" 
                            className = "input"
                        />
                    </div>
                    {/* STREET NUMBER */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Street Number </div>
                        <input 
                            type = "number" 
                            value = {streetNumber}
                            onChange = {(e) => setStreetNumber(e.target.value)}
                            placeholder = "Street Number" 
                            className = "input"
                        />
                    </div>
                    {/* STREET TYPE */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Street Type </div>
                        <input 
                            type = "text" 
                            value = {streetType}
                            onChange = {(e) => setStreetType(e.target.value)}
                            placeholder = "Street Type"  
                            className = "input"
                        />
                    </div>
                </div>
                <div className = "row"> 
                    {/* STREET NAME */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Street Name </div>
                        <input 
                            type = "text" 
                            value = {streetName}
                            onChange = {(e) => setStreetName(e.target.value)}
                            placeholder = "Street Name" 
                            className = "input"
                        />
                    </div>
                    {/* SUBURB */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Suburb </div>
                        <input 
                            type = "text" 
                            value = {suburb}
                            onChange = {(e) => setSuburb(e.target.value)}
                            placeholder = "Suburb" 
                            className = "input"
                        />
                    </div>
                    {/* POSTCODE */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Postcode </div>
                        <input 
                            type = "text" 
                            value = {postCode}
                            onChange = {(e) => setPostCode(e.target.value)}
                            placeholder = "PostCode" 
                            className = "input"
                        />
                    </div>
                </div>
                <div className = "row"> 
                    {/* DURATION OF LIVING */}
                    <div className = "dropdown text-left col ml-4 mr-2 mt-2">
                        <div className = "largeHeading"> How long have you lived here </div>    
                        <div className = "row"> 
                            {/* YEARS OF LIVING */}
                            <div className = "mt-1 col">
                                <div className = "heading"> Years of Living (0 - 20) </div>
                                <input 
                                    type = "number" 
                                    value = {yearsOfLiving}
                                    onChange = {(e) => setYearsOfLiving(e.target.value)}
                                    className = "input"
                                />
                            </div>
                            {/* MONTHS OF LIVING */}
                            <div className = "mt-1 col">
                                <div className = "heading"> Months of Living (1 - 12) </div>
                                <input 
                                    type = "number" 
                                    value = {monthsOfLiving}
                                    onChange = {(e) => setMonthsOfLiving(e.target.value)}  
                                    className = "input"
                                />
                            </div>
                        </div>
                    </div>
                    {/* STATE */}
                    <div className = "dropdown text-left col ml-4 mt-2">
                        <div className = "heading"> State </div>
                        <Dropdown>
                            <DropdownButton text = {state} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {stateValues.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        onClick = {() => setState(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col">
                    </div>
                </div>
            </div>

            {/* VEHICLE DETAILS */}
            <div className = "mt-4 text-left">
                <h5> Vehicle Details </h5>
                <div className = "row">
                    {/* VEHICLE YEAR */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Year Of Vehicle </div>
                        <input 
                            type = "text" 
                            value = {vehicleYear}
                            onChange = {(e) => setVehicleYear(e.target.value)}  
                            className = "input"
                        />
                    </div>
                    {/* VEHICLE PRICE */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Price of Vehicle (in $ from Cars24) </div>
                        <input 
                            type = "number" 
                            value = {vehiclePrice}
                            onChange = {(e) => setVehiclePrice(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    {/* DEPOSIT */}
                    <div className = "ml-4 mr-3 mt-2 col">
                        <div className = "heading"> Deposit (in $) </div>
                        <input 
                            type = "number" 
                            value = {deposit}
                            onChange = {(e) => setDeposit(e.target.value)} 
                            className = "input"
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
                            className = "input"
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
                    {/* VEHICLE PRICE */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <span className = "largeHeading mr-2"> Will you be using the vehicle 
                        for mainly business purposes? </span>
                        <input 
                            type = "checkbox"
                            onChange={() => setForBusinessPurpose(!forBusinessPurpose)}
                            style = {{transform: "scale(1.6)"}}
                        />
                    </div>
                    {/* DEPOSIT */}
                    <div className = "largeHeading ml-4 mr-3 mt-3 col">
                        Loan Amount: {(vehiclePrice - deposit) >= 0 ? 
                        vehiclePrice - deposit : 0} $
                    </div>
                </div>
            </div>
            <div className = "mt-3 message">
                {message}
            </div>
            <div style = {!loading ? {display: "none"} : null}>
                <Loader />
            </div>
            <div>
                <button 
                    className = "btn btn-dark btn-lg expand mt-4" 
                    onClick = {(e) => submit(e)}> Submit 
                </button>
            </div>
        </form>

    </div>)
}

export default Home;