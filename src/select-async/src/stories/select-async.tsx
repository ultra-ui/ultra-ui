import React from 'react';
import UISelectAsync from '../select-async';
import { SelectAsyncProps } from '../select-async.type';

export const SelectAsync: React.FC<SelectAsyncProps> = (props) => {
  return (
    <div style={{ width: 300 }}>
      <h3 style={{ marginBottom: 30 }}>@ultra-ui/select-async</h3>
      <UISelectAsync {...props} />
    </div>
  );
};
