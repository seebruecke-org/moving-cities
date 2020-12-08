import * as styles from './citiesList.styles';

const CitiesList = ({ cities, label, ...props }) => (
  <div css={styles.container}>
    <h2 css={styles.label}>{label}</h2>

    <div css={styles.listContainer}>
      <ul css={styles.list} {...props}>
        {cities.map(({ name }) => (
          <li css={styles.item}>
            {name}
          </li>
        ))}
      </ul>
    </div>
  </div>
)

export default CitiesList;
