import Checkbox from '../../Checkbox';

import * as styles from './activityListItem.styles';

const ActivityListItem = ({ name, ...props }) => (
  <div css={styles.item}>
    <Checkbox name={name} {...props}>
      {name}
    </Checkbox>
  </div>
);

export default ActivityListItem;
