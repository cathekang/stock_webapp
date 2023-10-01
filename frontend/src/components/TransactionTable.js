import React from "react";
import {
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    TableCaption
} from "@chakra-ui/react";

import TransactionItem from "./TransactionItem";

export default function TransactionTable({transactions}) {
    console.log("Transaction table")
    return (
        <VStack>
            <Text> Recent Transactions </Text>
            <Table size="sm" variant = "striped" colorScheme="whiteAlpha" width={20}>
                <TableCaption> All buy and sell records</TableCaption>
                <Thead>
                    <Tr>
                    <Th> Ticker </Th>
                    <Th> Company </Th>
                    <Th> Number of Shares </Th>
                    <Th> Purchase Price</Th>
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