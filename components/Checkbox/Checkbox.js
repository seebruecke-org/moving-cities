import { v4 as uuidv4 } from 'uuid';

import Label from '../Label';

import * as styles from './checkbox.styles';

const Checkbox = ({ children, id, ...props }) => {
  const cbId = id || uuidv4();

  return (
    <div css={styles.container}>
      <input type="checkbox" css={styles.input} id={cbId} {...props} />

      <span css={styles.checkbox} />

      <Label htmlFor={cbId}>{children}</Label>
    </div>
  );
};

export default Checkbox;
