//Modelo de datos, quizzes es array de objetos con question y answer

const fs = require("fs");

//Nombre del fichero con las preguntas
const DB_FILENAME = "quizzes.json";
let quizzes = [
    {
        question: "Capital de Italia",
        answer: "Roma"
    },
    {
        question: "Capital de Francia",
        answer: "París"
    },
    {
        question: "Capital de España",
        answer: "Madrid"
    },
    {
        question: "Capital de Portugal",
        answer: "Lisboa"
    }
];

//Carga el contenido del fichero con las preguntas en quizzes
const load = () => {

    fs.readFile(DB_FILENAME, (err, data) => {
        if (err) {

            //La primera vez no existe el fichero
            if (err.code === "ENOENT") {
                save(); //Crea el fichero con lo que haya en quizzes
                return;
            }
            throw err;
        }

        let json= JSON.parse(data);
        if (json) {
            quizzes = json;
        }
    });
};

const save = () => {

    fs.writeFile(DB_FILENAME,
        JSON.stringify(quizzes),
        err => {
        if (err) throw err;
    });
};

//Devuelve el número de preguntas existentes
exports.count = () => quizzes.length;

//Añade un nuevo quiz
exports.add= (question, answer) => {

    quizzes.push({
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

//Actualiza el quiz en la posición index
exports.update = (id, question, answer) => {

    const quiz = quizzes[id];
    if (typeof quiz === "undefined") {
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id, 1, {
        question: (question || "").trim(),
        answer: (answer || "").trim()
    });
    save();
};

//Devuelve todos los quizzes existentes
exports.getAll = () => JSON.parse(JSON.stringify(quizzes));


//Devuelve el objeto quiz de la posición dada
exports.getByIndex = id => {

    const quiz = quizzes[id];
    if (typeof quiz === "undefined") {
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    return JSON.parse(JSON.stringify(quiz));
};

//Elimina el quiz situado en la posición dada
exports.deleteByIndex = id => {

    const quiz = quizzes[id];
    if (typeof quiz === "undefined") {
        throw new Error(`El valor del parámetro id no es válido.`);
    }
    quizzes.splice(id, 1);
    save();
};


//Carga los quizzes almacenados en el fichero
load();