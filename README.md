# 🧙‍♂️ Mesa de Juego

**Mesa de Juego** es un sistema modular para gestionar material de rol (SRD) de diferentes juegos:  
conjuros, especies, objetos, monstruos y acciones — todo organizado por *sistema* (D&D 5e, Pathfinder 2e, Starfinder 2e, etc).

Actualmente incluye el SRD de **D&D 5e** y soporte estructural para **Paizo (PF2e / SF2e)**, **Daggerheart** y **Vampiro 5e**.

---

## 🚀 Requisitos

- Node.js 20+
- npm 9+
- Navegador con soporte IndexedDB (Chrome / Edge / Firefox / Safari)

---

## 📦 Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tuusuario/mesa-de-juego.git
cd mesa-de-juego

# Instalar dependencias
npm install

# Servidor de desarrollo
npm run dev

# Linter
npm run lint

# Compilación para producción
npm run build

src/
├─ assets/                     # Imágenes, íconos, estilos
├─ components/                 # Componentes UI (Layout, SystemSwitcher)
├─ contexts/                   # Estados globales (SystemContext)
├─ data/                       # Data local genérica
├─ domain/                     # Tipos y entidades de dominio
│  ├─ dnd5e/                   # Tipos específicos de D&D
│  ├─ types/                   # Tipos comunes
├─ hooks/                      # Hooks de datos (useItems, useSpells, ...)
├─ i18n/                       # Archivos de idioma
├─ pages/                      # Páginas
│  └─ grimorio/                # Módulo de Grimorio
│     ├─ GrimorioLayout.tsx    # Layout con menú lateral
│     ├─ Spells.tsx            # Conjuros
│     ├─ Species.tsx           # Especies
│     ├─ Items.tsx             # Objetos
│     ├─ Monsters.tsx          # Monstruos
│     ├─ Actions.tsx           # Acciones
├─ routes/                     # Guards y rutas anidadas
│  └─ SystemGuard.tsx
├─ services/                   # Infraestructura (db.ts, seed.ts)
├─ systems/                    # Datos por sistema (D&D, Paizo, etc)
│  ├─ dnd5e/data/              # JSONs SRD 5e
│  ├─ pf2e/data/               # Placeholder PF2e
│  ├─ sf2e/data/               # Placeholder SF2e
│  └─ registry.ts              # Registro y MRU de sistemas
└─ App.tsx / main.tsx          # Entradas de la app
