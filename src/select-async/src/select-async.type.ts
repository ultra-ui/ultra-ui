import { GroupBase, MultiValue, SingleValue } from 'react-select';
import { LoadOptions } from 'react-select-async-paginate';

export type Option = Record<string, string | number>;

export interface SelectAsyncProps {
  loadOptions: LoadOptions<Option, GroupBase<Option>, { page: number }>;
  isMulti?: boolean;
  value?: Option | Option[];
  defaultValue?: Option | Option[];
  onChange?: (option: MultiValue<Option> | SingleValue<Option>) => void;
  allowClear?: boolean;
  disabled?: boolean;
  placeholder?: string;
  showSearch?: boolean;
  closeMenuOnSelect?: boolean;
  labelKey?: keyof typeof Option;
  valueKey?: keyof typeof Option;
}

export interface SelectAsyncRef {
  get?: () => MultiValue<Option> | SingleValue<Option>;
  set?: (value: Option | Option[]) => void;
}
