import swaggerJSDoc from 'swagger-jsdoc';

const options: swaggerJSDoc.Options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'API de Controle Financeiro Pessoal',
      version: '1.0.0',
      description: 'Documentação interativa da API RESTful para registro de lançamentos financeiros (receitas e despesas).'
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
        description: 'Servidor Local de Desenvolvimento'
      }
    ],
    components: {
      schemas: {
        Transaction: {
          type: 'object',
          properties: {
            id: {
              type: 'integer',
              example: 1,
              description: 'Identificador único do lançamento'
            },
            description: {
              type: 'string',
              example: 'Salário Mensal',
              description: 'Descrição do lançamento financeiro'
            },
            amount: {
              type: 'number',
              format: 'float',
              example: 3500.00,
              description: 'Valor monetário do lançamento'
            },
            type: {
              type: 'string',
              enum: ['INCOME', 'EXPENSE'],
              example: 'INCOME',
              description: 'Tipo do lançamento (Receita ou Despesa)'
            },
            category: {
              type: 'string',
              example: 'Trabalho',
              description: 'Categoria do lançamento'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2026-09-30',
              description: 'Data da transação (AAAA-MM-DD)'
            },
            createdAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-30T12:00:00.000Z'
            },
            updatedAt: {
              type: 'string',
              format: 'date-time',
              example: '2026-09-30T12:00:00.000Z'
            }
          }
        },
        TransactionInput: {
          type: 'object',
          required: ['description', 'amount', 'type', 'category'],
          properties: {
            description: {
              type: 'string',
              example: 'Salário Mensal'
            },
            amount: {
              type: 'number',
              format: 'float',
              example: 3500.00
            },
            type: {
              type: 'string',
              enum: ['INCOME', 'EXPENSE'],
              example: 'INCOME'
            },
            category: {
              type: 'string',
              example: 'Trabalho'
            },
            date: {
              type: 'string',
              format: 'date',
              example: '2026-09-30'
            }
          }
        },
        ErrorResponse: {
          type: 'object',
          properties: {
            status: {
              type: 'string',
              example: 'error'
            },
            message: {
              type: 'string',
              example: 'Mensagem descritiva do erro'
            }
          }
        }
      }
    }
  },
  apis: ['./src/routes/*.ts']
};

export const swaggerSpec = swaggerJSDoc(options);