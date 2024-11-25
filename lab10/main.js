// Inicializar localStorage
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Carregar produtos
function carregarProdutos(produtos) {
    const listaProdutos = document.querySelector('.lista-produtos');
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.append(artigo);
    });
}

// Criar elemento de produto
function criarProduto(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const preco = document.createElement('p');
    preco.textContent = `${produto.price.toFixed(2)} €`;

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Carrinho';
    botao.addEventListener('click', () => adicionarAoCarrinho(produto));

    artigo.append(titulo, imagem, descricao, preco, botao);
    return artigo;
}

// Adicionar produto ao Carrinho
function adicionarAoCarrinho(produto) {
    let Carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));
    
    // Adicionar um identificador único ao produto porque senao vou a viola
    const produtoComId = { ...produto, idUnico: crypto.randomUUID() };
    Carrinho.push(produtoComId);

    localStorage.setItem('produtos-selecionados', JSON.stringify(Carrinho));
    atualizaCarrinho();
}

// Atualizar Carrinho
function atualizaCarrinho() {
    const Carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));
    const secaoCarrinho = document.querySelector('.carrinho');
    secaoCarrinho.innerHTML = '<p class="total">Custo total: 0€</p>';

    let total = 0;
    Carrinho.forEach(produto => {
        const artigo = criaProdutoCarrinho(produto);
        secaoCarrinho.append(artigo);
        total += produto.price;
    });

    document.querySelector('.total').textContent = `Custo total: ${total.toFixed(2)}€`;
}

// Criar artigo no Carrinho
function criaProdutoCarrinho(produto) {
    const artigo = document.createElement('article');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const preco = document.createElement('p');
    preco.textContent = `${produto.price.toFixed(2)} €`;

    const botao = document.createElement('button');
    botao.textContent = '- Remover do Carrinho';
    botao.addEventListener('click', () => removerDoCarrinho(produto));

    artigo.append(titulo, imagem, preco, botao);
    return artigo;
}

// Remover produto do Carrinho
function removerDoCarrinho(produto) {
    let Carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));
    
 
    Carrinho = Carrinho.filter(item => item.idUnico !== produto.idUnico);

    localStorage.setItem('produtos-selecionados', JSON.stringify(Carrinho));
    atualizaCarrinho();
}

document.addEventListener('DOMContentLoaded', () => {
    carregarProdutos(produtos);
    atualizaCarrinho();
});
