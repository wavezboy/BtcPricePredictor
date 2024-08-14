import fs from "fs";
import os from "os";

const ok = os.totalmem();

console.log(ok);

fs.readdir("/", (err, files) => {
  if (err) {
    console.log("Err", err);
  } else {
    console.log("Result", files);
  }
});


os.