

export class  HistoriaClinica {

    id: number = 0;

    name: string = "";

    birth: Date = new Date();

    gender: String = "";

    pnumber: number = 0;

    email: string = "";

    resume: string = "";

    constructor(initializer?: any) {

        if(!initializer) return;
        if(initializer.id) this.id = initializer.id;
        if(initializer.name) this.name = initializer.name;
        if(initializer.birth) this.birth = initializer.birth;
        if(initializer.gender) this.gender = initializer.birth;
        if(initializer.pnumber) this.pnumber = initializer.pnumber;
        if(initializer.email) this.email = initializer.email;
        if(initializer.resume) this.resume = initializer.resume;

    }


}
