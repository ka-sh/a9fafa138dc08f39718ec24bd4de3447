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
                    e.ts<=tmpRemSet.get(e.hash()).ts){
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

    converge(remoteCRDT){
        throw new Error(`Not implemented`);
    }
}