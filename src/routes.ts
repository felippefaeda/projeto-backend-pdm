import express from 'express';
import knex from './database/connection';

const routes = express();

routes.post('/produtos', async (request, response) => {
    const {
        nome,
        descricao,
        quantidade,
        preco
    } = request.body;

    const produto = {
        nome,
        descricao,
        quantidade,
        preco
    }

    const insertedIds = await knex('produto').insert(produto);
    const produto_id = insertedIds[0];

    return response.json({
        id: produto_id,
        ...produto
    });
});

routes.get('/produtos', async (request, response) => {
    const produtos = await knex('produto')
        .select('produto.codigo', 'produto.nome')
        .orderBy('produto.nome');

    return response.json(produtos);
});

routes.get('/produtos/:codigo', async (request, response) => {
    const { codigo } = request.params;

    const produto = await knex('produto')
        .select('produto.*')
        .where('produto.codigo', codigo)
        .first();

    return response.json(produto);
});

routes.put('/produtos/:codigo', async (request, response) => {
    const { codigo } = request.params;

    const {
        nome,
        descricao,
        quantidade,
        preco
    } = request.body;

    const produto = {
        nome,
        descricao,
        quantidade,
        preco
    }

    await knex('produto')
        .update(produto)
        .where('codigo', codigo);

    return response.json({
        status: 'success',
        data: produto
    });
});

routes.delete('/produtos/:codigo', async (request, response) => {
    const { codigo } = request.params;

    await knex('produto')
        .delete()
        .where('produto.codigo', codigo);

    return response.json({
        status: 'success'
    });
});

export default routes;

