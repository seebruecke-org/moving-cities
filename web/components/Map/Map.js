import ReactMapboxGl from 'react-mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';

import * as styles from './map.styles';

const MapboxMap = ReactMapboxGl({
  accessToken: 'pk.eyJ1IjoiZ3VzdGF2cHVyc2NoZSIsImEiOiJhVVRUaFV3In0.IdUObuDS1u0tzNNDvNpfKg'
});

const Map = ({ children, ...props }) => (
  <MapboxMap
    style="mapbox://styles/gustavpursche/ckig79xzb3nue1atbymcmf04v"
    containerStyle={styles.container}
    center={[13.3999443502352, 52.52117780229074]}
    zoom={[5]}
    {...props}>
    {children}
  </MapboxMap>
);

export default Map;
