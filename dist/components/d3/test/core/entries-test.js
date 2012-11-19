require("../env");var vows=require("vows"),assert=require("assert"),suite=vows.describe("d3.entries");suite.addBatch({entries:{topic:function(){return d3.entries},"enumerates every entry":function(e){assert.deepEqual(e({a:1,b:2}),[{key:"a",value:1},{key:"b",value:2}])},"includes entries defined on prototypes":function(e){function t(){this.a=1,this.b=2}t.prototype.c=3,assert.deepEqual(e(new t),[{key:"a",value:1},{key:"b",value:2},{key:"c",value:3}])},"includes null or undefined values":function(e){var t=e({a:undefined,b:null,c:NaN});assert.equal(t.length,3),assert.deepEqual(t[0],{key:"a",value:undefined}),assert.deepEqual(t[1],{key:"b",value:null}),assert.equal(t[2].key,"c"),assert.isNaN(t[2].value)}}}),suite.export(module)