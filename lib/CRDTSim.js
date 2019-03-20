module.exports=class CRDTSim{
    constructor(){
        this.addSet =new Set();
        this.removeSet=new Set();
        this.unionSet=new Set();
    }
    add(e){
        this.addSet.add(e);
        return this.union();
    }
    remove(e){
        this.removeSet.add(e);
        return this.union();
    }
    union(){
        return new Promise((resolve,reject)=>{
            try{
                let tmpA = new Set(this.addSet);
                let tmpR = new Set(this.removeSet);
                for(let aElement of tmpA){
                    for(let rElement of tmpR){
                        if(aElement.equal(rElement)&&aElement.ts<=rElement.ts){
                            tmpA.delete(aElement);
                            tmpR.delete(rElement);
                            break;
                        }
                    }
                }
                this.unionSet= new Set([...tmpA,...tmpR]);
                return resolve(this.unionSet);
            }catch(ex){
                reject(ex);
            }
        });
    }
    validate(e){
        if(!(
            this.def(e)&&
            typeof e==='object'&&
            typeof e.ts!=='undefined'&&
            typeof e.equal ==="function"
        )){
            throw new Error('Invalid Element');
        }
    }
}