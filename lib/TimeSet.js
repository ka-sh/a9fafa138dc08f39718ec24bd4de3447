
module.exports=class TimeSet{
    constructor(){
        this.tsLookup={};
        this.elementLookup={};
        this.elements=[];
    }
    add(e){
        this.validate(e);
        return undefined;
    }
    remove(){
        return undefined;
    }
    get(){
        return undefined;
    }
    size(){
        return -1;
    }
    getByTs(){
        return undefined;
    }
    validate(e){
        if(!(
            typeof e !=='undefined'&&
            e!==null&&
            typeof e==='object'&&
            e.hasOwnProperty("hash")&&
            e.hasOwnProperty("equal")&&
            typeof e.equal ==="function"
        )){
            throw new Error('Invalid Element');
        }
    }
}