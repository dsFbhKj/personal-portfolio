'use client';
import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';
import { Voronoi } from 'd3-delaunay'; 

export default function D3Component() {
  let svgRef = useRef(null);

  useEffect(() => {
    let img = new Image();
    img.src = '/me.png';
    img.onload = () => {
      draw(img);
    };
  }, []);

  let draw = (img) => {
    let canvas = document.createElement('canvas');
    canvas.width = img.width;
    canvas.height = img.height;
    let ctx = canvas.getContext('2d');
    ctx.drawImage(img, 0, 0);
    let imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    let data = imageData.data;

    let height = 500;
    let width = 960;

    let svg = d3
      .select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    let points = [];
    let factor = height / canvas.height;
    for (let i = 0; i < data.length; i += 4) {
      if (Math.random() > (data[i] + data[i + 1] + data[i + 2]) / (3 * 256)) {
        let y = Math.floor(i / 4 / canvas.width);
        let x = i / 4 - y * canvas.width;
        points.push([x * factor, y * factor]);
      }
    }

    let capacity = 14;
    let npoints = Math.floor(points.length / capacity);

    let sites = d3.range(npoints).map(function (d) {
      let p = points[Math.floor(Math.random() * points.length)];
      p.index = d;
      return p;
    });

    let voronoi = new d3.Voronoi().size([width, height]);
    let diagram = voronoi(sites);

    let polygon = svg
      .append('g')
      .attr('class', 'polygons')
      .selectAll('path')
      .data(diagram.polygons())
      .enter()
      .append('path')
      .attr('stroke-opacity', 0.1);

    function distance2(a, b) {
      let dx = a[0] - b[0];
      let dy = a[1] - b[1];
      return dx * dx + dy * dy;
    }

    let calc = 0;
    let iterations = 0;

    function iterate() {
      let swaps = 0;
      iterations++;

      let links = new Array(sites.length);
      diagram.links().forEach(function (l) {
        let ext = d3.extent([l.source.index, l.target.index]);
        let i = ext[0];
        let j = ext[1];
        if (!links[i]) links[i] = [j];
        else links[i].push(j);
      });

      for (let i in links) {
        let l = links[i];
        links[i] = d3.merge(
          [links[i]].concat(
            links[i].map(function (j) {
              return links[j] || [];
            })
          )
        );

        l.forEach(function (j) {
          let Hi = [];
          let Hj = [];
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
            let temp = points[i * capacity + ki];
            points[i * capacity + ki] = points[j * capacity + kj];
            points[j * capacity + kj] = temp;
            Hi = Hi.slice(0, ki).concat(Hi.slice(ki + 1));
            Hj = Hj.slice(0, kj).concat(Hj.slice(kj + 1));
          }
        });
      }

      return swaps;
    }

    let site = svg
      .selectAll('circle')
      .data(sites)
      .enter()
      .append('circle')
      .attr('r', 1.5)
      .attr('fill', '#333');

    let lastswaps = null;
    let interval = d3.interval(function () {
      let swaps = iterate();

      svg
        .selectAll('circle')
        .data(sites)
        .attr('transform', function (d) {
          return 'translate(' + d + ')';
        });

      svg
        .selectAll('rect')
        .data(points)
        .attr('transform', function (d) {
          return 'translate(' + d + ')';
        });

      diagram = voronoi(sites);

      polygon = polygon.data(diagram.polygons()).attr('d', function (d) {
        return d ? 'M' + d.join('L') + 'Z' : null;
      });

      sites = sites.map(function (site, i) {
        let pts = points.slice(i * capacity, i * capacity + capacity);
        site[0] = d3.mean(
          pts.map(function (d) {
            return d[0];
          })
        );
        site[1] = d3.mean(
          pts.map(function (d) {
            return d[1];
          })
        );
        return site;
      });

      console.log('' + swaps + ' swaps, ' + calc + ' distances computed');
      if (swaps == lastswaps && swaps < 300) {
        console.log('stabilized after ' + iterations + ' iterations.');
        interval.stop();
        polygon.transition().duration(2000).attr('stroke-opacity', 0.05);
        site.transition().duration(2000).attr('fill', 'black');
      }
      lastswaps = swaps;
    });
  };

  return <svg ref={svgRef}></svg>;
}
