import React from "react";
import { Table } from "react-bootstrap";
import CriteriaTableRows from "../helper/CriteriaTableRows";
import ExtendedCriteriaTableRows from "../helper/ExtendedCriteriaTableRows";

const CriteriaTable = (props) => {

    return (
        <div className = "mt-4">
        <Table borderless responsive>
            <thead className = "table-head">
                <tr>
                    <th> Criteria </th>
                    {props.preLenders.map((lender) => {
                        return (
                            <th key = {lender.lenderName}> {lender.lenderName} </th>
                        )
                    })}
                </tr>
            </thead>
            <CriteriaTableRows data = {props.preLenders} />
            <ExtendedCriteriaTableRows data = {props.extendedLenders} />
        </Table>
        </div>
    )
}

export default CriteriaTable;