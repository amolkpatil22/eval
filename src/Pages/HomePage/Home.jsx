import { Box, Button, Flex, Heading, Image, Input, Text, useDisclosure } from "@chakra-ui/react"
import { Select } from '@chakra-ui/react'
import { useEffect, useState } from "react"
import { shallowEqual, useDispatch, useSelector } from "react-redux"
import { dataFetch } from "./action"
import { SingleCard } from "../../Components/SingleCard"
import { Spinner } from '@chakra-ui/react'
import { useSearchParams } from "react-router-dom"
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
} from '@chakra-ui/react'

export const HomePage = () => {
    let dispatch = useDispatch()
    let btn = new Array(10).fill(0)
    let [localdata, setlocaldata] = useState(null)
    let [para, setpara] = useState({ page: 1 })
    let [id, setid] = useState(null)
    let [modaldata, setmodaldata] = useState(null)
    const { isOpen, onOpen, onClose } = useDisclosure()
    let { data, isLoading, isError } = useSelector((store) => {
        return {
            data: store.homeReducer.data,
            isLoading: store.homeReducer.isLoading,
            isError: store.homeReducer.isError
        }
    }, shallowEqual)


    useEffect(() => {
        if (data.length == 0) {
            dispatch(dataFetch(para))
        }
        if (data.length !== 0) {
            setlocaldata(data)
        }
    }, [data])

    useEffect(() => {
        console.log(para)
        dispatch(dataFetch(para))
    }, [para])



    const ChangePage = (e) => {
        setpara(e)
    }

    const searchChange = (e) => {
        let val = e.target.value
        let newdata = localdata.filter((a) => {
            if (a.name.includes(val.toUpperCase())) {
                return a
            }
        })
        setlocaldata(newdata)
    }

    const modelChange = (id) => {
        let newdata = localdata.filter((e) => e.id == id)
        setmodaldata((prev) => newdata[0])
    }



    const sortChange = (e) => {
        setpara({ ...para, order: e.target.value })
    }
    console.log(data)
    return (
        <Box backgroundColor={"black"} minHeight={"700px"} paddingBottom={"50px"}>
            <Flex
                fontWeight={"bold"}
                borderRadius={"10px"}
                justifyContent={"space-between"}
                padding={"15px"}
                backgroundColor={"rgb(238,188,29)"}
                alignItems={"center"}
            >
                <Flex gap={"5px"} alignItems={"center"}>
                    <Heading fontSize={"medium"}>
                        Coins
                    </Heading>
                    <Input onChange={searchChange} placeholder="Search by Name"></Input>
                </Flex>
                <Flex>
                    Price
                </Flex>
                <Flex>
                    24h Change
                </Flex>
                <Flex gap={"5px"}>
                    <Heading fontSize={"medium"}>
                        Market Cap
                    </Heading>
                    <Select onChange={sortChange} placeholder='Sort'>
                        <option value='market_cap_asc'>ASC</option>
                        <option value='market_cap_desc'>DESC</option>
                    </Select>
                </Flex>
            </Flex>
            {isLoading && <Spinner
                thickness='4px'
                speed='0.65s'
                emptyColor='gray.200'
                color='blue.500'
                size='xl'
                marginTop={"250px"}
            />}
            <Box width={"99%"} margin={"auto"} >
                {localdata?.map((e) => {
                    return (<Box onClick={() => { modelChange(e.id); onOpen() }}><SingleCard key={e.id} {...e} /></Box>)
                })}
            </Box>
            <Box>
                <Flex justifyContent={"space-between"} width={"50%"} margin={"auto"} marginTop={"50px"} >
                    {btn.map((e, ind) => <Button isDisabled={para.page == ind + 1} onClick={() => ChangePage(ind + 1)}>{ind + 1}</Button>)}
                </Flex>
            </Box>
            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent backgroundColor={"grey"} color={"white"}>
                    <ModalHeader>{modaldata?.name}</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        <Box>
                            <Image width={"100px"} src={modaldata?.image}></Image>
                            <Text>name: {modaldata?.name}</Text>
                            <Text>Market Cap Rank: ${modaldata?.market_cap_rank}</Text>
                            <Text>Symbol: {modaldata?.symbol}</Text>
                            <Text>Current Price: ${modaldata?.current_price}</Text>
                            <Text>Price Change 24 Hour: ${modaldata?.price_change_24h}</Text>
                            <Text>Total Volume: {modaldata?.total_volume}M</Text>
                            <Text>Low 24 hour: ${modaldata?.low_24h}</Text>
                            <Text>High 24 Hour: ${modaldata?.high_24h}</Text>
                            <Text>Total Supply: {modaldata?.total_supply}</Text>
                            <Text>Max Supply: {modaldata?.max_supply}</Text>
                            <Text>Circulating Supply: {modaldata?.circulating_supply}</Text>
                            <Text>All Time High: ${modaldata?.ath}</Text>
                            <Text>Last Updated Date: {modaldata?.last_updated}</Text>
                        </Box>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme='blue' mr={3} onClick={onClose}>
                            Close
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box >
    )
}