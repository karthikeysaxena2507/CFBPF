import React from "react";
import { Table } from "react-bootstrap";

const PersonalLoanTable = (props) => {
    return (
        <div className = "mt-4 table" style = {(props.data.length === 0) ? {display: "none"} : null}>
            <Table  borderless responsive>
                <thead className = "text-center">
                    <tr className = "table-head">
                        <th> Balance (in $) </th>
                        <th> Monthly Repayment (in $) </th>
                        <th> Remove Personal Loan </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((data, id) => {
                        return (
                            <tr key = {id} className = "text-center">
                                <td className = "table-row"> {data.balance} </td>
                                <td className = "table-row"> {data.repayment} </td>
                                <td className = "table-row"> 
                                    <button 
                                        className = "btn expand btn-sm btn-dark"
                                        onClick = {() => props.remove(data)}
                                    > Remove 
                                    </button> 
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </Table>
        </div>
    )
}

export default PersonalLoanTable;