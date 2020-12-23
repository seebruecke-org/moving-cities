import { Marker } from '../Map';

import { convertStrapiToMapbox } from '../../lib/coordiantes';

import * as styles from './mapCityMarker.styles';

export default function MapCityMarker({ name, coordinates, isActive = false, onClick = () => {} }) {
    return (
        <Marker coordinates={convertStrapiToMapbox(coordinates)} anchor="top" onClick={onClick}>
            <div css={styles.container}>
                {isActive ? (
                    <svg width="41" height="41" viewBox="0 0 41 41" fill="none" xmlns="http://www.w3.org/2000/svg" css={styles.icon}>
                        <circle cx="20.5" cy="20.5" r="19.9" stroke="#002286" stroke-width="1.2" stroke-dasharray="12 5"/>
                        <circle cx="20.78" cy="20.74" r="13.95" fill="#98A2FF" stroke="#002286" stroke-width="1.2"/>
                        <circle cx="20.78" cy="20.73" r="9.1" fill="#98A2FF" stroke="#002286" stroke-width="1.2"/>
                    </svg>
                ) : (
                    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg" css={styles.icon}>
                        <circle cx="10.02" cy="10.02" r="9.52" fill="#FFF95E" stroke="#B8B27C" />
                        <circle cx="10.02" cy="10.02" r="6.18" fill="#FFF95E" stroke="#B8B27C" />
                    </svg>
                )}

                <span css={styles.name}>
                    {name}
                </span>
            </div>
          </Marker>
    )


};
