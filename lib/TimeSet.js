
module.exports=class TimeSet{
    constructor(){
        this.tsLookup={};
        this.elementLookup={};
    }
    clone(){
        let tmp=new TimeSet();
        tmp.tsLookup={...this.tsLookup};
        tmp.elementLookup={...this.elementLookup};
        return tmp;
    }
    add(e){
        this.validate(e);
        if(this.def(this.elementLookup[e.hash()])){
            this.elementLookup[e.hash()].push(e);
        }else{
            this.elementLookup[e.hash()]=[e];
        }

        if(this.def(this.tsLookup[e.ts])){
            this.tsLookup[e.ts].push(e);
        }else{
            this.tsLookup[e.ts]=[e];
        }
    }

    removeFromElementLookup(e){
        let elements = this.elementLookup[e.hash()];
        let found;
        for(let i=0;i<elements.length;i+=1){
            if(elements[i].ts===e.ts){
                found=elements[i];
                elements.splice(i,1);
                break;
            }
        }
        if(elements.length===0) delete this.elementLookup[e.hash()];

        return found;
    }
    removeFromTsLookup(e){
        let elements=this.tsLookup[e.ts];
        let removed;
        for(let i=0;i<elements.length;i+=1){
            if(e.equal(elements[i])){
                removed=elements[i];
                elements.splice(0,1);
                break;
            }
        }
        if(elements.length===0) delete this.tsLookup[e.ts];
        return removed;
    }

    remove(e){
        if(this.has(e)){
            let element = this.removeFromElementLookup(e);
            this.removeFromTsLookup(e);
            return element;
        }else{
            return undefined;
        }
    }

    get(id){
        return this.elementLookup[id];
    }
    
    size(){
        return Object.keys(this.elementLookup).length;
    }
    elements(){
        return [].concat.apply([],Object.values(this.elementLookup));
    }
    getByTs(ts){
        return this.tsLookup[ts];
    }

    validate(e){
        if(!(
            this.def(e)&&
            typeof e==='object'&&
            typeof e.hash ==="function"&&
            typeof e.equal ==="function"
        )){
            throw new Error('Invalid Element');
        }
    }
    has(e){
        return typeof this.elementLookup[e.hash()]!=='undefined';
    }
    def(e){
        return typeof e!=='undefined'&&e!=null;
    }
    addAll(arr){
        for(let e of arr){
            this.add(e);
        }
    }
}