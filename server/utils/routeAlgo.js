const geolib = require('geolib');

function calculateTotalDistance(path, points) {
    let totalDistance = 0;
    for (let i = 0; i < path.length - 1; i++) {
        totalDistance += geolib.getDistance(
            { latitude: points[path[i]].latitude, longitude: points[path[i]].longitude },
            { latitude: points[path[i + 1]].latitude, longitude: points[path[i + 1]].longitude }
        ) / 1000; // Convert to kilometers
    }
    // Add distance from last point back to the starting point
    totalDistance += geolib.getDistance(
        { latitude: points[path[path.length - 1]].latitude, longitude: points[path[path.length - 1]].longitude },
        { latitude: points[0].latitude, longitude: points[0].longitude }
    ) / 1000; // Convert to kilometers
    return totalDistance;
}

function heldKarpAlgorithm(points) {
    const n = points.length;
    const dists = Array.from({ length: n }, () => Array(n).fill(0));
    const originalPath = Array.from({ length: n }, (_, i) => i); // Path by index for original points

    // Calculate distances between all pairs of coordinates
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            dists[i][j] = dists[j][i] = geolib.getDistance(
                { latitude: points[i].latitude, longitude: points[i].longitude },
                { latitude: points[j].latitude, longitude: points[j].longitude }
            ) / 1000; // Convert to kilometers
        }
    }

    const C = {};
    for (let k = 1; k < n; k++) {
        C[(1 << k) + ',' + k] = [dists[0][k], 0];
    }

    for (let subsetSize = 2; subsetSize < n; subsetSize++) {
        const subsets = combine(range(1, n), subsetSize);
        for (let subset of subsets) {
            let bits = 0;
            subset.forEach(bit => {
                bits |= 1 << bit;
            });
            for (let k of subset) {
                const prev = bits & ~(1 << k);
                const res = [];
                subset.forEach(m => {
                    if (m === 0 || m === k) return;
                    res.push([C[prev + ',' + m][0] + dists[m][k], m]);
                });
                C[bits + ',' + k] = res.reduce((min, p) => p[0] < min[0] ? p : min);
            }
        }
    }

    let bits = (1 << n) - 2;
    const res = [];
    for (let k = 1; k < n; k++) {
        res.push([C[bits + ',' + k][0] + dists[k][0], k]);
    }
    let [opt, parent] = res.reduce((min, p) => p[0] < min[0] ? p : min);
    const path = [];
    for (let i = 0; i < n - 1; i++) {
        path.push(parent);
        const newBits = bits & ~(1 << parent);
        parent = C[bits + ',' + parent][1];
        bits = newBits;
    }
    path.unshift(0);
    path.push(0);

    const optimizedPath = path.map(index => {
        return {
            name: points[index].name,
            latitude: points[index].latitude,
            longitude: points[index].longitude
        };
    });

    // console.log("Optimized Path:");
    // optimizedPath.forEach((point, i) => {
    //     console.log(`${i}: ${point.name} (${point.latitude}, ${point.longitude})`);
    // });

    const originalDistance = calculateTotalDistance(originalPath, points);
    console.log("Actual Path Distance:", originalDistance, "km");

    const totalDistance = calculateTotalDistance(path, points);
    console.log("Optimized Path Distance:", totalDistance, "km");

    return optimizedPath;
}

// Helper functions
function range(start, end) {
    return Array.from({ length: end - start }, (v, k) => k + start);
}

function combine(arr, k) {
    const res = [];
    const helper = (start, prev) => {
        if (prev.length === k) {
            res.push(prev);
            return;
        }
        for (let i = start; i < arr.length; i++) {
            helper(i + 1, prev.concat(arr[i]));
        }
    };
    helper(0, []);
    return res;
}

module.exports = heldKarpAlgorithm;
