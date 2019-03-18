/* eslint-disable no-console */
let TimeSet = require('../lib/TimeSet');
describe("Testing TimeSet Data structure",()=>{
    
    it(`Should not add invalid elements`,()=>{
        let ts = new TimeSet();
        expect(()=>{ts.add({});}).toThrow(`Invalid Element`);
    });

    it('Should Add elements to timeset',()=>{
        let ts = new TimeSet();
        ts.add({v:"A",ts:Date.now,hash:"123"});
        expect(ts.size()).toBe(1);
    });
    it('Should not Add duplicate elements',()=>{
        let ts = new TimeSet();
        let event = {v:"A",ts:Date.now(),hash:"123"};
        ts.add(event);
        ts.add(event);
        expect(ts.size()).toBe(1);
    });
    it(`Should Get list of actions using ts`,()=>{
        let ts=new TimeSet();
        let timeStamp = Date.now();
        let event1={v:"A",ts:timeStamp,hash:"123"};
        let event2 = {v:"B",ts:timeStamp,hash:"124"};
        ts.add(event1);
        ts.add(event2);
        expect(ts.getByTs(timeStamp).length).toBe(2);
    });
    it(`Should get actions by action hash`,()=>{
        let ts=new TimeSet();
        let timeStamp = Date.now();
        let event = {v:"B",ts:timeStamp,hash:"123"};
        ts.add(event);
        expect(ts.get(event.hash)).toBeDefined();
    });
})