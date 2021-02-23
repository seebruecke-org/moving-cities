import { v3 as uuidv3 } from 'uuid';

import Label from '../Label';

import * as styles from './checkbox.styles';

const Checkbox = ({ children, id, ...props }) => {
  const cbId = id || uuidv3(JSON.stringify({ id, ...props }), uuidv3.URL);

  return (
    <div css={styles.container}>
      <input type="checkbox" css={styles.input} id={cbId} {...props} />

      <span css={styles.checkbox} />

      <Label htmlFor={cbId}>{children}</Label>
    </div>
  );
};

export default Checkbox;
