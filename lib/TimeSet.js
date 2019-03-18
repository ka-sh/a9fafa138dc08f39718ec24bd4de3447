
module.exports=class TimeSet{
    constructor(){
        this.tsLookup={};
        this.elementLookup={};
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

    remove(e){
        let tmp=this.elementLookup[e.hash()];
        if(this.def(tmp)){
            delete this.elementLookup[e.hash()];
            //remove from tsLookup
            let events =this.tsLookup[e.ts];
            if(events.length==1){
                delete this.tsLookup[e.ts]
            }else{
                for(let i=0;i<events.length;i+=1){
                    if(events[i].equal(e)){
                        events.splice(i,1);
                        break;
                    }
                }
            }
            return tmp;
        } else {
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
        return Object.values(this.elementLookup);
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
    isDuplicate(e){
        return typeof this.elementLookup[e.hash()]!=='undefined';
    }
    def(e){
        return typeof e!=='undefined'&&e!=null;
    }
}