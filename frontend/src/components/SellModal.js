import React, {useState} from "react";
import axios from 'axios';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    VStack,
    Input
  } from '@chakra-ui/react';

  export default function SellModal({isOpen, onClose}) {
    const [ticker, setTicker] = useState("");
    const [shares, setShares] = useState(0.0);

    const sellStock = () => {
        axios({
            method: "post",
            url: "/sell",
            data: JSON.stringify({"ticker":ticker, "shares": shares}),
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            },
        })
        .then(response => {
            console.log(response);
            onClose();
        })
        .catch(error => {
            console.log(error);
        });
        
    }
    return (
        <>
            <Modal isOpen = {isOpen} onClose = {onClose} size = "xl">
                <ModalOverlay />
                <ModalContent>
                        <ModalHeader> Sell Stock</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={8}>
                                <Input
                                    value = {ticker}
                                    onChange= {(event) => setTicker(event.target.value)}
                                    focusBorderColor= "tomato"
                                    variant = "flushed"
                                    placeholder = "Ticker"
                                />
                                <Input
                                    value = {shares}
                                    onChange= {(event) => setShares(event.target.value)}
                                    focusBorderColor= "tomato"
                                    variant = "flushed"
                                    placeholder = "Number of Shares"
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bg = "#EC414B"
                                color = "white"
                                size = "lg"
                                onClick = {sellStock}
                            >
                                Sell Stock
                            </Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
  }