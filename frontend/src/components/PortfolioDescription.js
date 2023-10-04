import React from 'react';
import { Text,
        VStack,
		Container,
		HStack
        } from '@chakra-ui/react';

export default function ProjectDescription({
	portfoliocost,
	portfoliovalue,
	absolutegain,
	percentGain}){
	return (
		<HStack spacing = {6}>
			<Container border='2px' borderColor='gray.200'  bg='#9932CC'>
				<VStack width = {40}>
					<Text size="md" fontSize="xs">Portfolio Cost</Text>
					<Text fontSize="2xl">${portfoliocost.toFixed(2)}</Text>
				</VStack>
			</Container>
			<Container border='2px' borderColor='gray.200'  bg='#6809E5'>
				<VStack width = {40}>
					<Text size="md" fontSize="xs">Portfolio Value</Text>
					<Text fontSize="2xl">${portfoliovalue.toFixed(2)}</Text>
				</VStack>
			</Container>
			<Container border='2px' borderColor='gray.200' bg='#6809E5'>
				<VStack width = {40}>
					<Text size="md" fontSize="xs">Gain</Text>
					<Text fontSize="2xl">${absolutegain.toFixed(2)}</Text>
				</VStack>
			</Container>
			<Container border='2px' borderColor='gray.200' bg='#6809E5'>
				<VStack width = {40}>
					<Text size="md" fontSize="xs">Percent Gain</Text>
					<Text fontSize="2xl">%{percentGain.toFixed(2)}</Text>
				</VStack>
			</Container>
		</HStack>
	);
}