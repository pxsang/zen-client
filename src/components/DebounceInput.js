import React, {useState, useEffect} from 'react';
import {Input} from '@ui-kitten/components';
import useDebounce from '../hooks/useDebounce';

const DebounceInput = props => {
  let [value, setValue] = useState();

  const handleInputOnChangeText = nextValue => {
    setValue(nextValue);
  };

  const debouncedSearchTerm = useDebounce(value, 500);

  useEffect(() => {
    props.onSearch(debouncedSearchTerm);
  }, [debouncedSearchTerm]);

  return (
    <Input
      {...props}
      value={value}
      onChangeText={handleInputOnChangeText}
    />
  )
}

export default DebounceInput;
