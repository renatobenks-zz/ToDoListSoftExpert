# Technologies

Descrição relativa ao que foi implementado
das tecnologias adicionadas ou modificadas
à fim de justifcar o uso delas e suas mudanças.
Onde em que uma aplicação real, podem ter grandes impactos! E na
minha perspectiva, toda tomada decisão onde algo muda,
as mudanças devem ser claras e transparentes à todos
estão envolvidos nelas.

## webpack

> Atualizado

### Node.js + Express

- running app with server with node.js

Em vista da necessidade que foi vista, de ter configurado
um *server* http rodando o app a fim de controlar melhor a
aplicação no *client-side*. Como utilizamos o webpack para o
bundle da aplicação, através do uso do node.js com express,
podemos subir essa aplicação para um servidor onde ela poderá
ser executada com os recrusos do webpakc,
e assim montando a aplicação através do webpack com o node.js.

### webpack version:

- updated to version: 2.2.1

Atualmente existem duas versões completamente estáveis do webpack.
A versão 1.x.x e a 2.x.x, ambas com distintas características e
features.

Essas diferenças podem ser notadas logo
ao pesquisar sobre a tecnologia. Pois, mesmo sendo a mesma
ferramenta em ambas versões, dividiram ela em duas,
sendo a versão 2.x, uma extensão e melhoria da 1.x, obviamente.
Sendo assim, foi até dividio a documentação do webpack
por justamente eles terem diferentes implementações.

Onde, se tratando até da documentação da ferramenta,
a versão 2.x está mais clara, limpa, simples e melhor exemplificada.
O que já é um bom fator para se escolher trabalhar com a versão
2.x do webpack, mas não o único.

[webpack 2.x](https://webpack.js.org/) - Versão estável atual

[webpack 1.x](https://webpack.github.io/) - Versão antiga

Mas a decisão de atualização da versão veio principalmente
porque aplicações Javascript escritas em ES2015 ou superior
hoje tem exigido claramente a utilização do weboack
e consequeneda da versão do webpack 2.x,
pois justamente esta versão vem com features na maneira de
executar os `loaders` da aplicação de maneira diferente
da versão anterior, e as ferramentas de plugin, principalmente,
que são executadas com o webpack,
estão sendo escritas na compatibilidade dessa versão pelas
vantagens das suas features. Existem poucas ferramentas de
cooperação com webpack que não tem compatibilidade para a versão
2, mas existem. Por essa razão, decisões como essa devem ser
análisadas com cuidado com aplicações reais em produção,
por exemplo.

E essa descrição é só uma pincelada dos motivos de escolher
trabalhar com a versão 2.x e não com a 1.x.

### webpack config:

- created two webpack configurations files
- webpack configuration version 2.x.x

Em vista da atualização que foi feita na versão do webpack,
assim mudando a estrutura do arquivo que faz o bundle com webpack.
Percebeu-se que a fim de ilustração e transparência fosse
exposto de forma clara as distinções de ambients e necessidades
no bundle do webpack. Dessa forma, foi configurado dois
arquivos de bundle do webpack que representasse o ambiente de
desenvolvimento e de produção. Podíamos ter mantido a
configuração padrão do webpack em um só arquivo
(*webpack.config.js*), tratando as distinções na hora de
execução do app com o node.js, mas a fim de representação,
achei melhor ilustrar com dois arquivos distintos separados.

- created two webpack configurations files
- webpack configuration version 2.x.x

Em vista da atualização que foi feita na versão do webpack,
assim mudando a estrutura do arquivo que faz o bundle com webpack.
Percebeu-se que a fim de ilustração e transparência fosse
exposto de forma clara as distinções de ambients e necessidades
no bundle do webpack. Dessa forma, foi configurado dois
arquivos de bundle do webpack que representasse o ambiente de
desenvolvimento e de produção. Podíamos ter mantido a
configuração padrão do webpack em um só arquivo
(*webpack.config.js*), tratando as distinções na hora de
execução do app com o node.js, mas a fim de representação,
achei melhor ilustrar com dois arquivos distintos separados.

---
