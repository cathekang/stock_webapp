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

  export default function Cand({isOpen, onClose}) {
    const [ticker, setTicker] = useState("");

    const setCandlestickStock = () => {
        axios({
            method: "post",
            url: "/candlestick_stock",
            data: JSON.stringify({"ticker": ticker}),
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
                        <ModalHeader> Stock Symbol</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={8}>
                                <Input
                                    value = {ticker}
                                    onChange= {(event) => setTicker(event.target.value)}
                                    focusBorderColor= "blue"
                                    variant = "flushed"
                                    placeholder = "Ticker"
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bg = "#127DE2"
                                color = "white"
                                size = "lg"
                                onClick = {setCandlestickStock}
                            >
                                View Stock
                            </Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
  }