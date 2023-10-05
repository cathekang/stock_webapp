import React from "react";
import {
    Text,
    VStack,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    StackDivider
} from "@chakra-ui/react";
import SummaryItem from "./SummaryItem";

export default function Summary({portfolio}) {
    return (
        <VStack bg= "white" 
            borderWidth='3px'
            borderColor = "#127DE2"
            divider = {<StackDivider borderColor = "gray.200"/>}
        >
            <Text fontWeight = "bold" color ="#127DE2">
                Your Portfolio </Text>
            <Table size="sm"
                color = "#127DE2" 
                variant = "striped"
                colorScheme="blackAlpha">
                <Thead >
                    <Tr>
                    <Th color = "#127DE2"> Ticker </Th>
                    <Th color = "#127DE2"> Company </Th>
                    <Th color = "#127DE2"> Number of Shares </Th>
                    <Th color = "#127DE2"> Average Buying Price </Th>
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