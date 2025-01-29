const fs = require("fs");
const axios = require("axios");
const path = require("path");

(async () => {
  const sourceFolder = "./source"; // Path to your source folder
  const actualPrompt = "Analyze the following React Native files we are building a banking app, provide code suggestions, optimization, security, resusability & best coding practices.";
  const apiUrl = "http://localhost:11434/api/generate"; // API URL

  try {
    // Read all files from the source folder
    const files = fs.readdirSync(sourceFolder);

    for (const fileName of files) {
      const filePath = path.join(sourceFolder, fileName);

      // Check if the filePath is a file (not a directory)
      if (fs.statSync(filePath).isFile()) {
        // Read the file content
        const fileContent = fs.readFileSync(filePath, "utf-8");

        // Combine the actual prompt with the file content
        const combinedPrompt = `${actualPrompt}\n\nFile: ${fileName}\n\n${fileContent}`;

        // Create the payload
        const payload = {
          model: "deepseek-r1:8b",
          prompt: combinedPrompt, // Include the combined prompt and file content
          stream: false,
        };

        // Send the HTTP request for the current file
        const response = await axios.post(apiUrl, payload, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        // Log the response for the current file
        console.log(`Response for ${fileName}:`, response.data);
      }
    }
  } catch (error) {
    console.error("Error:", error);
  }
})();

