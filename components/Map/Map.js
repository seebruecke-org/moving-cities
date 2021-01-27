import ReactMapboxGl, { ZoomControl } from 'react-mapbox-gl';
import { useWindowSize } from 'react-use';

import 'mapbox-gl/dist/mapbox-gl.css';

import Controls from './Controls';
import Info from './Info';

import * as styles from './map.styles';

const MapboxMap = ReactMapboxGl({
  accessToken: process.env.MAPBOX_ACCESS_TOKEN
});

export default function Map({ children, onInfoOpen = () => {}, ...props }) {
  const { width: windowWidth } = useWindowSize();

  return (
    <div css={styles.container}>
      <MapboxMap
        style="mapbox://styles/gustavpursche/ckkfj2uzk01sx17qix54j2pez"
        containerStyle={styles.container}
        {...props}>
        <Controls>
          <Info onClick={() => onInfoOpen()} />
          {windowWidth > 768 && <ZoomControl style={styles.zoomControl} />}
        </Controls>

        {children}
      </MapboxMap>
    </div>
  );
}
