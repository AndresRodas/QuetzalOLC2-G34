class Entorno{
    anterior;
    tabla;
    identificador;

    constructor(anterior, identificador){
        this.tabla = {};
        this.anterior = anterior;
        this.identificador = identificador;
    }

    agregar(id, simbolo){
        id = id.toLowerCase();
        simbolo.identificador = simbolo.identificador.toLowerCase();
        this.tabla[id] = simbolo;
    }

    eliminar(id){
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior)
        {   
            const value = e.tabla[id]
            if (value!==undefined)
            {
                delete e.tabla[id];
                return true;
            }
        }
        return false;
    }

    existe(id){
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                return true;
            }
        }
        return false;
    }

    existeEnActual(id){
        id = id.toLowerCase();
        if (this.tabla[id]!==undefined)
        {
            return true;
        }
        return false;
    }

    getSimbolo(id){
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior)
        {
            if (e.tabla[id]!=undefined)
            {
                return e.tabla[id];
            }
        }
        return null;
    }

    reemplazar(id, nuevoValor){
        id = id.toLowerCase();
        for (let e = this; e != null; e = e.anterior)
        {
            const value = e.tabla[id]
            if (value!==undefined)
            {
                e.tabla[id] = nuevoValor;
            }
        }
    }

}