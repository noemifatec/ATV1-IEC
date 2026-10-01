import { Router } from 'express';
import { TransactionController } from '../controllers/TransactionController';

const transactionRoutes = Router();
const controller = new TransactionController();

/**
 * @openapi
 * tags:
 *   name: Transactions
 *   description: Endpoints para gestão de lançamentos financeiros
 */

/**
 * @openapi
 * /transactions:
 *   get:
 *     summary: Listar todos os lançamentos
 *     description: Retorna a lista completa de receitas e despesas ordenadas por data.
 *     tags: [Transactions]
 *     responses:
 *       200:
 *         description: Lista obtida com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Transaction'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   post:
 *     summary: Criar novo lançamento financeiro
 *     description: Cadastra uma nova receita ou despesa no sistema.
 *     tags: [Transactions]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       201:
 *         description: Lançamento criado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Erro de validação nos dados enviados.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
transactionRoutes.get('/', controller.getAll);
transactionRoutes.post('/', controller.create);

/**
 * @openapi
 * /transactions/{id}:
 *   get:
 *     summary: Obter detalhes de um lançamento
 *     description: Retorna os dados detalhados de um lançamento financeiro específico pelo ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lançamento
 *     responses:
 *       200:
 *         description: Lançamento encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       404:
 *         description: Lançamento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   put:
 *     summary: Atualizar um lançamento existente
 *     description: Atualiza os atributos de um lançamento financeiro pelo ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lançamento
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TransactionInput'
 *     responses:
 *       200:
 *         description: Lançamento atualizado com sucesso.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Transaction'
 *       400:
 *         description: Dados inválidos fornecidos.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       404:
 *         description: Lançamento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *   delete:
 *     summary: Remover um lançamento financeiro
 *     description: Exclui permanentemente um lançamento financeiro pelo ID.
 *     tags: [Transactions]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: ID numérico do lançamento
 *     responses:
 *       204:
 *         description: Lançamento removido com sucesso (Sem conteúdo).
 *       404:
 *         description: Lançamento não encontrado.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 *       500:
 *         description: Erro interno no servidor.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ErrorResponse'
 */
transactionRoutes.get('/:id', controller.getById);
transactionRoutes.put('/:id', controller.update);
transactionRoutes.delete('/:id', controller.delete);

export { transactionRoutes };