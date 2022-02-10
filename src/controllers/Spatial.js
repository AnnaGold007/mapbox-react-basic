import * as turf from '@turf/turf'

const GetMultipolygonArea = (geometry) => {
        const multiPolygon = turf.multiPolygon(geometry);
        const area = turf.area(multiPolygon);
        console.log(area)
        return area;
};
export default GetMultipolygonArea;