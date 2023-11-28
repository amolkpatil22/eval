import { Box, Flex, Heading, Image, Stack, Text } from "@chakra-ui/react"
import { useState } from "react"


export const SingleCard = ({ image, symbol, name, price_change_percentage_24h, current_price, market_cap }) => {
    price_change_percentage_24h = price_change_percentage_24h.toFixed(2)
    let [priceColor, setpriceColor] = useState(price_change_percentage_24h < 0 ? "red" : "green")
    return (
        <Flex
            color={"white"} justifyContent={"left"}
            marginTop={"20px"} alignItems={"center"}
            borderBottom={"solid grey 1px"}
            paddingBottom={"20px"}
        >
            <Box width={"300px"}>
                <Flex gap={"10px"}  >
                    <Image width={"50px"} height={"50px"} src={image}></Image>
                    <Box textAlign={"left"}>
                        <Heading size={"md"}>{symbol}</Heading>
                        <Text fontSize={"smaller"}>{name.toUpperCase()}</Text>
                    </Box>
                </Flex>
            </Box >
            <Text width={"200px"} textAlign={"right"} marginRight={"300px"}>${current_price}</Text>
            <Text
                width={"200px"} textAlign={"right"} marginRight={"200px"}
                color={priceColor}>{price_change_percentage_24h < 0 ? `${price_change_percentage_24h}` : `+${price_change_percentage_24h}`}</Text>
            <Text
                width={"300px"} textAlign={"right"}
            >${market_cap}M</Text>
        </Flex >
    )
}