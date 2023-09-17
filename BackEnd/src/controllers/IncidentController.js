const connection = require('../database/connection');
const Hashids = require('hashids');
const hashids = new Hashids('holding out for a hero', 6);

module.exports = {
    async create (request, response) {
        var {title, description, value} = request.body;
        const ong_id = request.headers.authorization;

        value = value.replace('.', '');
        value = value.replace(',', '.');
        value = parseFloat(value);

        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })

        return response.json({ id });
    },

    async delete (request, response) {
        const { id } = request.params;
        const ong_id = request.headers.authorization;

        const incident = await connection('incidents')
            .where('id', id)
            .select('ong_id') //first retorna primeiro elemento do array, garantindo que retorne um número
            .first();
	
        if (incident.ong_id !== ong_id) {
            return response.status(401).json({ error: 'Operação não permitida.'}) //Pesquisar HTTP Status codes
        }

        await connection('incidents').where('id', id).delete();
        return response.status(204).send(); //Pesquisar HTTP Status codes
    },

    async get (request, response) {
        const { id } = request.params;
        const decodedId = hashids.decode(id);

        const incident = await connection('incidents')
            .join('ongs', 'ongs.id', "=", "incidents.ong_id")
            .where('incidents.id', parseInt(decodedId))
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf')
            .first();

        return response.json(incident);
    },

    async index (request, response) {
        const { page = 1 } = request.query;
        const [count] = await connection('incidents').count(); //colchetes para retornar número, não um array 
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', "=", "incidents.ong_id")
            .limit(50)
            .offset(( page - 1 ) * 50)
            .select('incidents.*', 'ongs.name', 'ongs.email', 'ongs.whatsapp', 'ongs.city', 'ongs.uf');

        response.header('X-Total-Count', count['count(*)']);
        return response.json(incidents);
    },
}