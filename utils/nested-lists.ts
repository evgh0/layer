
type NestedList = any[];

export function erzeugeLage(zielLage: number): NestedList[] {
  // Lage 0 Zustand: []
  let aktuelleZustaende: NestedList[] = [[]];
  
  // Wenn Ziel 0 ist, gib nur das zurück
  if (zielLage === 0) return aktuelleZustaende;

  for (let i = 0; i < zielLage; i++) {
     const naechsteLagenMap = new Map<string, NestedList>();

     for (const zustand of aktuelleZustaende) {
        const varianten = generateVariants(zustand);
        for (const v of varianten) {
            const normalized = normalize(v);
            const key = JSON.stringify(normalized);
            if (!naechsteLagenMap.has(key)) {
                naechsteLagenMap.set(key, normalized);
            }
        }
     }
     aktuelleZustaende = Array.from(naechsteLagenMap.values());
  }
  return aktuelleZustaende;
}

function generateVariants(list: NestedList): NestedList[] {
    const variants: NestedList[] = [];
    
    // 1. Insert [] at every possible index in the current list
    for (let i = 0; i <= list.length; i++) {
        const clone = JSON.parse(JSON.stringify(list));
        clone.splice(i, 0, []);
        variants.push(clone);
    }

    // 2. Recursively traverse into nested lists
    for (let i = 0; i < list.length; i++) {
        const childVariants = generateVariants(list[i]);
        for (const childVar of childVariants) {
            const clone = JSON.parse(JSON.stringify(list));
            clone[i] = childVar;
            variants.push(clone);
        }
    }

    return variants;
}

export function normalize(list: NestedList): NestedList {
    if (!Array.isArray(list)) return list;
    
    // Recursively normalize children
    const normalizedChildren = list.map(child => normalize(child));
    
    // Sort children by their string representation
    normalizedChildren.sort((a, b) => JSON.stringify(a).localeCompare(JSON.stringify(b)));
    
    return normalizedChildren;
}
