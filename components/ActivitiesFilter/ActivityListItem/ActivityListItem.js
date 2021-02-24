import Checkbox from '../../Checkbox';

import * as styles from './activityListItem.styles';

const ActivityListItem = ({ name, label, ...props }) => (
  <div css={styles.item}>
    <Checkbox name={name} {...props}>
      {label}
    </Checkbox>
  </div>
);

export default ActivityListItem;
