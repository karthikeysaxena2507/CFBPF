import React from "react";
import { Table } from "react-bootstrap";

const EmploymentsTable = (props) => {
    return (
        <div className = "mt-4 table" style = {(props.data.length === 0) ? {display: "none"} : null}>
            <Table  borderless responsive>
                <thead className = "text-center">
                    <tr className = "table-head">
                        <th> Employer </th>
                        <th> Occupation </th>
                        <th> Employment Type </th>
                        <th> Employment Months </th>
                        <th> Remove </th>
                    </tr>
                </thead>
                <tbody>
                    {props.data.map((data, id) => {
                        return (
                            <tr key = {id} className = "text-center">
                                <td className = "table-row"> {data.employer} </td>
                                <td className = "table-row"> {data.occupation} </td>
                                <td className = "table-row"> {data.employmentType} </td>
                                <td className = "table-row"> 
                                    {(data.employmentYears * 12) + data.employmentMonths} 
                                </td>
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

export default EmploymentsTable;