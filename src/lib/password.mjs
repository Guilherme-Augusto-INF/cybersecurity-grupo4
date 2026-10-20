/** Deliberately limited educational heuristic, never a cracking-time estimate. */
export function inspectPassword(value) {
 const long=Array.from(value).length>=15;
 const predictable=/(senha|password|qwerty|1234|abcd|admin|fieb|integrante)/i.test(value)||/(.)\1{3}/u.test(value);
 const varied=new Set(Array.from(value.toLowerCase())).size>=9;
 const score=Number(long)+Number(!predictable&&value.length>0)+Number(varied);
 return {long,predictable,varied,score,label:!value?'Aguardando exemplo':predictable?'Padrão previsível':score===3?'Boas características':score===2?'Pode melhorar':'Muito curta ou previsível'};
}
