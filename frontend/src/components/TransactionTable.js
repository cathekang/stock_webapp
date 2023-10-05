import React from "react";
import {
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption,
    StackDivider
} from "@chakra-ui/react";

import TransactionItem from "./TransactionItem";

export default function TransactionTable({transactions}) {
    return (
        <VStack bg= "white"
            borderWidth = '3px'
            borderColor = "#127DE2"
            divider = {<StackDivider borderColor = "gray.200"/>}
        >
            <Text fontWeight="bold" color = "#127DE2">
                Recent Transactions </Text>
            <Table size="sm"
                colorScheme = "blackAlpha"
                variant = "striped"
                color= "#127DE2">
                <TableCaption color = "#127DE2"> 
                    All buy and sell records
                </TableCaption>
                <Thead>
                    <Tr>
                    <Th color = "#127DE2"> Ticker </Th>
                    <Th color = "#127DE2"> Company </Th>
                    <Th color = "#127DE2"> Number of Shares </Th>
                    <Th color = "#127DE2"> Selling Price</Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {transactions.map((tran,index) => {
                        return (
                            <TransactionItem key={index} transaction={tran}></TransactionItem>
                        )
                    })}
                </Tbody>
            </Table>
        </VStack>
    );
}