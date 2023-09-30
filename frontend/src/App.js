import './App.css';
import axios from 'axios';
import {useState, useEffect} from 'react';
import {Button,
        Center,
        Text,
        Heading,
        VStack,
        ChakraProvider,
        HStack} from '@chakra-ui/react';

import Summary from "./components/Summary.js";

function App() {
  const [portfolio, setPortfolio] = useState([]);
  useEffect(()=> {
    axios.get("/api").then(res => setPortfolio(res.data));
  }, []);

  return (
    <>
    <ChakraProvider>
      <Center bg= "	#6495ED" color = "white" padding={8}>
        <VStack spacing = {5}>
          <Heading> Paper Trading </Heading>
          <Text> This is the current state of your portfolio</Text>
          {/*<Summary people={portfolio}> </Summary>*/}
          <HStack spacing = "50px">
            <Button size="lg" colorScheme="green" variant="solid"> Buy </Button>
            <Button size="lg" colorScheme="red" variant="solid"> Sell </Button>
          </HStack>
        </VStack>
      </Center>
    </ChakraProvider>
    </>
  ) 
}

export default App;
