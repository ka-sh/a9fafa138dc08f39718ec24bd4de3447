
module.exports=class TimeSet{
    constructor(){
        this.tsLookup={};
        this.elementLookup={};
        this.elements=[];
    }
    add(e){
        this.validate(e);
        if(!this.isDuplicate(e)){
            this.elementLookup[e.hash()]=e;
            if(this.def(this.tsLookup[e.ts])){
                this.tsLookup[e.ts].push(e);
            }else{
                this.tsLookup[e.ts]=[e];
            }
        }
    }
    remove(){
        return undefined;
    }
    get(){
        return undefined;
    }
    size(){
        return Object.keys(this.elementLookup).length;
    }
    getByTs(){
        return undefined;
    }
    validate(e){
        if(!(
            typeof e !=='undefined'&&
            e!==null&&
            typeof e==='object'&&
            typeof e.hash ==="function"&&
            typeof e.equal ==="function"
        )){
            throw new Error('Invalid Element');
        }
    }
    isDuplicate(e){
        return typeof this.elementLookup[e.hash()]!=='undefined';
    }
    def(e){
        return typeof e!=='undefined'&&e!=null;
    }
}