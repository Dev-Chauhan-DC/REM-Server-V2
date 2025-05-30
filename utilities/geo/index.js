function photonToGoogleFormat(features) {
    return features
        .map((feature) => {
            const coords = feature?.geometry?.coordinates;
            const extent = feature?.properties?.extent;

            if (!coords || coords.length !== 2 || !extent || extent.length !== 4) return null;

            const [lng, lat] = coords;
            const [swLng, neLat, neLng, swLat] = extent;

            const parts = [
                feature.properties?.name,
                feature.properties?.city || feature.properties?.county,
                feature.properties?.state,
                feature.properties?.country,
            ].filter(Boolean);

            return {
                description: parts.join(', '),
                place_id: feature.properties?.osm_id?.toString() || '',
                provider: 'photon',
                geometry: {
                    location: {
                        lat,
                        lng
                    },
                    viewport: {
                        northeast: {
                            lat: neLat,
                            lng: neLng
                        },
                        southwest: {
                            lat: swLat,
                            lng: swLng
                        }
                    }
                }
            };
        })
        .filter(Boolean);
}

function nominatimToGoogleFormat(data) {
    return data
        .map(item => {
            const bbox = item.boundingbox;
            if (!bbox || bbox.length !== 4) return null;

            const lat = parseFloat(item.lat);
            const lng = parseFloat(item.lon);
            const [southLat, northLat, westLng, eastLng] = bbox.map(parseFloat);

            return {
                description: item.display_name || '',
                place_id: item.place_id?.toString() || '',
                provider: 'nominatim',
                geometry: {
                    location: {
                        lat,
                        lng
                    },
                    viewport: {
                        northeast: {
                            lat: northLat,
                            lng: eastLng
                        },
                        southwest: {
                            lat: southLat,
                            lng: westLng
                        }
                    }
                }
            };
        })
        .filter(Boolean);
}

function googleToGoogleFormat(data) {
    return (data?.predictions || []).map(item => ({
        description: item.description || '',
        place_id: item.place_id || '',
        provider: 'google'
    }));
}

module.exports = {
    photonToGoogleFormat,
    nominatimToGoogleFormat,
    googleToGoogleFormat
};
