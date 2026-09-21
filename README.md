<div align="center">

# 👥 Cadastro de Usuários

### Uma interface moderna, responsiva e intuitiva para gerenciamento de usuários.

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=for-the-badge&logo=javascript&logoColor=black)](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![LocalStorage](https://img.shields.io/badge/LocalStorage-323330?style=for-the-badge&logo=googlechrome&logoColor=white)](https://developer.mozilla.org/pt-BR/docs/Web/API/Window/localStorage)

<p>
  <a href="#-sobre-o-projeto">Sobre</a> •
  <a href="#-funcionalidades">Funcionalidades</a> •
  <a href="#-tecnologias">Tecnologias</a> •
  <a href="#-como-executar">Como executar</a>
</p>

</div>

## ✨ Sobre o projeto

O **Cadastro de Usuários** é uma aplicação web front-end para gerenciamento de registros de usuários. O projeto possui uma interface limpa e responsiva, permitindo cadastrar, consultar, editar e excluir usuários diretamente no navegador.

Os dados são armazenados localmente por meio do `localStorage`, sem necessidade de banco de dados ou servidor backend.

## 🚀 Funcionalidades

- ✅ Cadastro de usuários com nome, e-mail, telefone e senha
- ✅ Validação de campos obrigatórios
- ✅ Validação de formato de e-mail
- ✅ Bloqueio de e-mails duplicados
- ✅ Máscara automática para números de telefone
- ✅ Pesquisa em tempo real por nome ou e-mail
- ✅ Edição de usuários cadastrados
- ✅ Exclusão de usuários com confirmação
- ✅ Alternância entre tema claro e escuro
- ✅ Opção para mostrar ou ocultar a senha
- ✅ Contador de usuários cadastrados
- ✅ Persistência dos dados no navegador
- ✅ Layout responsivo para diferentes tamanhos de tela

## 🖥️ Preview

> Abra o arquivo `index.html` no navegador para visualizar a aplicação.

## 🛠️ Tecnologias

<div align="center">

| Tecnologia | Utilização |
| --- | --- |
| **HTML5** | Estrutura semântica da aplicação |
| **CSS3** | Estilização, responsividade e temas |
| **JavaScript** | Lógica, validações e interações |
| **LocalStorage** | Armazenamento local dos usuários |
| **Font Awesome** | Ícones da interface |
| **Google Fonts** | Tipografia com a fonte Inter |

</div>

## 📁 Estrutura do projeto

```text
cadastro-usuarios/
├── index.html           # Página principal da aplicação
├── README.md            # Documentação do projeto
└── src/
    ├── css/
    │   └── style.css    # Estilos e responsividade
    └── js/
        └── script.js    # Funcionalidades e regras da aplicação
```

## ⚙️ Como executar

### 1. Clone o repositório

```bash
git clone https://github.com/diegoorodrigues006/cadastro-usuarios.git
cd cadastro-usuarios
```

### 2. Execute a aplicação

Você pode abrir o arquivo `index.html` diretamente no navegador ou iniciar um servidor local:

```bash
python -m http.server 8000
```

Depois, acesse [`http://localhost:8000`](http://localhost:8000) no navegador.

> Também é possível utilizar a extensão **Live Server** no Visual Studio Code.

## 📖 Como utilizar

1. Informe o nome, e-mail, telefone e senha do usuário.
2. Clique em **Cadastrar Usuário**.
3. Utilize a barra de pesquisa para encontrar registros por nome ou e-mail.
4. Clique no ícone de edição para atualizar um cadastro.
5. Clique no ícone de lixeira para excluir um usuário.
6. Use o botão de tema para alternar entre o modo claro e o modo escuro.

## 🔒 Observação sobre os dados

Este projeto é uma demonstração front-end. Os dados são armazenados no `localStorage` do navegador e **não devem ser utilizados para armazenar informações reais ou senhas em produção**. Para um sistema real, recomenda-se utilizar um backend, banco de dados e métodos adequados de autenticação e criptografia.

## 📌 Possíveis melhorias futuras

- [ ] Adicionar backend e banco de dados
- [ ] Implementar autenticação de usuários
- [ ] Criptografar senhas
- [ ] Adicionar paginação para listas grandes
- [ ] Criar testes automatizados
- [ ] Publicar uma demonstração online

## 👨‍💻 Autor

**Diego Rodrigues dos Santos**

[![GitHub](https://img.shields.io/badge/GitHub-diegoorodrigues006-181717?style=for-the-badge&logo=github)](https://github.com/diegoorodrigues006)

---

<div align="center">
  Desenvolvido com 💙 para estudos e prática de desenvolvimento front-end.
</div>
