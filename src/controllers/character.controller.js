import Character from "../models/character.model.js";

export const CreateCharacter = async (req, res) => {
    const { name , ki, race, gender, description} = req.body ;

if(req.body){
    for (let valor in req.body) {
        if (typeof valor === "string") {
            req.body[valor] = req.body[valor].trim();
        }
    }
} 

    try {
        //Validacion de campos obligatorios
        if (name === undefined) return res.status(400).json(
            {message: "El nombre es obligatorio"});
        if (ki === undefined) return res.status(400).json(
            {message: "El ki es obligatorio"});
        if (race === undefined) return res.status(400).json(
            {message: "La raza es obligatoria"});
        if (gender === undefined) return res.status(400).json(
            {message: "El género es obligatorio"});

            //Validacion de Ki
            const KiEntero = Math.floor(ki);
            if(ki !== KiEntero) return res.status(400).json({message: "El ki debe ser un número entero"});

            //Validacion de Genero
            if(gender !== "Masculino" && gender !== "Femenino") return res.status(400).json(
                {message: "El género debe ser 'Masculino' o 'Femenino'"});

            //Validacion de descripcion
            if(typeof description !== "string") return res.status(400).json(
                {message: "La descripción debe ser una cadena de texto"});

            //validacion nombre unico
            const nombreUnico = await Character.findOne({ where: { name } });
            if(nombreUnico !== null) return res.status(400).json({message: "El nombre ya existe,elige otro nombre"});

        const character = await Character.create({name, ki, race, gender, description});
        
    } catch (error) {
        res.status(500).json({message: "Error creando el personaje"});
    }
}


