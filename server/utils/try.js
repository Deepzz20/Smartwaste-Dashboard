const geolib = require('geolib');

function calculateTotalDistance(points, path) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += geolib.getDistance(
            points[path[i]],
            points[path[i + 1]],
            { unit: 'meter' }
        );
    }
    // Add distance from last point back to the starting point
    totalDistance += geolib.getDistance(
        points[path[path.length - 1]],
        points[path[0]],
        { unit: 'meter' }
    );
    return totalDistance;
}

function calculateOriginalDistance(points) {
    let totalDistance = 0;
    for (let i = 0; i < points.length - 1; i++) {
        totalDistance += geolib.getDistance(
            points[i],
            points[i + 1],
            { unit: 'meter' }
        );
    }
    // Add distance from last point back to the first point
    totalDistance += geolib.getDistance(
        points[points.length - 1],
        points[0],
        { unit: 'meter' }
    );
    return totalDistance;
}

function heldKarpAlgorithm(points) {
    const n = points.length;
    const dists = Array.from({ length: n }, () => Array(n).fill(0));
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            if (i !== j) {
                dists[i][j] = geolib.getDistance(
                    points[i],
                    points[j],
                    { unit: 'meter' }
                );
            }
        }
    }

    const memo = new Map();
    function search(path, visited) {
        if (visited === (1 << n) - 1) {
            return { cost: dists[path[path.length - 1]][0], path: [...path, 0] };
        }
        const key = path[path.length - 1] * n + visited;
        if (memo.has(key)) {
            return memo.get(key);
        }
        let res = { cost: Infinity, path: [] };
        for (let next = 0; next < n; next++) {
            if (!(visited & (1 << next))) {
                const { cost, path: newPath } = search([...path, next], visited | (1 << next));
                const newCost = cost + dists[path[path.length - 1]][next];
                if (newCost < res.cost) {
                    res = { cost: newCost, path: newPath };
                }
            }
        }
        memo.set(key, res);
        return res;
    }

    const { cost, path } = search([0], 1);
    const totalOptimizedDistance = calculateTotalDistance(points, path) / 1000; // Convert to kilometers
    const totalOriginalDistance = calculateOriginalDistance(points) / 1000; // Convert to kilometers

    console.log('Distance for original points array:', totalOriginalDistance, 'kilometers');
    console.log('Shortest distance for optimized path:', totalOptimizedDistance, 'kilometers');

    return path.map(index => points[index]);
}

module.exports = heldKarpAlgorithm;



const heldKarpAlgorithm = require('../utils/routeAlgo');


const points = [
    {
        "name": "Chennai Central Railway Station",
        "latitude": 13.080452,
        "longitude": 80.272375
    },
    {
        "name": "Light House",
        "latitude": 13.028,
        "longitude": 80.234244
    },
    {
        "name": "VGP Universal Kingdom",
        "latitude": 12.971599,
        "longitude": 80.255081
    },
    {
        "name": "Muttukadu Boat House",
        "latitude": 12.989133,
        "longitude": 80.21726
    },
    {
        "name": "Marina Beach",
        "latitude": 13.038701,
        "longitude": 80.237102
    },
    {
        "name": "Chennai Airport",
        "latitude": 12.977657,
        "longitude": 80.187683
    },
    {
        "name": "Guindy National Park",
        "latitude": 13.062919,
        "longitude": 80.2304501
    },
    {
        "name": "Kapaleeshwarar Temple",
        "latitude": 12.988857,
        "longitude": 80.224393
    },
    {
        "name": "Mahabalipuram",
        "latitude": 13.10222,
        "longitude": 80.234236
    },
    {
        "name": "Santhome Cathedral",
        "latitude": 13.01994,
        "longitude": 80.160389
    }
];


heldKarpAlgorithm(points);