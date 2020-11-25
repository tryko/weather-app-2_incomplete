import React, { useEffect, useState } from "react";

function useDebounce(value) {
  const [deboouncedVal, setDebouncedVal] = useState(null);

  useEffect(() => {
    const handler = setTimeout(() => setDebouncedVal(value), 500);
    return () => {
      clearTimeout(handler);
    };
  }, [value]);
  
  return deboouncedVal;
}

export default useDebounce;
