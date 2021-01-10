export class Office {
    id: string;
    name: string | undefined;
 
    constructor(id: string, name: string) {
        this.id = id;
        this.name = name;
    }
  }