# ReFood MVP - TODO

## Fase 1: Funcionalidades Essenciais do MVP

### Autenticação e Usuários
- [x] Sistema de autenticação com Manus OAuth
- [x] Diferentes tipos de usuário (Doador/Empresa, Receptor/ONG, Admin)
- [x] Perfil de usuário com informações básicas
- [x] Dashboard personalizado por tipo de usuário

### Listagem de Alimentos (Doadores)
- [x] Formulário para cadastrar alimentos disponíveis
- [x] Campos: tipo de alimento, quantidade, descrição, data de validade, localização
- [x] Galeria de imagens dos alimentos
- [x] Status de disponibilidade (disponível, reservado, doado)
- [x] Listagem de alimentos cadastrados pelo usuário

### Marketplace/Descoberta (Receptores)
- [x] Listagem de alimentos disponíveis com filtros
- [x] Busca por tipo de alimento
- [ ] Filtro por localização/distância
- [x] Visualização detalhada de cada alimento
- [ ] Mapa interativo mostrando locais dos alimentos

### Sistema de Reserva/Doação
- [x] Funcionalidade de reservar alimento
- [x] Funcionalidade de marcar como doado
- [x] Histórico de transações
- [ ] Notificações de reserva/doação

### Gamificação
- [x] Sistema de pontos/créditos por doação
- [ ] Ranking de doadores
- [ ] Badges/conquistas
- [x] Exibição de impacto (alimentos salvos, pessoas ajudadas)

### Dashboard e Relatórios
- [x] Dashboard para doadores com estatísticas
- [x] Dashboard para receptores com histórico
- [ ] Relatórios ESG para empresas
- [x] Métricas de impacto social

## Fase 2: Refinamentos e Melhorias
- [x] Adicionar logo no navbar
- [x] Traduzir interface completa para português brasileiro
- [x] Otimizar imagens e assets

## Fase 3: Remover Banco de Dados
- [x] Remover integração com banco de dados MySQL
- [x] Converter para dados em memória
- [x] Atualizar routers tRPC para usar mock data
- [x] Testar todas as funcionalidades

## Fase 4: Recursos Avançados (Pós-MVP)
- [ ] Sistema de pagamento para plano premium
- [ ] Integração com ONGs parceiras
- [ ] App mobile
- [ ] Chat entre doadores e receptores
- [ ] Agendamento automático de coletas
- [ ] Integração com sistemas de logística

## Bugs Reportados
(Nenhum no momento)

## Notas
- Foco inicial: conectar supermercados/restaurantes com ONGs
- Prioridade: funcionalidade de listagem e reserva funcionando
- Design: cores verde (#1B7C3A) e laranja (#FFA500) conforme brand
