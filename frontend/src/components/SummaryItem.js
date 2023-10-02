import React from "react";
import {Tr, Td} from "@chakra-ui/react";

export default function SummaryItem({stock}) {
    return (
        <Tr>
            <Td> {stock.ticker}</Td>
            <Td> {stock.company}</Td>
            <Td isNumeric> {stock.shares}</Td>
            <Td isNumeric > ${stock.price_at_purchase.toFixed(2)}</Td>
        </Tr>
    );
}