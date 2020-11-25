import React from "react";
import { Select } from "@chakra-ui/react";
function SelectPlace(handleSelect, options) {
  return (
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
  );
}

export default SelectPlace;
