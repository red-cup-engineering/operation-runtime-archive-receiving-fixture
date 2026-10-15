import test from 'node:test';
import assert from 'node:assert/strict';
import { Readable, Writable } from 'node:stream';
import * as runtime from '@red-cup-engineering/javascript-node-operation-engineering-services-section/operation';
test('real archive exports exactly its four native functions', () => {
 assert.deepEqual(Object.keys(runtime).sort(), ['createJavascriptNodeOperation','runJavascriptNodeOperation','runJavascriptNodeOperationCatalog','runJavascriptNodeOperationModule'].sort());
 assert.ok(Object.values(runtime).every(value => typeof value === 'function'));
});
test('real archive admits Data types and continues NDJSON after a refusal', async () => {
 let output = '';
 const result = await runtime.runJavascriptNodeOperation({name:'double',description:'Double',inputSchema:{type:'number'},outputSchema:{type:'number'},operation:n=>n*2},{arguments:[],standardInput:Readable.from(['3\n"3"\n4']),standardOutput:new Writable({write(chunk,_,done){output+=chunk;done();}})});
 assert.deepEqual(result,{exitCode:2,processed:3,refused:1});
 const rows=output.trim().split('\n').map(JSON.parse);assert.equal(rows[0],6);assert.equal(rows[1].refusal.reason,'InvalidInput');assert.equal(rows[2],8);
});
