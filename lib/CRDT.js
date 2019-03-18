const TSet = require('./TimeSet');

module.exports=class CRDT{
    constructor(){
        this.addSet = new TSet();
        this.removeSet=new TSet();
    }
    registerAdd(action){
        throw new Error(`Not implemented`);
    }
    registerRemove(action){
        throw new Error(`Not implemented`);
    }
    union(){
        throw new Error(`Not implemented`);
    }
    converge(remoteCRDT){
        throw new Error(`Not implemented`);
    }
}