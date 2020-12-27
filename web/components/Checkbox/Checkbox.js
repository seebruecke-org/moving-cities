import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

import Label from '../Label';

import * as styles from './checkbox.styles';

const Checkbox = ({ children, checked: defaultChecked = false, ...props }) => {
  const id = uuidv4();
  const [checked, setChecked] = useState(defaultChecked);

  return (
    <div css={styles.container}>
      <input
        type="checkbox"
        css={styles.input}
        id={id}
        checked={checked}
        onChange={() => setChecked(!checked)}
        {...props}
      />

      <span css={styles.checkbox} />

      <Label htmlFor={id}>{children}</Label>
    </div>
  );
};

export default Checkbox;
