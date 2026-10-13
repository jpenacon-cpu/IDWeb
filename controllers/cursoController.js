let cursos = require('../data/cursosData');
exports.getAllCursos = (req, res) => {
    const {creditos} = req.query;
    if (creditos){
        const filtrados = cursos.filter(c=> c,creditos === parseInt(creditos));
        return res.status(200).json({status: 'success', data: filtrados });
    
    };
    res.status(200).json({ status: 'success', data: cursos });
};
exports.getCursoById = (req, res) => {
    const id = parseInt(req.params.id);
    const curso = cursos.find(c => c.id === id);
    if (!curso){
        return res.status(404).json({
            status: 'fail',
            message: 'Curso no encontrado',
        });
    }
    res.status(202).json({
        status: 'success',
        data: curso,
    });
};
exports.createCurso = (req, res) => {
    const {nombre,codigo,creditos} =  req.body;
    if (!nombre, !codigo, !creditos){
        return res.status(404).json({
            status: 'fail',
            message: 'Faltan campos obligatorios: nombre, codigo o creditos',
        });
    };
    const newCurso = {
        id: cursos.length >0 ? cursos[cursos.length-1].id +1: 1,
        nombre,
        codigo,
        creditos: parseInt(creditos),
    };
    cursos.push(newCurso);

    res.status(202).json({
        status: 'success',
        data: newCurso
    });
};
exports.actualizarCurso = (req,res) => {
    const idCursoActualizar = parseInt(req.params.id);
    const index = cursos.findIndex(c => c.id === idCursoActualizar);
    if (index=== -1){
        return res.status(404).json({
            status: 'fail',
            message: 'el curso no existe',
        });
    };
    const {nombre,codigo,creditos} =  req.body;
    const cursoActualizado = {
        id: idCursoActualizar,
        nombre,
        codigo,
        creditos: parseInt(creditos),
    };
    cursos[index] = cursoActualizado;
    res.status(200).json({
        status: 'success',
        data: cursoActualizado,
    });
};
exports.eliminarCurso = (req,res) => {
    const idCursoElminar = parseInt(req.params.id);
    const indexCursoAEliminar = cursos.findIndex(c => c.id === idCursoElminar);
    if (indexCursoAEliminar=== -1){
        return res.status(404).json({
            status: 'fail',
            message: 'el curso no existe',
        });
    };
    cursos.splice(indexCursoAEliminar,1);
    res.status(200).json({
        status: 'success',
        message: 'Curso Elimninado Exitosamente'
    });


}