

export class  HistoriaClinica {

    nombre: string = "";

    edad: Date = new Date();

    fechaNacimiento: Date = new Date();

    historia: string = "";

    constructor(initializer?: any) {
        if(!initializer) return;
        if(initializer.nombre) this.nombre = initializer.nombre;
        if(initializer.edad) this.edad = initializer.edad;
        if(initializer.fechaNacimiento) this.fechaNacimiento = initializer.fechaNacimiento;
        if(initializer.historia) this.historia = initializer.historia;
    }


}
