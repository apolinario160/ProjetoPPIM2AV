import  express  from 'express';


const porta = 3000;
const host = '0.0.0.0';
var listaUsuarios = [];

function processaCadastroUsuario(requisicao, resposta){
    //processar os parametros da url em http://localhost:3000
    const usuario = {
                        nome: requisicao.query.nome,
                        sobrenome: requisicao.query.sobrenome,
                        nomeUsuario: requisicao.query.nomeUsuario,
                        cidade: requisicao.query.cidade,
                        uf: requisicao.query.uf,
                        cep: requisicao.query.cep

                    }
    //Indica um  novo usuário na lista de usuários ja cadastrado
    listaUsuarios.push(usuario);
    //retornar a lista de usuário
    let conteudoResposta = `
    <!DOCTYPE html>
    <html lang="pt-br">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" crossorigin="anonymous">
      <title>Menu do Sistema
      </title>
    </head>
    <body>
        <h1>Lista de usuários cadastrados</h1>
        <table class="table table-striped table-hover">
            <thead>
                <tr>
                    <th>Nome</th>
                    <th>Sobrenome</th>
                    <th>Nome do Usuário</th>
                    <th>Cidade/UF</th>
                    <th>CEP</th>

                </tr>
            </thead>
            <tbody>`;
            
            for(const usuario of listaUsuarios){
                conteudoResposta += `
                    <tr>
                        <td>${usuario.nome}</td>
                        <td>${usuario.sobrenome}</td>
                        <td>${usuario.nomeUsuario}</td>
                        <td>${usuario.cidade}/${usuario.uf}</td>
                        <td>${usuario.cep}</td>

                    </tr>
                
                
                `;
            }
    conteudoResposta +=`
                </tbody>
            </table>
            <a class="btn btn-primary" href="/" role="button">Voltar ao Menu...</a>
            <a class="btn btn-primary" href="/cadastraUsuario.html" role="button">Continuar cadastrando</a>
        </body>
        <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.11.8/dist/umd/popper.min.js" integrity="sha384-I7E8VVD/ismYTF4hNIPjVp/Zjvgyol6VFvRkX/vR+Vc4jQkC+hVqc2pM8ODewa9r" crossorigin="anonymous"></script>
        <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/js/bootstrap.min.js" integrity="sha384-BBtl+eGJRgqQAUMxJ7pMwbEyER4l1g+O15P+16Ep7Q9Q+zqX6gSbd85u4mG4QzX+" crossorigin="anonymous"></script>

     </html>`;
    
     resposta.end(conteudoResposta);

}
const app = express();

// indicando para a aplicação como servir arquivos staticos localizado na pasta 'paginas'.
app.use(express.static('./paginas'));


app.get('/', (requisicao, resposta) =>{
    resposta.end(`
    <!DOCTYPE html>
<html lang="pt-br">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Menu do Sistema
  </title>
</head>
<body>
<h1>MENU</h1>
<ul>
    <li><a href="/cadastraUsuario.html">Cadastrar Usuário</a></li>
</ul>
</body>
</html>
    `)
});

//Rota para processar o cadastro de usuário endpoint ='/cadastraUsuario'

app.get('/cadastrarUsuario', processaCadastroUsuario);

app.listen(porta, host, () =>{
    console.log(`Servidor executando na url http://${host}:${porta}`);
});