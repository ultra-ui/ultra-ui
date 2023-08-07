import React, { Ref, forwardRef, memo, useCallback, useEffect, useImperativeHandle, useMemo, useState } from 'react';
import { GroupBase, MultiValue, SingleValue, StylesConfig } from 'react-select';
import { AsyncPaginate } from 'react-select-async-paginate';
import { Option, SelectAsyncProps, SelectAsyncRef } from './select-async.type';

const SelectAsync = forwardRef((props: SelectAsyncProps, ref: Ref<SelectAsyncRef>) => {
  const {
    value,
    defaultValue,
    isMulti,
    onChange,
    showSearch,
    disabled,
    allowClear,
    placeholder = 'Chọn...',
    loadOptions,
    labelKey = 'label',
    valueKey = 'value',
    closeMenuOnSelect
  } = props;
  const [data, setData] = useState<MultiValue<Option> | SingleValue<Option> | null>(null);

  const customStyles: StylesConfig<Option, boolean, GroupBase<Option>> = useMemo(
    () => ({
      control: (provided) => ({
        ...provided,
        borderRadius: '8px',
        borderColor: '#dfdfdf',
        height: '40px',
        ':hover': {
          boxShadow: 'none'
        }
      }),
      placeholder: (provided) => ({
        ...provided,
        color: '#cfcfcf'
      }),
      indicatorSeparator: (provided) => ({
        ...provided,
        width: 0
      })
    }),
    []
  );

  const onChangeData = useCallback(
    (selected: MultiValue<Option> | SingleValue<Option>) => {
      setData(selected);
      onChange && onChange(selected);
    },
    [onChange]
  );

  useImperativeHandle(ref, () => ({
    get: () => data,
    set: (newValue) => setData(newValue)
  }));

  useEffect(() => {
    if (typeof value !== 'undefined') {
      setData(value);
    }
  }, [value]);

  useEffect(() => {
    if (typeof defaultValue !== 'undefined') {
      setData(defaultValue);
    }
  }, [defaultValue]);

  return (
    <AsyncPaginate
      styles={customStyles}
      value={value}
      isDisabled={disabled}
      placeholder={placeholder}
      isMulti={isMulti}
      defaultValue={defaultValue}
      isClearable={allowClear}
      isSearchable={showSearch}
      loadOptions={loadOptions}
      closeMenuOnSelect={closeMenuOnSelect}
      onChange={onChangeData}
      getOptionLabel={(option: Record<string, any>) => option[labelKey]}
      getOptionValue={(option: Record<string, any>) => option[valueKey]}
    />
  );
});

export default memo(SelectAsync);
