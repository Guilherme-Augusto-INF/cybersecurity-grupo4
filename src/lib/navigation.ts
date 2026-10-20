/** Each key targets a defined narrative stop, including the closing statements. */
export function navigationTarget(key:string,current:number,count:number):number|null {
 if(count<=0)return null;
 const last=count-1;
 if(/^[1-6]$/.test(key))return Math.min((Number(key)-1)*2,last);
 if(key==='Home')return 0;
 if(key==='End')return last;
 if(['ArrowRight','ArrowDown','PageDown'].includes(key))return Math.min(current+1,last);
 if(['ArrowLeft','ArrowUp','PageUp'].includes(key))return Math.max(current-1,0);
 return null;
}
