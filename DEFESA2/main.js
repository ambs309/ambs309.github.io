// Initialize localStorage
if (!localStorage.getItem('produtos-selecionados')) {
    localStorage.setItem('produtos-selecionados', JSON.stringify([]));
}

// Fetch products from the API
fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
        carregarProdutos(data);
        atualizaCarrinho();
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));


function carregarProdutos(produtos) {
    const listaProdutos = document.querySelector('.lista-produtos');
    listaProdutos.innerHTML = ''; // Clear existing products
    produtos.forEach(produto => {
        const artigo = criarProduto(produto);
        listaProdutos.append(artigo);
    });
}

function criarProduto(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card');

    const titulo = document.createElement('h3');
    titulo.textContent = produto.title;

    const imagem = document.createElement('img');
    imagem.src = produto.image;
    imagem.alt = produto.title;

    const descricao = document.createElement('p');
    descricao.textContent = produto.description;

    const rating = document.createElement('p');
    rating.textContent = produto.rating;
   
    const preco = document.createElement('p');
    preco.textContent = `${produto.price.toFixed(2)} €`;

    const botao = document.createElement('button');
    botao.textContent = '+ Adicionar ao Carrinho';
    botao.addEventListener('click', () => adicionarAoCarrinho(produto));

    artigo.append(titulo, imagem, descricao, rating , preco, botao);
    return artigo;
}



//tive de adicionar o rating porque por algum motivo não o tinha no LAB 10 original


function adicionarAoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));


    const produtoComId = { ...produto, idUnico: crypto.randomUUID() };
    carrinho.push(produtoComId);

    localStorage.setItem('produtos-selecionados', JSON.stringify(carrinho));
    atualizaCarrinho();
}


function atualizaCarrinho() {
    const carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));
    const secaoCarrinho = document.querySelector('.carrinho');
    secaoCarrinho.innerHTML = '<p class="total">Custo total: 0€</p>';

    let total = 0;
    carrinho.forEach(produto => {
        const artigo = criaProdutoCarrinho(produto);
        secaoCarrinho.append(artigo);
        total += produto.price;
    });

    document.querySelector('.total').textContent = `Custo total: ${total.toFixed(2)}€`;
}


function criaProdutoCarrinho(produto) {
    const artigo = document.createElement('article');
    artigo.classList.add('product-card');

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

function removerDoCarrinho(produto) {
    let carrinho = JSON.parse(localStorage.getItem('produtos-selecionados'));

    carrinho = carrinho.filter(item => item.idUnico !== produto.idUnico);

    localStorage.setItem('produtos-selecionados', JSON.stringify(carrinho));
    atualizaCarrinho();
}


document.querySelectorAll('.ancora').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();

        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);

        if (targetElement) {
            const headerHeight = document.querySelector('header').offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;

            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth',
            });
        }
    });
});

const filtroCategoria = document.getElementById('filtro-categoria');
const ordenarPreco = document.getElementById('ordenar-preco');
const pesquisar = document.getElementById('pesquisar');


let produtosOriginais = [];

// Atualizar produtos com base nos controles
function atualizarProdutos() {
    let produtosFiltrados = [...produtosOriginais];

    // Filtrar por categoria
    const categoria = filtroCategoria.value;
    if (categoria !== 'all') {
        produtosFiltrados = produtosFiltrados.filter(produto => produto.category === categoria);
    }

    // Ordenar por preço
    const ordem = ordenarPreco.value;
    if (ordem === 'asc') {
        produtosFiltrados.sort((a, b) => a.price - b.price);
    } else if (ordem === 'desc') {
        produtosFiltrados.sort((a, b) => b.price - a.price);
    }

    // Pesquisar por texto
    const textoPesquisa = pesquisar.value.toLowerCase();
    if (textoPesquisa) {
        produtosFiltrados = produtosFiltrados.filter(produto =>
            produto.title.toLowerCase().includes(textoPesquisa)
        );
    }

    // Recarregar os produtos com base nos filtros aplicados
    carregarProdutos(produtosFiltrados);
}

// Event listeners para os controles
filtroCategoria.addEventListener('change', atualizarProdutos);
ordenarPreco.addEventListener('change', atualizarProdutos);
pesquisar.addEventListener('input', atualizarProdutos);

// Modificar a função de carregamento inicial para armazenar os produtos
fetch('https://deisishop.pythonanywhere.com/products/')
    .then(response => response.json())
    .then(data => {
        produtosOriginais = data; // Armazena os produtos originais
        carregarProdutos(data);
        atualizaCarrinho();
    })
    .catch(error => console.error('Erro ao carregar produtos:', error));




