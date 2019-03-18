let CRDT = require('../lib/CRDT');
let IA = require('./utils/inputAction');

describe(`Testing CRDT data structure`,()=>{
    it(`Should record actions & produce union Set`,()=>{
        let crdt = new CRDT();
        let ia = new IA(0,"A",Date.now(),"kareem-PC");
        crdt.add(ia);
        expect(crdt.addSet.size()).toBe(1);
        crdt.remove(ia);
        expect(crdt.removeSet.size()).toBe(1);
    });
    
    it('E does not belong to union set if it exist in remove set [Identical actions with same time stamp]',async ()=>{
        let crdt = new CRDT();
        let ia = new IA(0,"A",Date.now(),"kareem-PC");
        await crdt.add(ia);
        await crdt.remove(ia);
        expect(crdt.unionSet.size()).toBe(0);
    });
    
    it(`E  does not belong to union set if it exists in remove set with Timestamp >= E.timestap`,async()=>{
        let crdt = new CRDT();
        let timeStamp = Date.now()
        let ia = new IA(0,"A",timeStamp,"kareem-PC");
        await crdt.add(ia);
        let ra = new IA(0,"A",timeStamp+10,"kareem-PC");
        await crdt.remove(ra);
        expect(crdt.unionSet.size()).toBe(0);
    });
    it(`Two Remove actions Union 1 Add action results in one remove Action`,async()=>{
        let crdt = new CRDT();
        let a1 = new IA(0,"A",Date.now(),"kareem-PC");
        await crdt.add(a1);
        let a2 = new IA(0,"A",Date.now()+10,"kareem-PC");
        await crdt.remove(a2);
        let a3 = new IA(0,"A",Date.now()+20,"kareem-PC");
        await crdt.remove(a3);
        expect(crdt.unionSet.size()).toBe(1);
    });
})