'use client';
// import { useSpring, animated } from '@react-spring/web'; //imported animation for react-spring
// import AOS from 'aos'; //need both the import
// import 'aos/dist/aos.css'; //and css for AOS to work
import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Voronoi } from 'd3';
import Image from 'next/image'; // Import the Image component
import me from './2d/me.png'; // Import the image file

export default function Main() {
  // const [springs, api] = useSpring(() => ({
  //   from: { x: 0 },
  // }));

  // useEffect(() => {
  //   AOS.init({});
  // }, []);

  // const handleClick = () => {
  //   api.start({
  //     from: {
  //       x: 0,
  //     },
  //     to: {
  //       x: 100,
  //     },
  //   });
  // };

  const svgRef = useRef(null);

  useEffect(() => {
    // Load image
    const img = document.createElement('img'); // Create an <img> element
    img.src = me; // Set the src attribute to the image file path
    img.onload = () => {
      draw(img);
    };
  }, []);

  const draw = (img) => {
    const canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    const ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;

    const height = 500;
    const width = 960;

    const svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    const points = [];
    const factor = height / canvas.height;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() > (data[i] + data[i + 1] + data[i + 2]) / (3 * 256)) {
        const y = Math.floor(i / 4 / canvas.width);
        const x = i / 4 - y * canvas.width;
        points.push([x * factor, y * factor]);
      }
    }

    const capacity = 14;
    const npoints = Math.floor(points.length / capacity);

    const sites = d3.range(npoints).map(() => {
      const p = points[Math.floor(Math.random() * points.length)];
      p.index = d;
      return p;
    });

    const Voronoi = d3.Voronoi().size([width, height]);
    const diagram = Voronoi(sites);

    svg
      .selectAll('.polygons')
      .data(diagram.polygons())
      .enter()
      .append('path')
      .attr('class', 'polygons')
      .attr('d', (d) => (d ? 'M' + d.join('L') + 'Z' : null))
      .attr('stroke-opacity', 0.1);

    svg
      .selectAll('circle')
      .data(sites)
      .enter()
      .append('circle')
      .attr('r', 1.5)
      .attr('fill', '#333')
      .attr('transform', (d) => 'translate(' + d + ')');

    let lastswaps = null;
    const interval = d3.interval(() => {
      const swaps = iterate();

      svg
        .selectAll('circle')
        .data(sites)
        .attr('transform', (d) => 'translate(' + d + ')');

      svg
        .selectAll('rect')
        .data(points)
        .attr('transform', (d) => 'translate(' + d + ')');

      const newDiagram = Voronoi(sites);

      svg
        .selectAll('.polygons')
        .data(newDiagram.polygons())
        .attr('d', (d) => (d ? 'M' + d.join('L') + 'Z' : null));

      sites.map((site, i) => {
        const pts = points.slice(i * capacity, i * capacity + capacity);
        site[0] = d3.mean(pts.map((d) => d[0]));
        site[1] = d3.mean(pts.map((d) => d[1]));
        return site;
      });

      console.log(`${swaps} swaps, ${calc} distances computed`);
      if (swaps === lastswaps && swaps < 300) {
        console.log(`stabilized after ${iterations} iterations.`);
        interval.stop();
        svg
          .selectAll('.polygons')
          .transition()
          .duration(2000)
          .attr('stroke-opacity', 0.05);
        svg
          .selectAll('circle')
          .transition()
          .duration(2000)
          .attr('fill', 'black');
      }
      lastswaps = swaps;
    });

    let calc = 0;
    let iterations = 0;

    const distance2 = (a, b) => {
      const dx = a[0] - b[0];
      const dy = a[1] - b[1];
      return dx * dx + dy * dy;
    };

    const iterate = () => {
      let swaps = 0;
      iterations++;

      const links = new Array(sites.length);
      diagram.links().forEach((l) => {
        const ext = d3.extent([l.source.index, l.target.index]);
        const i = ext[0];
        const j = ext[1];
        if (!links[i]) links[i] = [j];
        else links[i].push(j);
      });

      for (let i in links) {
        const l = links[i];
        links[i] = d3.merge(
          [links[i]].concat(links[i].map((j) => links[j] || []))
        );

        l.forEach((j) => {
          const Hi = [];
          const Hj = [];
          for (let k = 0; k < capacity; k++) {
            Hi.push(
              distance2(points[i * capacity + k], sites[j]) -
                distance2(points[i * capacity + k], sites[i])
            );
            Hj.push(
              distance2(points[j * capacity + k], sites[i]) -
                distance2(points[j * capacity + k], sites[j])
            );
            calc++;
          }

          let ki, kj;
          while (
            Hi.length > 0 &&
            Hj.length > 0 &&
            ((ki = d3.scan(Hi)) || true) &&
            ((kj = d3.scan(Hj)) || true) &&
            Hi[ki] + Hj[kj] < 0
          ) {
            swaps++;
            const temp = points[i * capacity + ki];
            points[i * capacity + ki] = points[j * capacity + kj];
            points[j * capacity + kj] = temp;
            Hi.splice(ki, 1);
            Hj.splice(kj, 1);
          }
        });
      }

      return swaps;
    };
  };

  return (
    // <main className='flex min-h-screen flex-col items-center justify-between p-24'>
    //   {/* Add react Soring Animation */}
    //   <animated.div
    //     onClick={handleClick}
    //     style={{
    //       width: 80,
    //       height: 80,
    //       background: '#ff6d6d',
    //       borderRadius: 8,
    //       ...springs,
    //     }}
    //   />
    // </main>
    <svg ref={svgRef}></svg>
  );
}
