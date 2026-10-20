import {test} from 'node:test';
import assert from 'node:assert/strict';
import {navigationTarget} from '../src/lib/navigation';
test('keyboard navigation uses precise narrative stops and clamps at boundaries',()=>{
 for(const key of ['ArrowRight','ArrowDown','PageDown']){assert.equal(navigationTarget(key,3,14),4);assert.equal(navigationTarget(key,13,14),13);}
 for(const key of ['ArrowLeft','ArrowUp','PageUp']){assert.equal(navigationTarget(key,3,14),2);assert.equal(navigationTarget(key,0,14),0);}
 for(let i=1;i<=6;i++)assert.equal(navigationTarget(String(i),0,14),(i-1)*2);
 assert.equal(navigationTarget('Home',8,14),0);assert.equal(navigationTarget('End',0,14),13);assert.equal(navigationTarget('End',0,13),12);assert.equal(navigationTarget('Tab',0,14),null);assert.equal(navigationTarget('PageDown',0,0),null);
});
