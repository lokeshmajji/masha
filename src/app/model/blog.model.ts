export class Blog{

    constructor(
    public heading : string,
    public blogtext : string,
    public datecreated: Date,
    public datemodified: Date,
    public tags : string[],
    public category: string,
    public comments : Comment[]){

    }
}
