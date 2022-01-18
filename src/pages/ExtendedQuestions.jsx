import React, { useEffect, useState } from "react";
import { Dropdown } from "react-bootstrap";
import { useParams } from "react-router";
import DropdownButton from "../components/helper/DropdownButton";
import SubHeading from "../components/helper/SubHeading";
import Heading from "../components/helper/Heading";
import Loader from "../components/helper/Loader";
import Header from "../components/helper/Header";
import { relationshipStatuses, count, frequencies, employments } from "../util/data";
import EmploymentsTable from "../components/tables/EmploymentsTable";
import CreditCardTable from "../components/tables/CreditCardTable";
import PersonalLoanTable from "../components/tables/PersonalLoanTable";
import VehicleLoanTable from "../components/tables/VehicleLoanTable";
import OtherLiabilityTable from "../components/tables/OtherLiabilityTable";
import MortgageTable from "../components/tables/MortgageTable";
const customerService = require("../routes/customerRoutes");
const ratesService = require("../routes/ratesRoutes");
const helper = require("../util/helper");

const ExtendedQuestions = () => {

    const { id } = useParams();
    const [pageLoading, setPageLoading] = useState(false);
    const [buttonLoading, setButtonLoading] = useState(false);
    const [customer, setCustomer] = useState({});
    const [message, setMessage] = useState("");

    useEffect(() => {
        const fetch = async() => {
            try {
                setPageLoading(true);
                const response = await customerService.getCustomerFromCache(id);
                console.log("Customer Data:", response);
                setCustomer(response);
                setPageLoading(false);
            }
            catch(err) {
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
                setPageLoading(false);
            }
        }
        fetch();
    }, [id]);

    /* ======================= ABOUT YOU ======================= */

    // relationships
    const [relationshipStatus, setRelationshipStatus] = useState(relationshipStatuses[0]);
    const [dependents, setDependents] = useState(2);

    // income
    const [income, setIncome] = useState(5000);
    const [incomeFrequency, setIncomeFrequency] = useState(frequencies[0]);
    const [occupation, setOccupation] = useState("Workshop Engineer");
    const [currentEmployer, setCurrentEmployer] = useState("Cars24");
    const [currentEmploymentType, setCurrentEmploymentType] = useState(employments[0]);
    const [currentEmploymentYears, setCurrentEmploymentYears] = useState(1);
    const [currentEmploymentMonths, setCurrentEmploymentMonths] = useState(2);
    const [additionalIncomeSources, setAdditionalIncomeSources] = useState(100);

    /* ======================= PREV EMPLOYMENTS ======================= */
    const [prevEmployments, setPrevEmployments] = useState([]);
    const [employer, setEmployer] = useState("Boats24");
    const [prevOccupation, setPrevOccupation] = useState("BoatsPerson");
    const [employmentType, setEmploymentType] = useState(employments[0]);
    const [employmentYears, setEmploymentYears] = useState(1);
    const [employmentMonths, setEmploymentMonths] = useState(2);

    /* ======================= EXPENSES ======================= */

    // mortgage
    const [mortgageExpense, setMortgageExpense] = useState(200);
    const [mortgageExpenseFrequency, setMortgageExpenseFrequency] = useState(frequencies[0]);
    const [mortgageExpenseShare, setMortgageExpenseShare] = useState(10); // 0 - 100 %

    // food and groceries
    const [foodExpense, setFoodExpense] = useState(100);
    const [foodExpenseFrequency, setFoodExpenseFrquency] = useState(frequencies[0]);

    // utility
    const [utilityExpense, setUtilityExpense] = useState(100);
    const [utilityExpenseFrequency, setUtilityExpenseFrequency] = useState(frequencies[0]);

    // entertainment
    const [entertainmentExpense, setEntertainmentExpense] = useState(100);
    const [entertainmentExpenseFrequency, setEntertainmentExpenseFrequency] = useState(frequencies[0]);

    // health and education
    const [healthExpense, setHealthExpense] = useState(1000);
    const [healthExpenseFrequency, setHealthExpenseFrequency] = useState(frequencies[0]);

    // transport
    const [transportExpense, setTransportExpense] = useState(500);
    const [transportExpenseFrequency, setTransportExpenseFrequency] = useState(frequencies[0]);

    // other
    const [otherExpense, setOtherExpense] = useState(500);
    const [otherExpenseFrequency, setOtherExpenseFrequency] = useState(frequencies[0]);

    /* ======================= ASSETS ======================= */
    const [savings, setSavings] = useState(100);
    const [homeContents, setHomeContents] = useState(100);
    const [existingVehicles, setExistingVehicles] = useState(5000);
    const [investments, setInvestments] = useState(1000);
    const [otherAssets, setOtherAssets] = useState(100);

    /* ======================= LIABILITIES ======================= */

    // credit card
    const [creditCards, setCreditCards] = useState([]);
    const [creditCardBalance, setCreditCardBalance] = useState(100);

    // personal loans
    const [personalLoans, setPersonalLoans] = useState([]);
    const [personalLoanBalance, setPersonalLoanBalance] = useState(100);
    const [personalLoanRepayment, setPersonalLoanRepayment] = useState(10);

    // mortgages
    const [mortgages, setMortgages] = useState([]);
    const [mortgageLenderName, setMortgageLenderName] = useState("CBA");
    const [mortgageBalance, setMortgageBalance] = useState(100);
    const [propertyValue, setPropertyValue] = useState(10000);
    const [mortgageRepayment, setMortgageRepayment] = useState(10);

    // buyNowPayLater accounts
    const [buyNowPayLaterAccounts, setBuyNowPayLaterAccounts] = useState(3);

    // vehicle loans
    const [vehicleLoans, setVehicleLoans] = useState([]);
    const [vehicleLoanBalance, setVehicleLoanBalance] = useState(100);
    const [vehicleLoanRepayment, setVehicleLoanRepayment] = useState(10);

    // other liabilities
    const [otherLiabilities, setOtherLiabilities] = useState([]);
    const [otherLiabilityBalance, setOtherLiabilityBalance] = useState(100);
    const [otherLiabilityRepayment, setOtherLiabilityRepayment] = useState(10);

    const getTotalRepayments = () => {
        let sum = 0;
        for (let item of personalLoans) sum += Number(item.repayment);
        for (let item of mortgages) sum += Number(item.repayment);
        for (let item of vehicleLoans) sum += Number(item.repayment);
        for (let item of otherLiabilities) sum += Number(item.repayment);
        return sum;
    }

    const getTotalCreditCardBalance = () => {
        let sum = 0;
        for (let card of creditCards) sum += Number(card.balance);
        return sum;
    }

    const getTotalExpenses = () => {
        return (Number(helper.getMonthlyIncome(mortgageExpense, mortgageExpenseFrequency))
        + Number(helper.getMonthlyIncome(foodExpense, foodExpenseFrequency))
        + Number(helper.getMonthlyIncome(utilityExpense, utilityExpenseFrequency))
        + Number(helper.getMonthlyIncome(entertainmentExpense, entertainmentExpenseFrequency))
        + Number(helper.getMonthlyIncome(healthExpense, healthExpenseFrequency))
        + Number(helper.getMonthlyIncome(transportExpense, transportExpenseFrequency))
        + Number(helper.getMonthlyIncome(otherExpense, otherExpenseFrequency)));
    }

    const getTotalAssets = () => {
        return (Number(savings) + Number(homeContents) + Number(existingVehicles)
        + Number(investments) + Number(otherAssets));
    }

    const getExperienceInMonths = (type) => {
        let sum = 0;
        for (let employment of prevEmployments) {
            if (employment.employmentType === type) {
                sum += ((employment.employmentYears * 12)
                + employment.employmentMonths);
            }
        }
        return sum;
    }

    const submit = async(e) => {
        try {
            setButtonLoading(true);
            e.preventDefault();

            const personalDetails = {
                relationshipStatus,
                numberOfDependents: dependents,
                suburb: customer.address.suburb,
                state: customer.address.state,
                incomeDetails: {
                    income,
                    incomeFrequency,
                    occupation,
                    currentEmployer,
                    currentEmploymentMonths,
                    currentEmploymentYears,
                    currentEmploymentType,
                    additionalIncomeSources
                },
                prevEmployments,
                experience: {
                    fullTime: getExperienceInMonths("Full Time"),
                    partTime: getExperienceInMonths("Part Time"),
                    selfEmployed: getExperienceInMonths("Self Employed"),
                    casual: getExperienceInMonths("Casual"),
                    contract: getExperienceInMonths("Contract"),
                    current: currentEmploymentYears * 12 + currentEmploymentMonths
                }
            }

            const expenses = {
                mortgageExpense: {
                    expense: mortgageExpense,
                    frequency: mortgageExpenseFrequency,
                    share: mortgageExpenseShare
                },
                foodAndGroceries: {
                    expense: foodExpense,
                    frequency: foodExpenseFrequency
                },
                utility: {
                    expense: utilityExpense,
                    frequency: utilityExpenseFrequency
                },
                entertainment: {
                    expense: entertainmentExpense,
                    frequency: entertainmentExpenseFrequency
                },
                healthAndEducation: {
                    expense: healthExpense,
                    frequency: healthExpenseFrequency
                },
                transport: {
                    expense: transportExpense,
                    frequency: transportExpenseFrequency
                },
                otherExpense: {
                    expense: otherExpense,
                    frequency: otherExpenseFrequency
                },
                totalExpense: getTotalExpenses()
            }

            const assets = {
                savings,
                homeContents,
                existingVehicles,
                investments,
                otherAssets,
                totalAssets: getTotalAssets()
            }

            const liabilities = {
                creditCards,
                personalLoans,
                mortgages,
                vehicleLoans,
                otherLiabilities,
                buyNowPayLaterAccounts,
                totalRepayments: getTotalRepayments(),
                totalCreditCardBalance: getTotalCreditCardBalance()
            }

            const data = {
                personalDetails,
                expenses,
                assets,
                liabilities
            }

            console.log("Financial Data:", data);
            const response = await ratesService.getRates(data, id); 
            console.log("Financial Rates:", response);
            window.location = `/extendedRates/${id}`;
            setButtonLoading(false);
        }   
        catch(err) {
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
            setButtonLoading(false);
        }
    }

    const addCreditCard = () => {
        const data = {
            balance: creditCardBalance
        }
        setCreditCards([...creditCards, data]);
        setCreditCardBalance(0);
    }

    const removeCreditCard = (data) => {
        setCreditCards(creditCards.filter((card) => card !== data));
    }

    const addPersonalLoan = () => {
        const data = {
            balance: personalLoanBalance,
            repayment: personalLoanRepayment
        }
        setPersonalLoans([...personalLoans, data]);
        setPersonalLoanBalance(0);
        setPersonalLoanRepayment(0);
    }

    const removePersonalLoan = (data) => {
        setPersonalLoans(personalLoans.filter((loan) => loan !== data));

    }

    const addMortgage = () => {
        const data = {
            lenderName: mortgageLenderName,
            balance: mortgageBalance,
            repayment: mortgageRepayment,
            propertyValue
        }
        setMortgages([...mortgages, data]);
        setMortgageLenderName("");
        setMortgageBalance(0);
        setMortgageRepayment(0);
        setPropertyValue(0);
    }

    const removeMortgage = (data) => {
        setMortgages(mortgages.filter((mortgage) => mortgage !== data));
    }

    const addVehicleLoan = () => {
        const data = {
            balance: vehicleLoanBalance,
            repayment: vehicleLoanRepayment
        }
        setVehicleLoans([...vehicleLoans, data]);
        setVehicleLoanBalance(0);
        setVehicleLoanRepayment(0);
    }

    const removeVehicleLoan = (data) => {
        setVehicleLoans(vehicleLoans.filter((loan) => loan !== data));
    }

    const addOtherLiability = () => {
        const data = {
            balance: otherLiabilityBalance,
            repayment: otherLiabilityRepayment
        }
        setOtherLiabilities([...otherLiabilities, data]);
        setOtherLiabilityBalance(0);
        setOtherLiabilityRepayment(0);
    }

    const removeOtherLiability = (data) => {
        setOtherLiabilities(otherLiabilities.filter((item) => item !== data));
    }

    const addPrevEmployment = () => {
        const data = {
            occupation: prevOccupation,
            employer,
            employmentType,
            employmentMonths,
            employmentYears
        }
        setPrevEmployments([...prevEmployments, data]);
        setEmployer("Boats24");
        setPrevOccupation("BoatsPerson");
        setEmploymentType(employments[0]);
        setEmploymentMonths(2);
        setEmploymentYears(1);
    }

    const removePrevEmployment = (data) => {
        setPrevEmployments(prevEmployments.filter((item) => item !== data));
    }

    return (pageLoading) ? <Loader /> : (
        <div className = "container home mb-5">

            <Header />
            <div className = "mt-2">
                <h4> Please answer the following questions for loan Approval </h4>
            </div>
            
            {/* PERSONAL DETAILS */}
            <div className = "mt-4 text-left">
                <h5> Income Details </h5>
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-3 col">
                    {/* OCCUPATION */}
                        <Heading text = "Occupation" />
                        <input 
                            type = "text" 
                            value = {occupation}
                            onChange = {(e) => setOccupation(e.target.value)} 
                            className = "input"
                            placeholder = "Occupation"
                        />
                    </div>
                    {/* INCOME */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Income (in $)" />
                        <input 
                            type = "number" 
                            value = {income}
                            onChange = {(e) => setIncome(e.target.value)} 
                            className = "input"
                            occupation = "Income"
                        />
                    </div>
                    {/* INCOME FREQUENCY */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Income Frequency" />
                        <Dropdown>
                            <DropdownButton text = {incomeFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setIncomeFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className = "row">
                    {/* CURRENT EMPLOYER */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Current Employer" />
                        <input 
                            type = "text" 
                            value = {currentEmployer}
                            onChange = {(e) => setCurrentEmployer(e.target.value)} 
                            className = "input"
                            placeholder = "Current Employer"
                        />
                    </div>
                    {/* EMPLOYMENT YEARS */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Employment Years" />
                        <input 
                            type = "number" 
                            value = {currentEmploymentYears}
                            onChange = {(e) => setCurrentEmploymentYears(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    {/* EMPLOYMENT MONTHS */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Employment Months (1 - 12)" />
                        <input 
                            type = "number" 
                            value = {currentEmploymentMonths}
                            onChange = {(e) => setCurrentEmploymentMonths(e.target.value)} 
                            className = "input"
                        />
                    </div>
                </div>
                <div className = "row">
                    {/* EMPLOYMENT TYPE */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Employment Type" />
                        <Dropdown>
                            <DropdownButton text = {currentEmploymentType} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {employments.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setCurrentEmploymentType(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* RELATIONSHIP STATUS */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Relationship Status" />
                        <Dropdown>
                            <DropdownButton text = {relationshipStatus} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {relationshipStatuses.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setRelationshipStatus(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    {/* ADDITIONAL INCOME SOURCES */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Additional Income Sources" />
                        <input 
                            type = "number" 
                            value = {additionalIncomeSources}
                            onChange = {(e) => setAdditionalIncomeSources(e.target.value)} 
                            className = "input"
                        />
                    </div>
                </div>
                {/* NO OF DEPENDENTS */}
                <div className = "ml-2 mt-3 col">
                    <Heading text = "No. of Dependents" />
                    <input 
                        type = "number" 
                        value = {dependents}
                        onChange = {(e) => setDependents(e.target.value)} 
                        className = "input"
                    />
                </div>
            </div>

            {/* PREV EMPLOYMENTS */}
            <div className = "mt-4 text-left">
                <h5> Previous Employments </h5>
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-3 col">
                        {/* EMPLOYER */}
                        <Heading text = "Employer" />
                        <input 
                            type = "text" 
                            value = {employer}
                            onChange = {(e) => setEmployer(e.target.value)} 
                            className = "input"
                            placeholder = "Employer"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-3 col">
                        {/* OCCUPATION */}
                        <Heading text = "Occupation" />
                        <input 
                            type = "text" 
                            value = {prevOccupation}
                            onChange = {(e) => setPrevOccupation(e.target.value)} 
                            className = "input"
                            placeholder = "Occupation"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-3 col">
                        {/* EMPLOYMENT TYPE */}
                        <Heading text = "Employment Type" />
                        <Dropdown>
                            <DropdownButton text = {employmentType} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {employments.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setEmploymentType(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                <div className = "row">
                    {/* EMPLOYMENT YEARS */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Employment Years" />
                        <input 
                            type = "number" 
                            value = {employmentYears}
                            onChange = {(e) => setEmploymentYears(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    {/* EMPLOYMENT MONTHS */}
                    <div className = "ml-4 mr-3 mt-3 col">
                        <Heading text = "Employment Months (1 - 12)" />
                        <input 
                            type = "number" 
                            value = {employmentMonths}
                            onChange = {(e) => setEmploymentMonths(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-3 col">
                    </div>
                </div>
                <div className = "ml-4 mt-3 text-center">
                    <button 
                        className = "btn expand btn-dark"
                        onClick = {addPrevEmployment} 
                        > Add Emloyment
                    </button>
                </div>
                <EmploymentsTable data = {prevEmployments} remove = {(data) => removePrevEmployment(data)} />
            </div>

            {/* EXPENSES */}
            <div className = "mt-5 text-left">
                <h5> Expenses </h5>
                {/* MORTGAGE */}
                <SubHeading text = "MORTGAGE:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {mortgageExpense}
                            onChange = {(e) => setMortgageExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Share %" />
                        <input 
                            type = "number" 
                            value = {mortgageExpenseShare}
                            onChange = {(e) => setMortgageExpenseShare(e.target.value)} 
                            className = "input"
                            occupation = "Income"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {mortgageExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setMortgageExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                </div>
                {/* FOOD AND GROCERIES */}
                <SubHeading text = "FOOD AND GROCERIES:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {foodExpense}
                            onChange = {(e) => setFoodExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {foodExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setFoodExpenseFrquency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                {/* UTILITY */}
                <SubHeading text = "UTILITY:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {utilityExpense}
                            onChange = {(e) => setUtilityExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {utilityExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setUtilityExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                {/* ENTERTAINMENT */}
                <SubHeading text = "ENTERTAINMENT:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {entertainmentExpense}
                            onChange = {(e) => setEntertainmentExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {entertainmentExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setEntertainmentExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                {/* HEALTH AND EDUCATION */}
                <SubHeading text = "HEALTH AND EDUCATION:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {healthExpense}
                            onChange = {(e) => setHealthExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {healthExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setHealthExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                {/* TRANSPORT */}
                <SubHeading text = "TRANSPORT:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {transportExpense}
                            onChange = {(e) => setTransportExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {transportExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setTransportExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                {/* OTHER */}
                <SubHeading text = "OTHER EXPENSES:" />
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense (in $)" />
                        <input 
                            type = "number" 
                            value = {otherExpense}
                            onChange = {(e) => setOtherExpense(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"> 
                        <Heading text = "Expense Frequency" />
                        <Dropdown>
                            <DropdownButton text = {otherExpenseFrequency} />
                            <Dropdown.Menu style = {{ margin: 0 }}>
                            {frequencies.map((text) => {
                                return (
                                    <Dropdown.Item
                                        key = {text}
                                        className = "dropdown-item" 
                                        href = "#" 
                                        onClick = {() => setOtherExpenseFrequency(text)} 
                                        > {text}
                                    </Dropdown.Item>)
                            })}
                            </Dropdown.Menu>
                        </Dropdown>
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col"></div> 
                </div>
                <SubHeading 
                    text = "TOTAL EXPENSES (per Month in $): " 
                    value = {getTotalExpenses()}
                />
            </div>

            {/* ASSETS */}
            <div className = "mt-5 text-left">
                <h5> Assets </h5>
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col">
                        <Heading text = "Savings (in $)" />
                        <input 
                            type = "number" 
                            value = {savings}
                            onChange = {(e) => setSavings(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col">
                        <Heading text = "Home Contents (in $)" />
                        <input 
                            type = "number" 
                            value = {homeContents}
                            onChange = {(e) => setHomeContents(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col">
                        <Heading text = "Existing Vehicles (in $)" />
                        <input 
                            type = "number" 
                            value = {existingVehicles}
                            onChange = {(e) => setExistingVehicles(e.target.value)} 
                            className = "input"
                        />
                    </div>
                </div>
                <div className = "row">
                    <div className = "ml-4 mr-3 mt-2 col">
                        <Heading text = "Investments (in $)" />
                        <input 
                            type = "number" 
                            value = {investments}
                            onChange = {(e) => setInvestments(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col">
                        <Heading text = "Other Assets (in $)" />
                        <input 
                            type = "number" 
                            value = {otherAssets}
                            onChange = {(e) => setOtherAssets(e.target.value)} 
                            className = "input"
                        />
                    </div>
                    <div className = "ml-4 mr-3 mt-2 col">
                        <SubHeading 
                            text = "Total Assets (in $): " 
                            value = {getTotalAssets()}
                        />
                    </div>
                </div>
            </div>

            {/* LIABILITIES */}
            <div className = "mt-5 text-left">
                <h5> Liabilities </h5>
                {/* CREDIT CARDS */}
                <div>
                    <SubHeading text = "CREDIT CARDS: " />
                    <div>
                        <div className = "row">
                            <div className = "ml-4 mr-3 mt-2 col">
                                <Heading text = "Balance (in $)" />
                                <input 
                                    type = "number" 
                                    value = {creditCardBalance}
                                    onChange = {(e) => setCreditCardBalance(e.target.value)} 
                                    className = "input"
                                />
                            </div>
                            <div className = "ml-4 mr-3 col">
                            <SubHeading 
                                text = "TOTAL CREDIT CARD BALANCE: " 
                                value = {getTotalCreditCardBalance()}
                            />
                            </div>
                        </div>
                    </div>
                    <div className = "ml-4 mt-3 text-center">
                        <button 
                            className = "btn expand btn-dark"
                            onClick = {addCreditCard} 
                            > Add Credit Card 
                        </button>
                    </div>
                    <CreditCardTable data = {creditCards} remove = {(data) => removeCreditCard(data)} />
                </div>

                {/* PERSONAL LOANS */}
                <div>
                    <SubHeading text = "PERSONAL LOANS: " />
                    <div className = "row">
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Balance (in $)" />
                            <input 
                                type = "number" 
                                value = {personalLoanBalance}
                                onChange = {(e) => setPersonalLoanBalance(e.target.value)} 
                                className = "input"
                            />  
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Monthly Repayment (in $)" />
                            <input 
                                type = "number" 
                                value = {personalLoanRepayment}
                                onChange = {(e) => setPersonalLoanRepayment(e.target.value)} 
                                className = "input"
                            />
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col"></div>
                    </div>
                    <div className = "ml-4 mt-3 text-center">
                        <button
                            className = "btn expand btn-dark"
                            onClick = {addPersonalLoan}
                        > Add Personal Loan </button>
                    </div>
                    <PersonalLoanTable data = {personalLoans} remove = {(data) => removePersonalLoan(data)} />
                </div>

                {/* MORTGAGES */}
                <div>
                    <SubHeading text = "MORTGAGES: " />
                    <div>
                        <div className = "row">
                            <div className = "ml-4 mr-3 mt-2 col">
                                <Heading text = "Balance (in $)" />
                                <input 
                                    type = "number" 
                                    value = {mortgageBalance}
                                    onChange = {(e) => setMortgageBalance(e.target.value)} 
                                    className = "input"
                                />  
                            </div>
                            <div className = "ml-4 mr-3 mt-2 col">
                                <Heading text = "Monthly Repayment (in $)" />
                                <input 
                                    type = "number" 
                                    value = {mortgageRepayment}
                                    onChange = {(e) => setMortgageRepayment(e.target.value)} 
                                    className = "input"
                                />
                            </div>
                            <div className = "ml-4 mr-3 mt-2 col"></div>
                        </div>
                        <div className = "row">
                            <div className = "ml-4 mr-3 mt-2 col">
                                <Heading text = "Lender Name" />
                                <input 
                                    type = "text" 
                                    value = {mortgageLenderName}
                                    onChange = {(e) => setMortgageLenderName(e.target.value)} 
                                    placeholder = "Lender Name"
                                    className = "input"
                                />  
                            </div>
                            <div className = "ml-4 mr-3 mt-2 col">
                                <Heading text = "Property Value (in $)" />
                                <input 
                                    type = "number" 
                                    value = {propertyValue}
                                    onChange = {(e) => setPropertyValue(e.target.value)} 
                                    className = "input"
                                />
                            </div>
                            <div className = "ml-4 mr-3 mt-2 col"></div>
                        </div>
                        <div className = "ml-4 mt-3 text-center">
                            <button 
                                className = "btn expand btn-dark"
                                onClick = {addMortgage}
                            > Add Mortgage </button>
                        </div>
                    </div>
                    <MortgageTable data = {mortgages} remove = {(data) => removeMortgage(data)}/>
                </div>

                {/* VEHICLE LOANS */}
                <SubHeading text = "VEHICLE LOANS: " />
                <div>
                    <div className = "row">
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Balance (in $)" />
                            <input 
                                type = "number" 
                                value = {vehicleLoanBalance}
                                onChange = {(e) => setVehicleLoanBalance(e.target.value)} 
                                className = "input"
                            />  
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Monthly Repayment (in $)" />
                            <input 
                                type = "number" 
                                value = {vehicleLoanRepayment}
                                onChange = {(e) => setVehicleLoanRepayment(e.target.value)} 
                                className = "input"
                            />
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col"></div>
                    </div>
                    <div className = "ml-4 mt-3 text-center">
                        <button 
                            className = "btn expand btn-dark"
                            onClick = {addVehicleLoan}
                        > Add Vehicle Loan </button>
                    </div>
                    <VehicleLoanTable data = {vehicleLoans} remove = {(data) => removeVehicleLoan(data)} />
                </div>

                {/* OTHER LIABILITIES */}
                <SubHeading text = "OTHER LIABILITIES: " />
                <div>
                    <div className = "row">
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Balance (in $)" />
                            <input 
                                type = "number" 
                                value = {otherLiabilityBalance}
                                onChange = {(e) => setOtherLiabilityBalance(e.target.value)} 
                                className = "input"
                            />  
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col">
                            <Heading text = "Monthly Repayment (in $)" />
                            <input 
                                type = "number" 
                                value = {otherLiabilityRepayment}
                                onChange = {(e) => setOtherLiabilityRepayment(e.target.value)} 
                                className = "input"
                            />
                        </div>
                        <div className = "ml-4 mr-3 mt-2 col"></div>
                    </div>
                    <div className = "ml-4 mt-3 text-center">
                        <button 
                            className = "btn expand btn-dark"
                            onClick = {addOtherLiability}
                        > Add Other Liability </button>
                    </div>
                    <OtherLiabilityTable data = {otherLiabilities} remove = {(data) => removeOtherLiability(data)} />
                </div>

                <SubHeading 
                    text = "TOTAL MONTHLY REPAYMENTS: " 
                    value = {getTotalRepayments()}
                />

                {/* BUY NOW PAY LATER ACCOUNTS */}
                <SubHeading text = "NO. OF BUY NOW PAY LATER ACCOUNTS: " />
                <div className = "ml-4 mt-1">
                    <Dropdown>
                        <DropdownButton text = {buyNowPayLaterAccounts} />
                        <Dropdown.Menu style = {{ margin: 0 }}>
                        {count.map((text) => {
                            return (
                                <Dropdown.Item
                                    key = {text}
                                    className = "dropdown-item" 
                                    href = "#" 
                                    onClick = {() => setBuyNowPayLaterAccounts(Number(text))} 
                                    > {text}
                                </Dropdown.Item>)
                        })}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>

            </div>

            <div style = {!buttonLoading ? {display: "none"} : null}>
                <Loader />
            </div>
            <div className = "mt-3 message">
                {message}
            </div>
            <div>
                <button 
                    className = "btn btn-dark btn-lg expand mt-4" 
                    onClick = {(e) => submit(e)}> Submit 
                </button>
            </div>

        </div>
    );
}

export default ExtendedQuestions;