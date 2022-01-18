import React from "react";
import { Table } from "react-bootstrap";
import CriteriaTableRows from "../helper/CriteriaTableRows";

const CriteriaTable = (props) => {

    return (
        <div className = "mt-4">
        <Table borderless responsive>
            <thead className = "table-head">
                <tr>
                    <th> Criteria </th>
                    {props.data.map((lender) => {
                        return (
                            <th key = {lender.lenderName}> {lender.lenderName} </th>
                        )
                    })}
                </tr>
            </thead>
            <CriteriaTableRows data = {props.data} />
        </Table>
        </div>
    )
}

export default CriteriaTable;