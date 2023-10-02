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
    return (
        <VStack bg= "#6495ED">
            <Text> Recent Transactions </Text>
            <Table size="sm" variant = "striped" colorScheme="whiteAlpha">
                <TableCaption> All buy and sell records</TableCaption>
                <Thead>
                    <Tr>
                    <Th> Ticker </Th>
                    <Th> Company </Th>
                    <Th> Number of Shares </Th>
                    <Th> Selling Price</Th>
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