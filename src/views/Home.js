import React, { useEffect, useState } from "react";
import { Box, Button, Flex, Input, Select } from "@chakra-ui/react";
import Axios from "axios";
import AutoCompSearch from './../components/AutoCompSearch'
import useDebounce from "../hooks/useDebounce";

const options = [
  {
    id: "2efe4",
    title: "tel-aviv",
  },
  {
    id: "435gf",
    title: "london",
  },
  {
    id: "000",
    title: "other",
  },
];

const api = (() => {
  const KEY = process.env.REACT_APP_WEATHER_API_KEY;
  return {
    getAutoComplete: (searchTerm) =>
      Axios.get(
        `http://dataservice.accuweather.com/locations/v1/cities/autocomplete?apikey=${KEY}&q=${searchTerm}`
      ),
  };
})();

function Home({ history }) {
  const [chosenCity, setChosenCity] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [searchPlaceRes, setSearchPlacesRes] = useState([]);
  const debouncedTerm = useDebounce(searchTerm);

  useEffect(() => {
    if (debouncedTerm) {
      console.log(debouncedTerm);
      api.getAutoComplete(debouncedTerm).then((res) => {
        console.log(res);
        const reconstRes = res.data.map((city) => ({
          id: city.Key,
          title: city.LocalizedName,
        }));
        setSearchPlacesRes(reconstRes);
      });
    }
  }, [debouncedTerm]);

  const handleSelect = (e) => {
    const cityId = e.target.value;
    console.log(cityId)
    const cityObj = [...options, ...searchPlaceRes].find(
      (op) => op.id === cityId
    );
    
    console.log(cityObj);
    if (cityObj.id === "000") {
      setShowInput(true);
      setChosenCity(null);
      return;
    }
    setSearchPlacesRes([])
    setChosenCity(cityObj);
  };

  const handleClick = () => {
    console.log(history);
  };

  const handleInput = (e) => {
    const term = e.target.value.trim();
    setChosenCity(null);
    setSearchTerm(term);
  };

  return (
    <Flex w="100%" h="100vh" justify="center" mt="20px">
      <Box
        w="500px"
        h="300px"
        border="solid 1px gray"
        rounded="5px"
        textAlign="left"
        p="10px"
      >
        <Flex mb="20px" w="300px" justify="space-between">
          <Select
            placeholder="Please select location"
            w="200px"
            onChange={handleSelect}
          >
            {options.map((op) => (
              <option key={op.id} value={op.id}>
                {op.title}
              </option>
            ))}
          </Select>
          <Button
            disabled={!chosenCity}
            colorScheme="blue"
            onClick={handleClick}
          >
            submit
          </Button>
        </Flex>
        {showInput && (
          <Input
            type="text"
            w="200px"
            onChange={handleInput}
            roundedBottom="0px"
          />
        )}
        {!!searchPlaceRes.length && (
          <Box
            backgroundColor="gray.50"
            w="200px"
            border="solid 1px black"
            p="5px"
          >
            {searchPlaceRes.map((place) => (
              <option key={place.id} value={place.id} onClick={handleSelect}>
                {place.title}
              </option>
            ))}
          </Box>
        )}
      </Box>
    </Flex>
  );
}

export default Home;
