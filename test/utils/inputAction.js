module.exports=class inputAction{
    constructor(cursorLocation,ch,ts,source){
     this.cl=cursorLocation;
     this.ch=ch;
     this.ts=ts;
     this.source=source;   
    }
    hash(){
        return `${this.ch},${this.cl},${this.source}`
    }
    equal(e){
        return this.hash()===e.hash();
    }
}