import React  from "react";
import Cross from "../helper/Cross";
import Tick from "../helper/Tick";
import QuestionMark from "../helper/QuestionMark";

const VALID = "Valid";
const INVALID = "Invalid";

const Hashtag = (props) => {

    const setIcon = (value) => {
        if (value === VALID) return <Tick />
        else if (value === INVALID) return <Cross />
        return <QuestionMark />
    }

    return (
        <tbody>
            {/* AGE */}
            <tr>
                <td className = "table-row"> Age </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isAgeValid)}
                        </td>
                    )
                })}
            </tr>
            {/* EMPLOYMENT STATUS VALID */}
            <tr>
                <td className = "table-row"> Employment Status </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isEmploymentStatusValid)}
                        </td>
                    )
                })}
            </tr>
            {/* RESIDENCY STATUS VALID */}
            <tr>
                <td className = "table-row"> Residency Status </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isResidencyStatusValid)}
                        </td>
                    )
                })}
            </tr>
            {/* LOAN AMOUNT */}
            <tr>
                <td className = "table-row"> Loan Amount </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isLoanAmountValid)}
                        </td>
                    )
                })}
            </tr>
            {/* LOAN TERM VALID */}
            <tr>
                <td className = "table-row"> Loan Term </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isLoanTermValid)}
                        </td>
                    )
                })}
            </tr>
            {/* CREDIT SCORE */}
            <tr>
                <td className = "table-row"> Credit Score </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isCreditScoreValid)}
                        </td>
                    )
                })}
            </tr>
            {/* RESIDENCE STABILITY */}
            <tr>
                <td className = "table-row"> Residence Stability </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isResidenceStable)}
                        </td>
                    )
                })}
            </tr>
            {/* REPAYMENT FREQUENCY */}
            <tr>
                <td className = "table-row"> Repayment Frequency </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isRepaymentFrequencyValid)}
                        </td>
                    )
                })}
            </tr>
            {/* VEHICLE AGE */}
            <tr>
                <td className = "table-row"> Vehicle Age </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isVehicleAgeValid)}
                        </td>
                    )
                })}
            </tr>
            {/* ADVERSE FILE VALID */}
            <tr>
                <td className = "table-row"> Adverse File </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isAdverseFileValid)}
                        </td>
                    )
                })}
            </tr>
            {/* CREDIT FILE AGE */}
            <tr>
                <td className = "table-row"> Credit File Age </td>
                    {props.data.map((lender) => {
                        return (
                            <td className = "table-row" key = {lender.lenderName}> 
                                {setIcon(lender.isCreditFileAgeValid)}
                            </td>
                        )
                    })}
            </tr>
            {/* MAX RHI MOST RECENT */}
            <tr>
                <td className = "table-row"> Max Rhi Most Recent </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isMaxRhiMostRecentValid)}
                        </td>
                    )
                })}
            </tr>
            {/* MAX RHI 3 MONTHS */}
            <tr>
                <td className = "table-row"> Max Rhi 3 months </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isMaxRhi3monthsValid)}
                        </td>
                    )
                })}
            </tr>
            {/* MAX RHI 12 MONTHS */}
            <tr>
                <td className = "table-row"> Max Rhi 12 months </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isMaxRhi12monthsValid)}
                        </td>
                    )
                })}
            </tr>
            {/* MAX RHI 24 MONTHS */}
            <tr>
                <td className = "table-row"> Max Rhi 24 months </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isMaxRhi24monthsValid)}
                        </td>
                    )
                })}
            </tr>
            {/* INSOLVENCY */}
            <tr>
                <td className = "table-row"> Insolvency </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isInsolvencyValid)}
                        </td>
                    )
                })}
            </tr>
            {/* FINANCIAL DF */}
            <tr>
                <td className = "table-row"> Financial DF </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isFinancialDFValid)}
                        </td>
                    )
                })}
            </tr>
            {/* NON FINANCIAL DF */}
            <tr>
                <td className = "table-row"> Non Financial DF </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isNonFinancialDFValid)}
                        </td>
                    )
                })}
            </tr>
            {/* OTHER COURT ACTIONS */}
            <tr>
                <td className = "table-row"> Other Court Actions </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isOtherCourtActionsValid)}
                        </td>
                    )
                })}
            </tr>
            {/* BALLOON */}
            <tr>
                <td className = "table-row"> Balloon </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isBalloonValid)}
                        </td>
                    )
                })}
            </tr>
            {/* ODOMETER READING */}
            <tr>
                <td className = "table-row"> Odometer Reading </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isOdometerReadingValid)}
                        </td>
                    )
                })}
            </tr>
            {/* LVR VALUE */}
            <tr>
                <td className = "table-row"> LVR Value </td>
                {props.data.map((lender) => {
                    return (
                        <td className = "table-row" key = {lender.lenderName}> 
                            {setIcon(lender.isLvrValid)}
                        </td>
                    )
                })}
            </tr>
        </tbody>
    )
}

export default Hashtag;