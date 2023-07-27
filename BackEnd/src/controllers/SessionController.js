const connection = require('../database/connection');

module.exports = {
    async create(request, response){

        console.log(request.body);
        const { id } = request.body;
        
        console.log(id);

        const ong = await connection('ongs')
            .where('id', id)
            .select('name')
            .first();
        
        if(!ong) {
            return response.status(400).json({error: 'Não foi encontrada nenhuma ONG com esse ID.'})
        }

        return response.json(ong);
    }
}