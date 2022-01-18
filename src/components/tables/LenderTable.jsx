import React from "react";
import { Table } from "react-bootstrap";

const LenderTable = (props) => {

    const select = (interestRate, lenderName) => {
        if (!props.extended) {
            window.location = `/lender/${props.id}`;
        }
    }

    return (
        <div className = "mt-4">
        <Table borderless responsive>
            <thead className = "table-head">
                <tr>
                    <th> Lender Name </th>
                    <th> Interest Rate % </th>
                    <th> Comparison Rate % </th>
                    <th> Loan Repayment ({props.frequency}) </th>
                    <th> Select Lender </th>
                </tr>
            </thead>
            <tbody>
                {props.data.map((lender) => {
                    return (
                    <tr key = {lender.lenderName}>
                        <td className = "table-row"> {lender.lenderName} </td>
                        <td className = "table-row"> {lender.interestRate} </td>
                        <td className = "table-row"> {lender.comparisonRate} </td>
                        <td className = "table-row"> {lender.loanRepayment} </td>
                        <td className = "table-row"> 
                            <button 
                                className = "btn btn-sm expand btn-dark"
                                onClick = {() => select(lender.interestRate, lender.lenderName)}
                            > Select </button> 
                        </td>
                    </tr>
                    )
                })}
            </tbody>
        </Table>
        </div>
    )
}

export default LenderTable;