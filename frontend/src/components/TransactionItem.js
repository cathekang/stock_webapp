import React from "react";
import {Tr, Td} from "@chakra-ui/react";

export default function TransactionItem({transaction}) {
    console.log(transaction)
    return (
        <Tr>
            <Td> {transaction.ticker}</Td>
            <Td> {transaction.company}</Td>
            <Td isNumeric> {transaction.shares}</Td>
            <Td isNumeric > ${transaction.price_at_purchase.toFixed(2)}</Td>
        </Tr>
    );
}