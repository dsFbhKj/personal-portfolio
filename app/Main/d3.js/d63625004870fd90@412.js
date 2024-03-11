function _1(md){return(
md`# Voronoi Stippling

This notebook applies a weighted variant of [Lloyd’s algorithm](/@mbostock/lloyds-algorithm) to implement stippling. Points are initially positioned randomly using rejection sampling, then at each iteration, the Voronoi cell centroids are weighted by the lightness of the contained pixels.

This technique is based on [*Weighted Voronoi Stippling*](https://www.cs.ubc.ca/labs/imager/tr/2002/secord2002b/secord.2002b.pdf) by [Adrian Secord](https://cs.nyu.edu/~ajsecord/stipples.html); see also posts by [Muhammad Firmansyah Kasim](https://mfkasim91.github.io/2016/12/06/stippling-pictures-with-lloyds-algorithm/), [Egor Larionov](https://elrnv.com/blog/weighted-lloyds-method-for-voronoi-tesselation/) and [Noah Veltman](https://bl.ocks.org/veltman/017a2093623e1bf3ae041dd3380578cb).`
)}

function _image(DOM,width,height,script,invalidation,data,n)
{
  const context = DOM.context2d(width, height);
  const worker = new Worker(script);

  function messaged({data: points}) {
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    context.beginPath();
    for (let i = 0, n = points.length; i < n; i += 2) {
      const x = points[i], y = points[i + 1];
      context.moveTo(x + 1.5, y);
      context.arc(x, y, 1.5, 0, 2 * Math.PI);
    }
    context.fillStyle = "#000";
    context.fill();
  }

  invalidation.then(() => worker.terminate());
  worker.addEventListener("message", messaged);
  worker.postMessage({data, width, height, n});
  return context.canvas;
}


async function _script(require,invalidation)
{
  const blob = new Blob([`
importScripts("${await require.resolve("d3-delaunay@6")}");

onmessage = event => {
  const {data: {data, width, height, n}} = event;
  const points = new Float64Array(n * 2);
  const c = new Float64Array(n * 2);
  const s = new Float64Array(n);

  // Initialize the points using rejection sampling.
  for (let i = 0; i < n; ++i) {
    for (let j = 0; j < 30; ++j) {
      const x = points[i * 2] = Math.floor(Math.random() * width);
      const y = points[i * 2 + 1] = Math.floor(Math.random() * height);
      if (Math.random() < data[y * width + x]) break;
    }
  }

  const delaunay = new d3.Delaunay(points);
  const voronoi = delaunay.voronoi([0, 0, width, height]);

  for (let k = 0; k < 80; ++k) {

    // Compute the weighted centroid for each Voronoi cell.
    c.fill(0);
    s.fill(0);
    for (let y = 0, i = 0; y < height; ++y) {
      for (let x = 0; x < width; ++x) {
        const w = data[y * width + x];
        i = delaunay.find(x + 0.5, y + 0.5, i);
        s[i] += w;
        c[i * 2] += w * (x + 0.5);
        c[i * 2 + 1] += w * (y + 0.5);
      }
    }

    // Relax the diagram by moving points to the weighted centroid.
    // Wiggle the points a little bit so they don’t get stuck.
    const w = Math.pow(k + 1, -0.8) * 10;
    for (let i = 0; i < n; ++i) {
      const x0 = points[i * 2], y0 = points[i * 2 + 1];
      const x1 = s[i] ? c[i * 2] / s[i] : x0, y1 = s[i] ? c[i * 2 + 1] / s[i] : y0;
      points[i * 2] = x0 + (x1 - x0) * 1.8 + (Math.random() - 0.5) * w;
      points[i * 2 + 1] = y0 + (y1 - y0) * 1.8 + (Math.random() - 0.5) * w;
    }

    postMessage(points);
    voronoi.update();
  }

  close();
};
`], {type: "text/javascript"});
  const script = URL.createObjectURL(blob);
  invalidation.then(() => URL.revokeObjectURL(script));
  return script;
}


async function _data(FileAttachment,width,DOM)
{
  const image = await await FileAttachment("me.png").image();
  const height = Math.round(width * image.height / image.width);
  const context = DOM.context2d(width, height, 1);
  context.drawImage(image, 0, 0, image.width, image.height, 0, 0, width, height);
  const {data: rgba} = context.getImageData(0, 0, width, height);
  const data = new Float64Array(width * height);
  for (let i = 0, n = rgba.length / 4; i < n; ++i) data[i] = Math.max(0, 1 - rgba[i * 4] / 254);
  data.width = width;
  data.height = height;
  return data;
}


function _n(width,height){return(
Math.round(width * height / 40)
)}

function _height(data){return(
data.height
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["me.png", {url: new URL("./files/42fa23e5ce00db967b59b56df13a80a1b90ed5a5276043119775f94d722c573bddade131a2448716f30cb8f89acf8343c52cb10ce32f1f846546f9a1a31f3a2a.jpeg", import.meta.url), mimeType: "image/jpeg", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("image")).define("image", ["DOM","width","height","script","invalidation","data","n"], _image);
  main.variable(observer("script")).define("script", ["require","invalidation"], _script);
  main.variable(observer("data")).define("data", ["FileAttachment","width","DOM"], _data);
  main.variable(observer("n")).define("n", ["width","height"], _n);
  main.variable(observer("height")).define("height", ["data"], _height);
  return main;
}
