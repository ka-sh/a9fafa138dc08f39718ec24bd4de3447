/**
 * Test Element
*/
module.exports=class E{
    constructor(v,ts){
        this.v=v;
        this.ts=ts;
    }
    
    hash(){
        return JSON.stringify({v:this.v,ts:this.ts});
    }
    equal(e){
        return this.v===e.v&&this.ts===e.ts;
    }
}