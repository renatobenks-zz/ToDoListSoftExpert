# Tasks

## Level 1 (100)

### WEB-101

- [ ] Suportar a tecla ENTER no input para adicionar um ToDo item

Nós gostaríamos de poder adicionar um ToDO item, usando a tecla `enter`

### WEB-102

- [ ] Adicionar um ToDO item causa perca de foco no text field

 Como nós habilitamos a tecla `enter` para adicionar um ToDo item, nossos usuários
 notaram que ao adicionar, o text field perde o foco e eles precisam clicar manualmente no input
 para voltar o foco para ele.

 Por favor, garanta que ao adicionar um ToDo item, o foco irá voltar (ou manter-se) ao text field.

### WEB-103

- [ ] Adicione um filtro de status como TESTE

Como um usuário, eu quero ter uma opção para esconder itens que não me interessam
baseado nos seus status.

Essa feature deve ser implementada como um teste, similar ao "renderBottom",
e deve se chamar "filter".

Por favor, implemente o filtro abaixo da lista como radio buttons, contendo estas três opções:

- Mostrar ToDos (habilitado por padrão)
- Somente abertos
- Somente fechados

Estes radio buttons devem ser mutuamente exclusivos, apenas um deles pode ser selecionado.

Ex.: se "Somente abertos" estiver selecionados, apenas os ToDo items que tiverem o `done`
setado como `false` devem ser mostrados.

### WEB-104

- [ ] Adicione um TESTE para mudar a posição do filtro

Descobrimos que para usuários que tem o teste "renderBottom" habilitado, ficou difícil
utilizar o filtro. Nossos especialistas UX entendem que quando os dois testes estão
habilitados `#renderBottom#filter`, a parte de baixo da interface fica sobrecarregada.

Nós gostaríamos de testar a posição do filtro no topo da interface, quando o input
está posicionado na posição de baixo na aplicação ("renderBottom").

Este teste, pode se chamar "filterTop" e só pode ser ativado quando os testes "filter" e "renderBottom"
estão ativos também. A hash da URL deve estar mais ou menos assim "index.html#filter#renderBottom#filterTop".

### WEB-110

- [ ] Melhore a aparência visual da aplicação

Nosso departamento de design acredita que o design atual não é o melhor e pode ser melhorado.

Por favor, melhore esta experiência para o usuário. Sinta-se livre para usar seu próprio design,
ou para implementar um já existente. Se você não consegue decidir em qual utilizar, nossa proposta
seria utilizar [este aqui](https://dribbble.com/shots/2084038-Just-Do).

Sinta-se livre também para adicionar um pré-processador CSS como Sass, PostCSS ou
Less ao build do webpack para tornar sua vida um pouco mais fácil.
Usar CSS puro, também não é um problema. Faça como achar melhor.

### WEB-120

- [ ] Salve a lista de ToDo items

Nós gostaríamos agora, que a aplicação salvasse os ToDo items que o usuário adicionar.
Assim quando ele atualizar a página, sua lista estará intacta e não irá perder nada.

A decisão de qual tecnologia usar, é totalmente com você. É suficiente para nós que
a sua solução para isso funcione no Chrome e no Firefox.

Se desejar, utilizar alguma tecnologia no back para salvar, apenas nos informe como
iremos ligá-la para revisar e nos envies os fontes também.

## Level 2 (200)

### WEB-201

- [ ] Extraia o CSS em um arquivo separado

Atualmente, o CSS da aplicação está incluído no `bundle.js`.
Entretanto, nossos usuários começaram a comentar sobre a aplicação estar
sem nenhum estilo quando inicia, e nós gostaríamos então de separar o CSS em outro arquivo.

Por favor, integre o plugin `extract-text-webpack-plugin` na configuração do webpack
e carregue o arquivo CSS separamente do bundle javascript.

### WEB-202

- [ ] Otimize a geração do bundle

Atualmente nosso bundle gerado não está otimizado e está um pouco grande para uma
aplicação pequena. Por favor, ajuste as configurações do webpack para que possamos
criar um bundle otimizado ao invés do bundle grande. Seria ideal se tanto Javascript
e o CSS fossem minificados.

### WEB-203

- [ ] Substitua a lib/state.js

Acontece que nós não estamos imunes à "sindrome das libs não inventadas aqui", e
pensamos que seria uma boa ideia reimplementar uma lib popular atualmente.
Mas achamos que agora não há boas razões pra manter essa lib já que a lib na qual
nós nos inspiramos está bem confiável. Dito isso, gostaríamos que a nossa lib/state.js
fosse substituida pela lib original que à influenciou.

A lib que nos influenciou foi o `Redux`. Por favor refatore o código atual
para que use `Redux` invés do código que fizemos nós mesmos.

## Level 3 (300)

### WEB-301

- [ ] Otimize a renderização da view

Infelizmente alguns dos nossos usuários começaram a reclamar que a performance
da aplicação está ruim. Alguns deles disseram que adicionaram *mais mil* ToDo items
e que chegando neste grande número a aplicação começa a travar após adicionar mais
ToDo items ou modificar algum estado.

Nosso time de performance identificou que este problema esta relacionado ao modo
como nós renderizamos a o HTML da aplicação.

Por favor, substitua o `innerHTML` pela library React.js, que tem internamente o
virtualDom para tratar de gargalos em manipulação do DOM.
Será necessário adicionar um plugin ao `Babel` para usar a sintaxe JSX. Claro que
se você desejar, pode escrever o código em Javascript puro, entretanto recomendamos
que a sintaxe JSX seja usada.

React não é a única opção atualmente. Se você preferir usar outra biblioteca para resolver
este problema de performance, fique à vontade. Nós achamos realmente interessante
usar o React, pois esta é nossa stack atual. Se você decidir fazer isso, por favor escreva
uma boa explanação do porque você escolheu usar outra biblioteca.

### WEB-302

- [ ] Compilação estática dos testes

Nós gostaríamos de poder decidir na compilação do  bundle, se o teste "filter"
deve ou não estar habilitado.

Por favor, crie um plugin babel que pode alterar estaticamente o código `isEnabled('filter')` por
`true` ou `false` baseado em alguma parte da configuração webpack (à sua escolha).

Dica: Provavelmente você pode criar um webpack loader para isso.

### WEB-303

- [ ] Melhore a experiência do desenvolvedor

Nós fomos informados que nossos desenvolvedores não estão sendo tão produtivos quanto
poderiam e precisam constantemente atualizar a página e esperar o webpack watcher acabar
para ver suas alterações. Nós acreditamos que usando o webpack dev server, eles poderiam
ser mais produtivos.
