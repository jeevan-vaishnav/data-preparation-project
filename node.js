const fs = require("node:fs/promises");
const readline = require("readline");

(async () => {
  try {
    console.time("node");
    // Open the source and destination files using file descriptors
    const srcFile = await fs.open("data.csv", "r");
    const destFile = await fs.open("cleaned_data.csv", "w");

    //create stream from file descriptors
    const readStream = srcFile.createReadStream();
    const writeStream = destFile.createWriteStream();

    // Create readline interface for reading CSV line by line
    const rl = readline.createInterface({
      input: readStream,
      crlfDelay: Infinity,
    });

    // Process each line
    let fistLine = true;

    rl.on("line", (line) => {
    // Write the first line (headers) directly to the cleaned file
      if(fistLine){
        writeStream.write(line + "\n");
        fistLine = false;
        return;
      }
    //   console.log(line);
    // Validate each row and write valid rows to the destination
      if(isValidRow(line)){
        writeStream.write(line + '\n');
      }
    });
    console.timeEnd("node");
  } catch (error) {}
})();


function isValidRow(line){
    const [id,name,age,email] = line.split(",");
    // Check if required fields are present and valid
    if (!id || !name || !email || !age) return false;

    console.log(id,name,age,email);
    return true;
}
