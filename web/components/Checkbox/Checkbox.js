import { v4 as uuidv4 } from 'uuid';

import Label from '../Label';

import * as styles from './checkbox.styles';

const Checkbox = ({ children, ...props }) => {
  const id = uuidv4();

  return <div css={styles.container}>
    <input type="checkbox" css={styles.input} id={id} {...props} />

    <span css={styles.checkbox} />

    <Label for={id}>
      {children}
    </Label>
</div>
}

export default Checkbox;
