import React from "react";
import { Box, Select } from "@chakra-ui/react";

function AutoCompSearch({ isSelect, results, handleSelect }) {
  const renderRes = () => {
    return results.map((res) => (
      <option key={res.id} value={res.id} onClick={handleSelect}>
        {res.title}
      </option>
    ));
  };

  const renderWrapper = () => {
    if (isSelect) {
      return (
        <Select
          placeholder="Please select location"
          w="200px"
          onChange={handleSelect}
        >
          {renderRes()}
        </Select>
      );
    }

    return (
      <Box
        backgroundColor="gray.50"
        w="200px"
        border="solid 1px black"
        p="5px"
        display={!results.length && "none"}
      >
        {renderRes()}
      </Box>
    );
  };
  
  return <>{renderWrapper()}</>;
}

export default AutoCompSearch;
