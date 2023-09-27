import http from "node:http";

const host = "localhost";
const port = 8000;

// function requestListener(_request, response) {
//   response.writeHead(200);
//   response.end("<html><h1>My first server!<h1></html>");
// }

// function requestListener(_request, response) {
//     response.setHeader("Content-Type", "application/json");
//     response.end(JSON.stringify({ message: "I'm OK" }));
// }

import fs from "node:fs/promises";

// function requestListener(_request, response) {
//   fs.readFile("index.html", "utf8")
//     .then((contents) => {
//       response.setHeader("Content-Type", "text/html");
//       response.writeHead(200);
//       return response.end(contents);
//     })
//     .catch(() => console.log(response.writeHead(500)));
// }

// async function requestListener(_request, response) {
//   try {
//     const contents = await fs.promises.readFile("index.html", "utf8");
//     response.setHeader("Content-Type", "text/html");
//     response.writeHead(200);
//     response.end(contents);
//   } catch (error) {
//     console.error(error);
//     response.writeHead(500);
//     response.end();
//   }
// }

async function requestListener(request, response) {
  response.setHeader("Content-Type", "text/html");
  try {
    const contents = await fs.readFile("index.html", "utf8");
    const urlParts = request.url.split("/");
    const route = urlParts[1];
    switch (route) {
      case "index.html":
        response.writeHead(200);
        return response.end(contents);
      case "/":
        response.writeHead(200);
        return response.end(contents);
      case "random":
        const nb = parseInt(urlParts[2]); // Récupérer le paramètre :nb en tant qu'entier
        if (!isNaN(nb)) {
          let randomNumbers = [];
          for (let i = 0; i < nb; i++) {
            randomNumbers.push(Math.floor(100 * Math.random()));
          }
          response.writeHead(200);
          return response.end(`<html><p>${randomNumbers.join("<br>")}</p></html>`);
        } else {
          response.writeHead(400);
          return response.end(`<html><p>400: Bad Request</p></html>`);
        }
      default:
        response.writeHead(404);
        return response.end(`<html><p>404: NOT FOUND</p></html>`);
    }
  } catch (error) {
    console.error(error);
    response.writeHead(500);
    return response.end(`<html><p>500: INTERNAL SERVER ERROR</p></html>`);
  }
}

const server = http.createServer(requestListener);
server.listen(port, host, () => {
  console.log(`Server is running on http://${host}:${port}`);
});

console.log("NODE_ENV =", process.env.NODE_ENV);
