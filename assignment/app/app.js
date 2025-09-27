import fs from "fs";
import path from "path";
import chalk from "chalk";
import inquirer from "inquirer";
import validator from "validator";
import qr from "qr-image";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  try {
    // Step 1: Ask user to input a URL
    const { url } = await inquirer.prompt([
      {
        type: "input",
        name: "url",
        message: "Enter a URL:",
      },
    ]);

    // Step 2: Validate URL
    if (!validator.isURL(url)) {
      console.log(chalk.red("Invalid URL. Please provide a valid one."));
      process.exit(1);
    }

    console.log(chalk.green("URL is valid!"));

    // Step 3: Ask user for QR Code type
    const { type } = await inquirer.prompt([
      {
        type: "list",
        name: "type",
        message: "Select the type of QR Code image:",
        choices: ["png", "svg", "pdf"],
      },
    ]);

    console.log(chalk.green(`You chose ${type} format.`));

    // Step 4: Create folder "qrcodes" if not exists
    const outputDir = path.join(__dirname, "qrcodes");
    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir);
    }

    // Step 5: Generate filename based on URL (sanitize filename)
    const fileName = url
      .replace(/(^\w+:|^)\/\//, "")
      .replace(/[^a-zA-Z0-9]/g, "_");
    const filePath = path.join(outputDir, `${fileName}.${type}`);

    // Step 6: Generate QR Code
    const qrStream = qr.image(url, { type: type });
    const writeStream = fs.createWriteStream(filePath);
    qrStream.pipe(writeStream);

    writeStream.on("finish", () => {
      console.log(
        chalk.green(`🎉 QR Code generated successfully at: ${filePath}`)
      );
    });

    // Step 7: Save URL into URL.txt
    const urlFile = path.join(outputDir, "URL.txt");
    await fs.promises.writeFile(urlFile, url + "\n", { flag: "a" });

    console.log(chalk.green("URL saved to URL.txt"));
  } catch (err) {
    console.log(chalk.red("An error occurred: " + err.message));
  }
})();
