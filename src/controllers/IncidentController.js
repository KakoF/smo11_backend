const connection = require('../database/connection')

module.exports = {

    async create(request, response){
        const { title, description, value } = request.body;
        const ong_id = request.headers.authorization;

        //const result = await connection('incidents').insert({
        const [id] = await connection('incidents').insert({
            title,
            description,
            value,
            ong_id
        })
        //const id = result[0];
        return response.json({ id })
    },

    async index(request, response){

        const { page = 1 } = request.query;

        //const incidents = await connection('incidents').select('*')

        //TOTAL DE REGISTROS
        //const total = await connection('incidents').count()
        const [ count ] = await connection('incidents').count()

        //Paginação COM JOIN
        const incidents = await connection('incidents')
            .join('ongs', 'ongs.id', '=', 'incidents.ong_id')
            .limit(5)
            .offset((page - 1) * 5)
            .select(['incidents.*', 
                'ongs.name', 
                'ongs.email', 
                'ongs.whatsapp',
                 'ongs.city', 
                 'ongs.uf'])

        /*const incidents = await connection('incidents')
            .limit(5)
            .offset((page - 1) * 5)
            .select('*')*/

        //PASSAMOS O COUNT NO HEADERS DO RESPONSE
        response.header('X-Total-Count', count['count(*)'])
        return response.json(incidents)
    },

    async delete(request, response){
        const { id } = request.params;
       
        const ong_id = request.headers.authorization;
        const incident = await connection('incidents').where('id', id).select('ong_id').first();

        if(incident.ong_id !== ong_id){
            return response.status(401).json({
                error: 'Operação não permitida'
            })
        }
        await connection('incidents').where('id', id).delete()
        return response.status(204).send()
    }


}