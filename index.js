const express = require("express");
const app = express();
const port = 4001;

// middleware for read JSON from request body, could test api with postman or other apps for api testing
app.use(express.json());

// Save data temporary in memory
let visitors = [
  {
    id: 1,
    name: "Mulyono",
    visitDate: "2025-08-09",
  },
];
let hobbies = [
  {
    id: 1,
    hobby: "Merakit",
  },
];
let dreamJobs = [
  {
    id: 1,
    job: "Tech Lead BE",
    reason: "Suka mimpin tim dan logika banget",
  },
];

// list endpoint
const listEndpoint = [
  { description: "Halaman utama API", path: "/", method: "GET" },
  { description: "GET data owner app", path: "/data/owner-app", method: "GET" },
  { description: "GET all weathers data", path: "/data/weathers", method: "GET" },
  { description: "GET all data months", path: "/data/months", method: "GET" },
  { description: "GET months data by ID", path: "/data/months/:id", method: "GET" },
  { description: "GET/POST visitors data", path: "/data/visitors", method: "GET/POST" },
  { description: "GET/POST hobbies data", path: "/hobbies", method: "GET/POST" },
  { description: "GET/POST dream jobs data", path: "/dream-jobs", method: "GET/POST" },
];
// endpoint route owner be app
app.get("/data/owner-app", (req, res) => {
  res.json({
    owner: "Danni A. Rachman",
    app: "Simple backend app to learn express",
    version: "1.0.0",
  });
});

// endpoint route data weather
app.get("/data/weathers", (req, res) => {
  const weathers = [
    { type: "Sunny", description: "Cerah" },
    { type: "Cloudy", description: "Berawan" },
    { type: "Rainy", description: "Hujan" },
    { type: "Windy", description: "Angin Kencang" },
    { type: "Stormy", description: "Badai" },
    { type: "Snowy", description: "Bersalju" },
    { type: "Foggy", description: "Berkabut" },
    { type: "Clear", description: "Cerah tanpa awan" },
  ];
  res.json(weathers);
});

// route endpoint all months
app.get("/data/months", (req, res) => {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];

  // mapping array jadi format {id, month}
  const listOfMonths = months.map((month, index) => ({
    id: index + 1,
    month,
  }));

  res.json(listOfMonths);
});

// route endpoint month by ID
app.get("/data/months/:id", (req, res) => {
  const months = ["Januari", "Februari", "Maret", "April", "Mei", "Juni", "Juli", "Agustus", "September", "Oktober", "November", "Desember"];
  const id = parseInt(req.params.id);

  if (isNaN(id)) {
    return res.status(400).json({ error: "ID bulan harus berupa angka" });
  }

  if (id < 1 || id > 12) {
    return res.status(400).json({ error: "ID bulan harus antara 1-12" });
  }

  res.json({ id, month: months[id - 1] });
});

// route Visitors GET & POST
app.get("/data/visitors", (req, res) => {
  res.json(visitors);
});
app.post("/data/visitors", (req, res) => {
  const { name, visitDate } = req.body;
  const newVisitor = { id: visitors.length + 1, name, visitDate };
  visitors.push(newVisitor);
  res.status(201).json(newVisitor);
});

// route Hobbies GET & POST
app.get("/hobbies", (req, res) => {
  res.json(hobbies);
});
app.post("/hobbies", (req, res) => {
  const { hobby } = req.body;
  const newHobby = { id: hobbies.length + 1, hobby };
  hobbies.push(newHobby);
  res.status(201).json(newHobby);
});

// route Dream Jobs GET & POST
app.get("/dream-jobs", (req, res) => {
  res.json(dreamJobs);
});
app.post("/dream-jobs", (req, res) => {
  const { job, reason } = req.body;
  const newJob = { id: dreamJobs.length + 1, job, reason };
  dreamJobs.push(newJob);
  res.status(201).json(newJob);
});

// route endpoint data kategori (/data)
app.get("/data", (req, res) => {
  const dataEndpoints = listEndpoint.filter((ep) => ep.path.startsWith("/data") && ep.path !== "/data");
  res.json({
    message: "Daftar endpoint kategori data",
    endpoints: dataEndpoints,
  });
});

// root endpoint
app.get("/", (req, res) => {
  const greetings = "Halo ini aplikasi backend yang sangat sederhana menggunakan framework express.js";
  // JSON for API proper via postman
  // res.json({
  //   message: greetings,
  //   endpoints: listEndpoint,
  // });
  let html = `<h1>${greetings}</h1>`;
  html += `<p>Berikut daftar endpoint yang tersedia pada aplikasi backend sederhana ini:</p>`;
  html += `<table border="1" cellpadding="5" cellspacing="0">
            <tr>
            <th>Method</th>
            <th>Path</th>
            <th>Description</th>
            </tr>`;

  listEndpoint.forEach((ep) => {
    html += `<tr>
                <td>${ep.method}</td>
                <td>${ep.path}</td>
                <td>${ep.description}</td>
              </tr>`;
  });

  html += `</table>`;

  res.send(html);
});

app.use((req, res) => {
  res.status(404).json({
    error: "Endpoint tidak ditemukan",
    message: `Endpoint '${req.originalUrl} tidak ada di API ini`,
    solve: "Silakan kembali ke root endpoint untuk melihat daftar endpoint yang tersedia",
  });
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
