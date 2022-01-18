import React  from "react";
import Cross from "../helper/Cross";
import Tick from "../helper/Tick";
import QuestionMark from "../helper/QuestionMark";
import HashTag from "../helper/Hashtag";

const VALID = "Valid";
const INVALID = "Invalid";

const ExtendedCriteriaTableRows = (props) => {

    const setIcon = (value) => {
        if (value === VALID) return <Tick />
        else if (value === INVALID) return <Cross />
        return <QuestionMark />
    }

    return (
        <tbody>
            {/* NET USER SERVICEABILITY RATIO */}
            <tr>
                <td className = "table-row"> User Serviceability </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isUserServiceabilityValid)}
                        </td>
                    )
                })}
            </tr>
            {/* ANNUAL INCOME */}
            <tr>
                <td className = "table-row"> Annual Income </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isAnnualIncomeValid)}
                        </td>
                    )
                })}
            </tr>
            {/* NET SERVICEABILITY RATIO */}
            <tr>
                <td className = "table-row"> Serviceability </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isServiceabilityValid)}
                        </td>
                    )
                })}
            </tr>
            {/* PAY DAY LOANS */}
            <tr>
                <td className = "table-row"> Pay Day Loans </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.arePayDayLoansValid)}
                        </td>
                    )
                })}
            </tr>
            {/* DISHONOURS */}
            <tr>
                <td className = "table-row"> Dishonours </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.areDishonoursValid)}
                        </td>
                    )
                })}
            </tr>
            {/* GAMBLING AMOUNT */}
            <tr>
                <td className = "table-row"> Gambling Amount </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isGamblingAmountValid)}
                        </td>
                    )
                })}
            </tr>
            {/* EMPLOYMENT TENURE */}
            <tr>
                <td className = "table-row"> Employment Tenure  </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isEmploymentTenureValid)}
                        </td>
                    )
                })}
            </tr>
            {/* DRIVING LICENSE */}
            <tr>
                <td className = "table-row"> Driving License </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            <HashTag />
                        </td>
                    )
                })}
            </tr>
        </tbody>
    )
}

export default ExtendedCriteriaTableRows;