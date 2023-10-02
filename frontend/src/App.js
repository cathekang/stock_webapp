import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Button,
        Center,
        Text,
        Heading,
        VStack,
        ChakraProvider,
        HStack,
        useDisclosure} from '@chakra-ui/react';

import Summary from "./components/Summary.js";
import TransactionTable from './components/TransactionTable.js';
import BuyModal from './components/BuyModal'; 
import SellModal from './components/SellModal';
import backgroundImage from './stock-market-pictures.jpg';

function App() {

  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolioCost, setPortfolioCost] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const buyModal = useDisclosure();
  const sellModal = useDisclosure();

  useEffect(()=> {
    axios.get("/portfolio")
    .then(res => setPortfolio(res.data))
    .catch(error => {
      console.log(error.data);
    });
  }, [buyModal.isOpen, sellModal.isOpen]);

  useEffect(()=> {
    axios.get("/transactions").then(res => setTransactions(res.data));
  }, [buyModal.isOpen, sellModal.isOpen]);

  
  return (
    <html>
    <ChakraProvider>
      <BuyModal isOpen={buyModal.isOpen} onClose={buyModal.onClose}></BuyModal>
      <SellModal isOpen={sellModal.isOpen} onClose={sellModal.onClose}></SellModal>
      <Center color = "white" padding={5}>
        <VStack spacing = {6}>
          <Heading> Paper Trading </Heading>
          <Text> This is the current state of your portfolio</Text>
          <HStack spacing = "50px">
            <Button size="lg" colorScheme="green" variant="solid" onClick={buyModal.onOpen}> Buy </Button>
            <Button size="lg" colorScheme="red" variant="solid" onClick={sellModal.onOpen}> Sell </Button>
          </HStack>
          <HStack spacing = "80px">
            <Summary portfolio={portfolio}> </Summary>
            <TransactionTable transactions={transactions}></TransactionTable>
            </HStack>
        </VStack>
      </Center>
    </ChakraProvider>
    </html>
  ) 
}

export default App;
