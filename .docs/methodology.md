# Methodology

Depois de uma pequena, porém, profunda experiência com a metodologia
de desenvolvimento ágil, KanBan e os conceitos de
_Continuous Integration_ (_CI_), com algumas adptações, eu analisei
as respectivas instruções para a extensão, adptação e melhoria da aplicação,
e pude concluir que esta metodologia se adapta bem a realidade do teste
e auxiliará no processo de revisão e de entrega do mesmo.

## Concepts

### Delivering task

Nessa adptação da metodologia, que instruí o desenvolvimento de software
segue um conceito, em que cada tarefa deve ser uma _branch_ dentro do
repositório da aplicação alocado no git, e que cada tarefa deve ser
entregue em pull request, que é uma requisição de _merge_ da _branch_
da tarefa para a _branch (master_) principal do projeto.

- Formato:


    Tarefa: WEB-101
    Descrição da tarefa: Suportar a tecla ENTER no input para adicionar um ToDo item.
    Branch: [Tarefa]
    Pull request: [Tarefa] - [Descrição da tarefa]
    Descrição pull request: (Não existe um formato padrão,
                            mas por convenção deve conter
                            informações descritas respectivas
                            a tarefa escritas em formato markdown)


- Exemplo:


    Tarefa: WEB-101
    Descrição da tarefa: Suportar a tecla ENTER no input para adicionar um ToDo item.
    Branch: [Tarefa]
    Pull request: WEB-101 - Suportar a tecla ENTER no input para adicionar um ToDo item.
    Descrição pull request: ## Suportar a tecla ENTER no input para adicionar um ToDo item.
                            Adicionar um todo item, usando a tecla `enter`.
                            ![Button add ToDo](imagem do botão desenvolvido)


## Analyse task

No processo de entrega da tarefa,
a aplicação deve ser validada com as novas implementações feitas na tarefa.
Dessa forma, restrições e integrações dependem do contexto
da aplicação e da tarefa.
Porém, existem alguns padrões comuns de integrações e implementações
dessa metodologia. Como:

- code review: alguém do time de desenvolvimento análisa o
código implementado na tarefa, tendo em vista, aprovar ou não
a resolução da tarefa da forma implementada no pull request,
argumentando possíveis alterações no código, tirando dúvidas a
respeito do que foi feito, e etc. A ideia é manter a qualidade e
a melhoria contínua (_Continuous Improvement_)
no projeto e no desenvolvedor.

- CI service: um serviço externo integrado ao projeto para que seja
 feito o build do projeto, executando todos os testes da aplicação,
 a aplicação seja montada, etc. Para que seja validado que as novas
 implementações estão de acordo com as configurações do projeto ainda.
 E que nenhuma implementação prejudique o estado atual do app.

## This app:

Nesta aplicação de ToDo List, sendo que mesmo sendo uma resolução simples
de um teste, eu usarei esses mesmos conceitos de entrega _task by task_,
abrindo um pull request para cada tarefa de acordo com suas respectivas
caracteristicas de prioridade e tipo.

### Tasks

A classificação das tarefas serão descritas no GitHub
através das issues criadas que correspondem as tarefas
que devem ser desenvolvidas. Dessa forma a descrição de cada issue
corresponde a descrição de cada tarefa. As issues vão conter a classficação
pelas labels do GitHub. Como mostrado na figura à seguir:

![Labels issue on GitHub](images/github-issues-labels.png)

O conjunto de tarefas que vão ser desenvolvidas serão pertencentes ao
milestone criado para este _case study_.

Issue exemplo:

![Labels issue on GitHub](images/github-issue.png)

### Integrations:

Seguindo as respectivas intruções de análise da task para verificar
se o pull request aberto está dentro do correspondente que se espera
da tarefa, será usado duas ferramentas integradas ao projeto.

 - Travis CI: Serviço de integração contínua que executa os builds
 da aplicação no pull requests e no merge da task.

 - CodeClimate: Serviço de code review, onde um boot análise meu
 código com base nas configurações e métricas que será definida.

## Automated

Com a padronizaçao do processo de desenvolvimento e
entrega das tarefas é possível automatizar alguns processos.

Desta forma, eu criei uma branch `automating` de implementação
de automatizações no projeto:

- Travis CI: arquivo de configuração (.travis.yml)
com as instruções para executar os builds do app.

- Code Climate: arquivo de de configuração de análise do código
(.codeclimate.yml) para que o código seja revisado.

- Importação (Python): [script em _python_](../cli/tasks/get_tasks.py)
desenvolvido para importar as tasks descritas no
modelo que eu criei de ToDo List das tarefas que
preciso desenvolver, [veja o modelo](tasks.md).
Usando a API do GitHub e através
do novo modelo que usei para descrever as tarefas em ToDo List,
esse script importa as tasks em markdown para issues do GitHub.

- Git (bash): scripts escritos em bash script para facilitar a
troca, o inicio de terefas e a entrega de tarefas.
