const express = require("express");
const { query } = require("./conexao");

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  try {
    const data = await query("SELECT * FROM produtos");
    res.json(data);
  } catch (error) {
    console.log(error);
  }
});

app.post("/cadastrar", async (req, res) => {
  const { nome, qtd, preco } = req.body;
  try {
    const data = await query(
      "INSERT INTO produtos (nome_produto, qtd_produto, preco_produto) VALUES ($1, $2, $3) RETURNING *",
      [nome, qtd, preco]
    );

    res.json({ msg: "Produto cadastrado", product: data[0] });
  } catch (error) {
    console.log(error);
  }
});

app.listen(3000, () => {
  console.log("Server is running");
});
