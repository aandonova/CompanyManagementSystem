export class Office {
    id: number;
    name: string | undefined;
 
    constructor(id: number, name: string) {
        this.id = id;
        this.name = name;
    }
  }