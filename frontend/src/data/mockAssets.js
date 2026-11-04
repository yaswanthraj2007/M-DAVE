// Placeholder "generated images" so the UI works without a backend.
// Replace with the API response later; keep the same field names.
const makeImage = (hueA, hueB, label) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="768" height="1024" viewBox="0 0 768 1024">
<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
<stop offset="0" stop-color="hsl(${hueA}, 70%, 34%)"/>
<stop offset="1" stop-color="hsl(${hueB}, 60%, 10%)"/>
</linearGradient></defs>
<rect width="768" height="1024" fill="url(#g)"/>
<text x="384" y="520" text-anchor="middle" font-family="sans-serif" font-size="44" fill="#fff" fill-opacity="0.55">${label}</text>
<text x="384" y="975" text-anchor="middle" font-family="sans-serif" font-size="22" fill="#fff" fill-opacity="0.45">M-DAVE · Synthetic</text>
</svg>`;
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
};

const hoursAgo = (h) => new Date(Date.now() - h * 3600 * 1000).toISOString();

const fakeHash = (n) =>
  Array.from({ length: 64 }, (_, i) => ((n * 31 + i * 17 + i * i) % 16).toString(16)).join("");

const make = (n, hours, hueA, hueB, sizeMB) => ({
  id: `asset-${n}`,
  name: `generation-${String(n).padStart(4, "0")}`,
  format: "svg", // real assets will be "png"
  createdAt: hoursAgo(hours),
  width: 768,
  height: 1024,
  sizeMB,
  sha256: fakeHash(n),
  watermarked: true,
  c2pa: true,
  src: makeImage(hueA, hueB, `Mock ${String(n).padStart(2, "0")}`),
});

export const MOCK_ASSETS = [
  make(12, 2, 0, 20, 1.84),
  make(11, 5, 350, 10, 2.1),
  make(10, 26, 15, 340, 1.62),
  make(9, 30, 5, 355, 1.97),
  make(8, 52, 25, 0, 2.34),
  make(7, 75, 355, 15, 1.71),
  make(6, 120, 10, 350, 2.05),
  make(5, 170, 340, 20, 1.88),
];