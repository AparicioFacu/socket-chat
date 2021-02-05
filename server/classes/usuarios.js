class Usuario {
    constructor() {
        this.personas = []; //array donde van a estar todas las personas
    }

    agregarPersona(id, nombre, sala) {
        let persona = { id, nombre, sala };

        this.personas.push(persona); //agrego una persona al array

        return this.personas; //devuelvo el array
    }

    getPersona(id) {
        let persona = this.personas.filter(persona => persona.id === id)[0]; //la funcion filter devuevle un nuevo arreglo con la condicion dada osea una persona con ese id al poner[0] me devuelve un solo registro(devuelve una sola persona)
        return persona;
    }

    getPersonas() { //devuelve a todas las personas que estan en el chat
        return this.personas
    }
    getPersonaPorSala(sala) {
        let personasEnSala = this.personas.filter(persona => persona.sala === sala);
        return personasEnSala;
    }
    borrarPersona(id) { //elimina la persona por si se desconecta del chat

        let personaBorrada = this.getPersona(id); //obtengo a la persona

        this.personas = this.personas.filter(persona => persona.id !== id); //regresa a todas las personas menos a la persona con el id que quiero eliminar

        return personaBorrada;
    }

}


module.exports = {
    Usuario
}