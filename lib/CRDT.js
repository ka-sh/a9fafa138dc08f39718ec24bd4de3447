const TSet = require('./TimeSet');

module.exports=class CRDT{
    constructor(){
        this.addSet = new TSet();
        this.removeSet=new TSet();
        this.unionSet=new TSet();
    }
    add(element){
            this.addSet.add(element);
            return this.union();
    }
    remove(element){
            this.removeSet.add(element);
            return this.union();
    }
    union(){
        return new Promise((resolve,reject)=>{
            try{
            let elements = this.addSet.elements().concat(this.removeSet.elements());
            let tmpAddSet = this.addSet.clone();
            let tmpRemSet = this.removeSet.clone();
            
            for( let e of elements ){
                if(tmpAddSet.has(e)&&
                    tmpRemSet.has(e)&&
                    this.lte(e,tmpRemSet)){
                    tmpAddSet.remove(e);
                    tmpRemSet.remove(e);
                }
            }
            let toAdd = tmpAddSet.elements().concat(tmpRemSet.elements());
            this.unionSet=new TSet();
            this.unionSet.addAll(toAdd);
            resolve(this.unionSet);
            }catch(ex){
                reject(ex);
            }
        });
    }
    lte(e,set){
        let elements=set.get(e.hash());
        if(typeof elements!=='undefined'){
            for(let i=0;i<elements.length;i+=1){
                if(e.ts<=elements[i].ts){
                    return true;
                }
            }
        }
        return false;
    }
    converge(remoteCRDT){
        throw new Error(`Not implemented`);
    }
}