const { Client } = require("pg");
const copyTo = require("pg-copy-streams").to;
const fs = require("fs");
const copyFrom = require("pg-copy-streams").from;

const client = new Client({
  user: "wavez",
  host: "dpg-cr18ibbqf0us73fkdl20-a.oregon-postgres.render.com",
  database: "testing_h8eg",
  password: "bZOSSz4gRrmjUQmZrK4hZdpSzyuSojMA",
  port: 5432,
  statement_timeout: 60000, // 60 seconds timeout
  ssl: {
    rejectUnauthorized: false, // Necessary for cloud-hosted databases like Render
  },
});

function exportData(tableName, outputFilePath, retryCount = 0) {
  client
    .connect()
    .then(() => {
      const query = `COPY "${tableName}" TO STDOUT WITH CSV HEADER DELIMITER ','`;
      console.log(`Executing query: ${query}`); // Log the query being executed

      const fileStream = fs.createWriteStream(outputFilePath);

      client
        .query(copyTo(query))
        .pipe(fileStream)
        .on("finish", () => {
          console.log(
            `Data from ${tableName} exported successfully to ${outputFilePath}`
          );
          client.end();
        })
        .on("error", (err) => {
          console.error(`Error exporting data from ${tableName}:`, err);
          client.end();
          if (retryCount < 3) {
            console.log(`Retrying (${retryCount + 1}/3)...`);
            exportData(tableName, outputFilePath, retryCount + 1);
          }
        });
    })
    .catch((err) => {
      console.error("Connection error:", err);
    });
}

function seedData(tableName, inputFilePath) {
  client
    .connect()
    .then(() => {
      const query = `COPY "${tableName}" FROM STDIN WITH CSV HEADER DELIMITER ','`;
      console.log(`Executing query: ${query}`);

      const fileStream = fs.createReadStream(inputFilePath);

      const stream = client.query(copyFrom(query));
      fileStream
        .pipe(stream)
        .on("finish", () => {
          console.log(
            `Data from ${inputFilePath} imported successfully into ${tableName}`
          );
          client.end();
        })
        .on("error", (err) => {
          console.error(`Error importing data into ${tableName}:`, err);
          client.end();
        });
    })
    .catch((err) => {
      console.error("Connection error:", err);
    });
}

// exportData("User", "user_data.csv");
// exportData("vendor", "vendor_data.csv");
// exportData("admin", "admin_data.csv");

seedData("User", "user_data.csv");
