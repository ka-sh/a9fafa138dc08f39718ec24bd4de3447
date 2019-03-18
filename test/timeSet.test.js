/* eslint-disable no-console */
let TimeSet = require('../lib/TimeSet');
let E = require('./utils/E');
describe("Testing TimeSet Data structure",()=>{
    
    it(`Should not add invalid elements`,()=>{
        let ts = new TimeSet();
        expect(()=>{ts.add({});}).toThrow(`Invalid Element`);
    });

    it('Should Add elements to timeset',()=>{
        let e = new E("A",Date.now());
        let ts = new TimeSet();
        ts.add(e);
        expect(ts.size()).toBe(1);
    });
    it('Should not Add duplicate elements',()=>{
        let ts = new TimeSet();
        let event = new E("A",Date.now());
        ts.add(event);
        ts.add(event);
        expect(ts.size()).toBe(1);
    });
    it(`Should Get list of actions using ts`,()=>{
        let ts=new TimeSet();
        let timeStamp = Date.now();
        let event1=new E("A",timeStamp);
        let event2 = new E("B",timeStamp);
        ts.add(event1);
        ts.add(event2);
        expect(ts.getByTs(timeStamp).length).toBe(2);
    });
    it(`Should remove from list`,()=>{
       let ts = new TimeSet();
       let e = new E("A",Date.now());
       ts.add(e);
       let tmpRemoved = ts.remove(e);
       expect(ts.size()).toBe(0);
       expect(e.equal(tmpRemoved)).toBeTruthy(); 
    })
    it(`Should get actions by action hash`,()=>{
        let ts=new TimeSet();
        let timeStamp = Date.now();
        let event = new E("B",timeStamp);
        ts.add(event);
        expect(ts.get(event.hash())).toBeDefined();
    });
})
