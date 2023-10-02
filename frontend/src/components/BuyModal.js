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

  export default function BuyModal({isOpen, onClose}) {
    const [ticker, setTicker] = useState("");
    const [shares, setShares] = useState(0.0);

    const buyStock = () => {
        axios({
            method: "post",
            url: "/buy",
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
                        <ModalHeader> Buy Stock</ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <VStack spacing={8}>
                                <Input
                                    value = {ticker}
                                    onChange= {(event) => setTicker(event.target.value)}
                                    focusBorderColor= "green"
                                    variant = "flushed"
                                    placeholder = "Ticker"
                                />
                                <Input
                                    value = {shares}
                                    onChange= {(event) => setShares(event.target.value)}
                                    focusBorderColor= "green"
                                    variant = "flushed"
                                    placeholder = "Number of Shares"
                                />
                            </VStack>
                        </ModalBody>
                        <ModalFooter>
                            <Button
                                bg = "green"
                                color = "white"
                                size = "lg"
                                onClick = {buyStock}
                            >
                                Buy Stock
                            </Button>
                        </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    );
  }