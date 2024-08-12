const express = require("express");
const compiler = require("compilex");
const fs = require("fs").promises;
const path = require("path");
const cors = require("cors");

const options = { stats: true };
compiler.init(options);

const app = express();
app.use(express.json());
app.use(cors());

const TEMP_FOLDER_PATH = "D://Study//MERN//Compiler-MERN//Server//temp//";

async function deleteDirectoryRecursive(directoryPath) {
  try {
    await fs.access(directoryPath);
    const files = await fs.readdir(directoryPath);
    for (const file of files) {
      const currentPath = path.join(directoryPath, file);
      const stats = await fs.stat(currentPath);
      if (stats.isDirectory()) {
        await deleteDirectoryRecursive(currentPath);
      } else {
        await fs.unlink(currentPath);
      }
    }
    if (directoryPath !== "D://Study//MERN//Compiler-MERN//Server//temp//") {
      await fs.rmdir(directoryPath);
    }
  } catch (error) {
    console.log(`Error deleting directory: ${error.message}`);
  }
}

app.get("/", async (_, res) => {
  res.send("Hello");
});

app.post("/compile", async (req, res) => {
  try {
    const { code, input, language } = req.body;
    let envData = { OS: "windows", timeout: 5000 };
    if (language === "python") {
      if (!input) {
        compiler.compilePython(envData, code, function (data) {
          deleteDirectoryRecursive(TEMP_FOLDER_PATH).then(() =>
            data.output ? res.send(data.output) : res.send(data.error)
          );
        });
      } else {
        compiler.compilePythonWithInput(envData, code, input, function (data) {
          deleteDirectoryRecursive(TEMP_FOLDER_PATH).then(() =>
            data.output ? res.send(data.output) : res.send(data.error)
          );
        });
      }
    } else if (language === "java") {
      if (!input) {
        compiler.compileJava(envData, code, function (data) {
          deleteDirectoryRecursive(TEMP_FOLDER_PATH).then(() =>
            data.output ? res.send(data.output) : res.send(data.error)
          );
        });
      } else {
        compiler.compileJavaWithInput(envData, code, input, function (data) {
          deleteDirectoryRecursive(TEMP_FOLDER_PATH).then(() =>
            data.output ? res.send(data.output) : res.send(data.error)
          );
        });
      }
    } else if (language === "c") {
      let envData = { OS: "windows", cmd: "g++", timeout: 5000 };
      if (!input || input === "") {
        compiler.compileCPP(envData, code, function (data) {
          deleteDirectoryRecursive(TEMP_FOLDER_PATH).then(() =>
            data.output ? res.send(data.output) : res.send(data.error)
          );
        });
      } else {
        res.send("This option is now not supported the the compiler");
      }
    }
  } catch (error) {
    console.error(error);
  }
});

app.listen(5000, () => console.log("Server listening on port 5000"));
