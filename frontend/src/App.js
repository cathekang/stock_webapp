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
        useDisclosure,
        extendTheme} from '@chakra-ui/react';

import Summary from "./components/Summary.js";
import TransactionTable from './components/TransactionTable.js';
import BuyModal from './components/BuyModal'; 
import SellModal from './components/SellModal';
import ProjectDescription from './components/PortfolioDescription';
import CandleStick from './components/CandlestickChart';
import CandlestickModal from './components/CandlestickModal';

function App() {
  const theme = extendTheme({
    colors: {
      brand: {
        100: "#90E614",
        500: "#EC414B",
        900: "#127DE2",
      },
    },
  })

  const [portfolio, setPortfolio] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [portfolioCost, setPortfolioCost] = useState(0);
  const [portfolioValue, setPortfolioValue] = useState(0);
  const [absoluteGain, setAbsGain] = useState(0);
  const [percentGain, setPercentage] = useState(0);
  const [candlstickData, setData] = useState([]);
  const [candlestickSymbol, setSymbol] = useState("");
  const buyModal = useDisclosure();
  const sellModal = useDisclosure();
  const candlestickModal = useDisclosure();

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
  useEffect(() => {
    axios.get("get_portfolio_cost").then(res => setPortfolioCost(res.data));
  }, [buyModal.isOpen, sellModal.isOpen]);
  useEffect(() => {
    axios.get("get_portfolio_value").then(res => setPortfolioValue(res.data));
  }, [buyModal.isOpen, sellModal.isOpen]);
  useEffect(() => {
    axios.get("get_abs_gain").then(res => setAbsGain(res.data));
  }, [buyModal.isOpen, sellModal.isOpen]);
  useEffect(() => {
    axios.get("get_gain_percent").then(res => setPercentage(res.data));
  }, [buyModal.isOpen, sellModal.isOpen]);
  useEffect(() => {
    axios.get("get_candlestick_data").then(res => setData(res.data));
  }, [candlestickModal.isOpen]); 
  useEffect(() => {
    axios.get("symbol").then(res => setSymbol(res.data));
  }, [candlestickModal.isOpen]); 

  return (
    <html>
    <ChakraProvider theme={theme}>
      <BuyModal isOpen={buyModal.isOpen} 
        onClose={buyModal.onClose}>
      </BuyModal>
      <SellModal isOpen={sellModal.isOpen} 
        onClose={sellModal.onClose}>
      </SellModal>
      <CandlestickModal 
        isOpen={candlestickModal.isOpen} 
        onClose={candlestickModal.onClose}>
      </CandlestickModal>
      <Center color = "white" padding={5}>
        <VStack spacing = {6}>
          <Heading fontWidth = "bold"> Paper Trading </Heading>
          <Text> This is the current state of your portfolio </Text>
          <ProjectDescription portfoliocost={portfolioCost} 
            portfoliovalue={portfolioValue}
            absolutegain={absoluteGain}
            percentGain = {percentGain}></ProjectDescription>
          <HStack align = "stretch"  spacing={15}>
            <Summary portfolio={portfolio}> </Summary>
            <TransactionTable transactions={transactions}></TransactionTable>
            </HStack>
            <HStack align = "stretch" spacing = {15}>
              <Button size="lg" 
                bg = "brand.100" 
                colorScheme="green" 
                variant="solid" 
                onClick={buyModal.onOpen}> Buy </Button>
              <Button size="lg" 
                bg = "brand.500" 
                colorScheme="red"
                variant="solid" 
                onClick={sellModal.onOpen}> Sell </Button>
              <Button size="lg"
                bg = "brand.900" 
                colorScheme="blue" 
                variant="solid" 
                onClick={candlestickModal.onOpen}> Search for Stocks </Button>
              <CandleStick 
                symbol={candlestickSymbol} 
                candlestick_data={candlstickData}></CandleStick>
            </HStack>
        </VStack>
      </Center>
    </ChakraProvider>
    </html>
  ) 
}

export default App;
