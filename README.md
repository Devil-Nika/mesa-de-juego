Los directorios y los archivos del proyecto quedaron asi.
src/

├─ systems/                      # TODO lo específico de cada sistema
│  ├─ dnd5e/
│  │  ├─ data/
│  │  │  ├─ spells.json
│  │  │  ├─ species.json
│  │  │  ├─ monsters.json

│  │  │  ├─ items.json
│  │  │  └─ actions.json
│  │  ├─ index.ts  # Barrel: re-export de tipos/datos/helpers del sistema
│  │  └─ parse.ts            # (opcional) normalizadores/parsers de data 5e
│  ├─ pf2e/
│  │  └─ data/
│  ├─ sf2e/
│  │  └─ data/
│  └─ index.ts
│  └─ registry.ts   
│
├─ services/
│  ├─ ds.ts
│  ├─ seed.ts
│
├─ routes/
│  ├─ SystemGuard.tsx
│
├─ pages/
│  ├─ grimorio/
│  │  ├─ Actions.tsx
│  │  ├─ GrimorioHeader.tsx  
│  │  ├─ GrimorioLayout.tsx  
│  │  ├─ Items.tsx
│  │  ├─ Monsters.tsx
│  │  ├─ Species.tsx
│  │  ├─ Spells.tsx
│
├─ i18n/
│  ├─ en.json
│  ├─ es.json
│  ├─ index.ts
│
├─ hooks/
│  ├─ index.ts
│  ├─ useActions.ts
│  ├─ useItems.ts
│  ├─ useMonsters.ts   
│  ├─ useSpecies.ts
│  ├─ useSpells.ts  
│  
├─ domain/
│  ├─ dnd5e/
│  │  ├─ Actions.ts
│  │  ├─ Index.ts
│  │  ├─ Items.ts
│  │  ├─ Monsters.ts
│  │  ├─ Species.ts
│  │  ├─ Spells.ts   
│  ├─ types/
│  │  ├─ Index.ts   
│

├─ data/
│
├─ contexts/
│  └─ SystemContext.tsx          # system actual ("dnd5e")
│
├─ components/                  # UI agnóstico: AttackBlock, SaveBlock, etc.
│  └─ Layout.tsx
│  └─ SystemSwitcher.tsx  
|
├─ assets/
└─ App.tsx / main.tsx / ...



