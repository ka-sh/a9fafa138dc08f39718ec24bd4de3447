const Element = require('./utils/E');
const CRDTSim = require('../lib/CRDTSim');

describe(`Testing CRDT simple version`,()=>{
    it('Add action/remove action successfully',async ()=>{
        let a1 = new Element('A',Date.now());
        let a2 = new Element('A',Date.now());
        let r1 = new Element('A',Date.now());
        let r2 = new Element('A',Date.now());
        let crdt = new CRDTSim();
        await crdt.add(a1);
        expect(crdt.addSet.size).toBe(1);
        expect(crdt.unionSet.size).toBe(1);
        crdt.add(a2);
        expect(crdt.unionSet.size).toBe(2)
        expect(crdt.addSet.size).toBe(2);
        await crdt.remove(r1);
        expect(crdt.removeSet.size).toBe(1);
        expect(crdt.unionSet.size).toBe(1);
        await crdt.remove(r2);
        expect(crdt.removeSet.size).toBe(2);
        expect(crdt.unionSet.size).toBe(0);
    });
    it('Add Action union two remove actions with ts>=Added Action result in R-Action',async ()=>{
        let a1 = new Element('A',Date.now());
        let r1 = new Element('A',Date.now());
        let r2 = new Element('A',Date.now());
        let crdt = new CRDTSim();
        await crdt.add(a1);
        await crdt.remove(r1);
        await crdt.remove(r2);
        expect(crdt.unionSet.size).toBe(1);
        let [relement] = crdt.unionSet;
        expect(relement.equal(r1)||relement.equal(r2)).toBeTruthy();
    });
})