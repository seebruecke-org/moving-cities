import Checkbox from '../Checkbox';

import * as styles from './activityListItem.styles';

const ActivityListItem = ({ title }) => (
  <div css={styles.item}>
    <Checkbox>{title}</Checkbox>
  </div>
);

export default ActivityListItem;
