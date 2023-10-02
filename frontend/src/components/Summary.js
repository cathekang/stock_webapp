import React from "react";
import {
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
} from "@chakra-ui/react";
import SummaryItem from "./SummaryItem";

export default function Summary({portfolio}) {
    return (
        <VStack bg= "#20B2AA" >
            <Text> Your Portfolio </Text>
            <Table size="sm" variant = "striped" colorScheme="whiteAlpha">
                <Thead>
                    <Tr>
                    <Th> Ticker </Th>
                    <Th> Company </Th>
                    <Th> Number of Shares </Th>
                    <Th> Average Buying Price </Th>
                    </Tr>
                </Thead>
                <Tbody>
                    {portfolio.map((stock,index) => {
                        return (
                            <SummaryItem key={index} stock = {stock}> </SummaryItem>
                        )
                    })}
                </Tbody>
            </Table>
        </VStack>
    );
}