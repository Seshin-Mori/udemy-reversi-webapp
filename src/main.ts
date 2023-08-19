import express from "express";
import morgan from "morgan";
import "express-async-errors";

const PORT = 3000;

const app = express();

//morganを使ってログを出力する。devは開発用のフォーマット
app.use(morgan("dev"));

//htmlファイルを返す用の設定
app.use(express.static("static", { extensions: ["html"] }));

//helloというパスにアクセスしたときに、{message: "Hello World!!!"}というJSONを返す
app.get("/api/hello", async (req, res) => {
  res.json({ message: "Hello World!!!" });
});

//エラーハンドリングを設定する
app.get("/api/error", async (req, res) => {
  throw new Error("エラーが発生しました");
});

app.use(errorHandler);

//ここでサーバーを起動する
app.listen(PORT, () => {
  console.log(`application started at http://localhost:${PORT}`);
});

//エラーハンドリングの関数
function errorHandler(
  err: any,
  _req: express.Request,
  res: express.Response,
  _next: express.NextFunction
) {
  console.error("Unexpected error occurred", err);
  res.status(500).send({ message: "Unexpected error occurred" });
}
