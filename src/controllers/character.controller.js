import Character from "../models/character.model.js";

export const CreateCharacter = async (req, res) => {
    const { name, ki, race, gender, description } = req.body;

    if (req.body) {
        for (let valor in req.body) {
            if (typeof req.body[valor] === "string") {
                req.body[valor] = req.body[valor].trim();
            }
        }
    }

    //Validacion de campos obligatorios
    if (name === undefined)
        return res.status(400).json({ message: "El nombre es obligatorio" });
    if (ki === undefined)
        return res.status(400).json({ message: "El ki es obligatorio" });
    if (race === undefined)
        return res.status(400).json({ message: "La raza es obligatoria" });
    if (gender === undefined)
        return res.status(400).json({ message: "El género es obligatorio" });

    //Validacion de Ki
    const KiEntero = Math.floor(ki);
    if (ki !== KiEntero)
        return res.status(400).json({ message: "El ki debe ser un número entero" });

    //Validacion de Genero
    if (gender !== "Masculino" && gender !== "Femenino")
        return res
            .status(400)
            .json({ message: "El género debe ser 'Masculino' o 'Femenino'" });


    //validacion nombre unico
    const nombreUnico = await Character.findOne({ where: { name } });
    if (nombreUnico !== null)
        return res
            .status(400)
            .json({ message: "El nombre ya existe,elige otro nombre" });

    try {
        const character = await Character.create({
            name,
            ki,
            race,
            gender,
            description,
        });
    } catch (error) {
        res.status(500).json({ message: "Error creando el personaje" });
    }
};

//esto actualiza personajes ya creados
export const ActualizacionPersonaje = async (req, res) => {
    const { name, ki, race, gender, description } = req.body;

    if (req.body) {
        for (let propiedad in req.body) {
            if (typeof req.body[propiedad] == "string") {
                req.body[propiedad] = req.body[propiedad].trim;
            }
        }
    }

    try {
        //validacion del nombre unico
        const nombreUnico = await Character.findOne({ where: { name } });
        if (nombreUnico && nombreUnico.id != req.params.id)
            return res.status(400).json({ Message: "Nombre existente" });

        const [updated] = await Character.update(
            { name, ki, race, gender, description },
            { where: { id: req.params.id } }
        );

        if (updated === 0)
            return res.status(404).json({ Message: "El personaje no existe" });

        return res.status(200).json({ Message: "Se actualizo el personaje" });
    } catch (error) {
        res.status(500).json({ Message: error.message });
    }
};

//Obtener todos los personajes 
export const obtenerTodosLosPersonajes = async (req, res) => {
    try {
        const personajes = await Character.findAll();
        if (!personajes || personajes.length === 0)
            return res.json({ Message: "No existe nada en la base de datos" });

        return res.status(200).json(personajes);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//esto obtiene un personaje por id
export const ObtenerPorId = async (req, res) => {
    try {
        const personaje = await Character.findByPk(req.params.id);
        if (personaje) return res.status(200).json(personaje);

        return res.status(404).json({ Message: "El personaje no existe" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

//esto elimina un personaje
export const eliminarPersonaje = async (req, res) => {
    try {
        const deleted = await Character.destroy({ where: { id: req.params.id } });

        if (deleted === 0)
            return res.status(404).json({ Message: "Personaje no encontrado" });

        res.status(204).send(); // Se debe enviar respuesta aunque sea sin cuerpo
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};
