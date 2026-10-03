const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = process.env.PORT || 3000;
const HOST = "0.0.0.0";

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host || "localhost"}`);

    // =========================
    // BACKEND API
    // =========================

    if (req.method === "GET" && url.pathname === "/api/birthday") {
        const response = {
            message:
                "Даниэл, сервер подтверждает: ты официально именинник! Пусть в жизни будет больше хороших людей, денег, спокойствия и чак-чака.",
            signature:
                "Backend: Daniel Birthday API • Status: OK",
            timestamp:
                new Date().toISOString()
        };

        res.writeHead(200, {
            "Content-Type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Cache-Control": "no-cache"
        });

        res.end(JSON.stringify(response));
        return;
    }

    // =========================
    // ГЛАВНАЯ СТРАНИЦА
    // =========================

    if (req.method === "GET" && (url.pathname === "/" || url.pathname === "/index.html")) {
        const filePath = path.join(__dirname, "index.html");

        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.writeHead(500, {
                    "Content-Type": "text/plain; charset=utf-8"
                });

                res.end("Ошибка загрузки index.html");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/html; charset=utf-8"
            });

            res.end(data);
        });

        return;
    }

    // =========================
    // CSS
    // =========================

    if (req.method === "GET" && url.pathname === "/DRDANIELCSS.css") {
        const filePath = path.join(__dirname, "DRDANIELCSS.css");

        fs.readFile(filePath, (error, data) => {
            if (error) {
                res.writeHead(500, {
                    "Content-Type": "text/plain; charset=utf-8"
                });

                res.end("Ошибка загрузки CSS");
                return;
            }

            res.writeHead(200, {
                "Content-Type": "text/css; charset=utf-8"
            });

            res.end(data);
        });

        return;
    }

    // =========================
    // НЕИЗВЕСТНЫЙ АДРЕС
    // =========================

    res.writeHead(404, {
        "Content-Type": "text/plain; charset=utf-8"
    });

    res.end("404 Not Found");
});

server.listen(PORT, HOST, () => {
    console.log(`Сайт запущен: http://localhost:${PORT}`);
});