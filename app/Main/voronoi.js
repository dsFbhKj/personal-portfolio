'use client';
import React, { useEffect, useState } from 'react';
import { Delaunay } from 'd3-delaunay';
import gloriaImage from '../../public/images/me.png'; // Import the image

function Stippling() {
  const [points, setPoints] = useState([]);
  const [delaunay, setDelaunay] = useState(null);
  const [voronoi, setVoronoi] = useState(null);

  useEffect(() => {
    const gloria = new Image();
    gloria.src = gloriaImage;
    gloria.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 600;
      canvas.height = 532;
      const ctx = canvas.getContext('2d');
      ctx.drawImage(gloria, 0, 0, 600, 532);
      const imageData = ctx.getImageData(0, 0, 600, 532).data;

      const newPoints = generateRandomPoints(6000, imageData);
      setPoints(newPoints);

      const newDelaunay = calculateDelaunay(newPoints);
      const newVoronoi = newDelaunay.voronoi([0, 0, 600, 532]);
      setDelaunay(newDelaunay);
      setVoronoi(newVoronoi);
    };
  }, []);

  useEffect(() => {
    if (voronoi) {
      const interval = setInterval(() => {
        updatePoints();
      }, 100);
      return () => clearInterval(interval);
    }
  }, [voronoi]);

  function generateRandomPoints(n, imageData) {
    const newPoints = [];
    for (let i = 0; i < n; i++) {
      let x = Math.random() * 600;
      let y = Math.random() * 532;
      let index = (Math.floor(x) + Math.floor(y) * 600) * 4;
      let r = imageData[index];
      let g = imageData[index + 1];
      let b = imageData[index + 2];
      let bright = (r + g + b) / 3;
      if (Math.random() * 100 > bright) {
        newPoints.push([x, y]);
      } else {
        i--;
      }
    }
    return newPoints;
  }

  function calculateDelaunay(points) {
    let pointsArray = [];
    for (let v of points) {
      pointsArray.push(v[0], v[1]);
    }
    return new Delaunay(pointsArray);
  }

  function updatePoints() {
    const polygons = voronoi.cellPolygons();
    const cells = Array.from(polygons);

    let centroids = new Array(cells.length).fill([0, 0]);
    const weights = new Array(cells.length).fill(0);

    let delaunayIndex = 0;
    for (let i = 0; i < 600; i++) {
      for (let j = 0; j < 532; j++) {
        let index = (i + j * 600) * 4;
        let r = imageData[index];
        let g = imageData[index + 1];
        let b = imageData[index + 2];
        let bright = (r + g + b) / 3;
        let weight = 1 - bright / 255;
        delaunayIndex = delaunay.find(i, j, delaunayIndex);
        centroids[delaunayIndex][0] += i * weight;
        centroids[delaunayIndex][1] += j * weight;
        weights[delaunayIndex] += weight;
      }
    }

    for (let i = 0; i < centroids.length; i++) {
      if (weights[i] > 0) {
        centroids[i][0] /= weights[i];
        centroids[i][1] /= weights[i];
      } else {
        centroids[i] = points[i].slice();
      }
    }

    const newPoints = points.map((point, i) => [
      point[0] + (centroids[i][0] - point[0]) * 0.1,
      point[1] + (centroids[i][1] - point[1]) * 0.1,
    ]);
    setPoints(newPoints);
    const newDelaunay = calculateDelaunay(newPoints);
    const newVoronoi = newDelaunay.voronoi([0, 0, 600, 532]);
    setDelaunay(newDelaunay);
    setVoronoi(newVoronoi);
  }

  return (
    <div>
      <canvas id='defaultCanvas0' width='600' height='532'></canvas>
      <img src={gloriaImage} alt='Gloria' style={{ display: 'none' }} />
    </div>
  );
}

export default Stippling;
