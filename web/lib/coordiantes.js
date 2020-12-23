export const convertStrapiToMapbox = coordinates => {
    const latLong = coordinates.split(',');
    const lat = parseFloat(latLong[1]);
    const long = parseFloat(latLong[0]);

    return [lat, long];
};
