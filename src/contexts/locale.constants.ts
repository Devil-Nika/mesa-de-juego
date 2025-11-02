// src/contexts/locale.constants.ts
import type { LocaleId, LocaleDict } from "./locale.types";

// Idiomas disponibles (orden también define el “default” visual)
export const LOCALES: LocaleId[] = ["en", "es"] as const;

// Diccionarios
export const DICTS: Record<LocaleId, LocaleDict> = {
    en: {
        // ====== NAV / HEADER ======
        "nav.home": "Home",
        "nav.encounter": "Encounter",
        "nav.builder": "Builder",
        "nav.grimoire": "Grimoire",
        "nav.options": "Options",

        // ====== HOME ======
        "home.title": "Welcome",
        "home.subtitle": "Select a section from the top navigation",

        // ====== GRIMOIRE LAYOUT / MENU ======
        "grimoire.title": "Grimoire",
        "menu.grimoireHome": "Overview",
        "menu.class": "Class",
        "menu.origins": "Origins",
        "menu.feats": "Feats",
        "menu.equipment": "Equipment",
        "menu.spells": "Spells",
        "menu.monsters": "Monsters",
        "menu.toolbox": "Toolbox",
        "menu.rules": "Rules",
        "menu.options": "Options",

        // ====== HUB (overview del grimorio) ======
        "hub.title": "Browse the Grimoire",
        "hub.class.desc": "Classes with embedded subclasses selection.",
        "hub.origins.desc": "Backgrounds and Species together.",
        "hub.feats.desc": "All feats, grouped by category.",
        "hub.equipment.desc": "Coins, Weapons, Armors, Gear, Vehicles, Services, Magic items, Crafting.",
        "hub.spells.desc": "All spells by name, searchable.",
        "hub.monsters.desc": "Bestiary listing.",
        "hub.toolbox.desc": "Travel, Curses, Environment, Fear/Stress, Poisons, Traps.",
        "hub.rules.desc": "General rules and tags.",

        // ====== CLASSES (con subclases embebidas) ======
        "search.classes": "Search classes…",
        "classes.list": "Classes",
        "classes.details": "Details",
        "classes.pickOne": "Pick a class to see details and subclasses.",
        "classes.subclasses": "Subclasses",
        "subclasses.none": "No subclasses available.",
        "subclass.selected": "Selected Subclass",

        // ====== ORIGINS (backgrounds + species) ======
        "grimorio.origins": "Origins",
        "search.origins": "Search backgrounds or species…",
        "loading.origins": "Loading origins…",
        "error.origins": "Error loading origins.",

        // ====== FEATS ======
        "search.feats": "Search feats…",
        "loading.feats": "Loading feats…",
        "error.feats": "Error loading feats.",
        "empty.feats": "No feats found.",

        // ====== EQUIPMENT ======
        "grimorio.equipment": "Equipment",
        "equipment.coins": "Coins",
        "equipment.weapons": "Weapons",
        "equipment.armors": "Armors",
        "equipment.adventuringGear": "Adventuring Gear",
        "equipment.mountsVehicles": "Mounts & Vehicles",
        "equipment.services": "Services",
        "equipment.magicItems": "Magic Items",
        "equipment.crafting": "Crafting",

        "equipment.hint.coins": "Currency and conversions",
        "equipment.hint.weapons": "Simple/Martial, properties and mastery",
        "equipment.hint.armors": "Light/Medium/Heavy, shields",
        "equipment.hint.adventuringGear": "Tools, kits and miscellaneous",
        "equipment.hint.mountsVehicles": "Land/water/air movement",
        "equipment.hint.services": "Lodging, food, transportation",
        "equipment.hint.magicItems": "Attunement, cursed items",
        "equipment.hint.crafting": "Crafting rules and costs",

        // ====== TOOLBOX ======
        "grimorio.toolbox": "Toolbox",
        "toolbox.travelPlaces": "Travel & Places",
        "toolbox.cursesContagions": "Curses & Magical Contagions",
        "toolbox.environmentalEffects": "Environmental Effects",
        "toolbox.fearStress": "Fear & Mental Stress",
        "toolbox.poisons": "Poisons",
        "toolbox.traps": "Traps",

        "toolbox.hint.travelPlaces": "Journeys, landmarks and regions",
        "toolbox.hint.cursesContagions": "Curses, magical diseases",
        "toolbox.hint.environmentalEffects": "Weather, terrain and hazards",
        "toolbox.hint.fearStress": "Fear checks, madness",
        "toolbox.hint.poisons": "Poison types and effects",
        "toolbox.hint.traps": "Trap design and examples",

        // ====== LISTAS BÁSICAS POR TIPO ======
        "grimorio.classes": "Classes",
        "grimorio.feats": "Feats",
        "grimorio.spells": "Spells",
        "grimorio.monsters": "Monsters",
        // (alias en español usa "grimorio.*" — dejamos ambos por compat)
        "grimorio.rules": "Rules",

        // ====== SEARCH PLACEHOLDERS ======
        "search.actions": "Search actions…",
        "search.species": "Search species…",
        "search.spells": "Search spells…",
        "search.items": "Search items…",
        "search.monsters": "Search monsters…",
        "search.rules": "Search rules…",
        "search.magicItems": "Search magic items…",

        // ====== ESTADOS (loading / error / empty) ======
        "loading.actions": "Loading actions…",
        "error.actions": "Error loading actions.",
        "empty.actions": "No actions found.",

        "loading.species": "Loading species…",
        "error.species": "Error loading species.",
        "empty.species": "No species found.",

        "loading.spells": "Loading spells…",
        "error.spells": "Error loading spells.",
        "empty.spells": "No spells found.",

        "loading.monsters": "Loading monsters…",
        "error.monsters": "Error loading monsters.",
        "empty.monsters": "No monsters found.",

        "loading.items": "Loading items…",
        "error.items": "Error loading items.",
        "empty.items": "No items found.",

        "loading.magicItems": "Loading magic items…",
        "error.magicItems": "Error loading magic items.",
        "empty.magicItems": "No magic items found.",

        "loading.backgrounds": "Loading backgrounds…",
        "error.backgrounds": "Error loading backgrounds.",
        "empty.backgrounds": "No backgrounds found.",

        "loading.classes": "Loading classes…",
        "error.classes": "Error loading classes.",
        "empty.classes": "No classes found.",

        "loading.subclasses": "Loading subclasses…",
        "error.subclasses": "Error loading subclasses.",
        "empty.subclasses": "No subclasses found.",

        "loading.rules": "Loading rules…",
        "error.rules": "Error loading rules.",
        "empty.rules": "No rules found.",

        // ====== CAMPOS / LABELS COMUNES ======
        "spell.level": "Level",
        "common.source": "Source",
        "common.showDetails": "Show details",
        "common.hideDetails": "Hide details",
        "common.comingSoon": "This section is under development.",

        // ====== OPTIONS ======
        "options.title": "Options",
        "options.language": "Language",
        "options.system": "System",
        "options.theme": "Theme",
        "options.save": "Save",
    },

    es: {
        // ====== NAV / HEADER ======
        "nav.home": "Inicio",
        "nav.encounter": "Encuentro",
        "nav.builder": "Constructor",
        "nav.grimoire": "Grimorio",
        "nav.options": "Opciones",

        // ====== HOME ======
        "home.title": "Bienvenido",
        "home.subtitle": "Selecciona una sección desde la navegación superior",

        // ====== GRIMOIRE LAYOUT / MENU ======
        "grimoire.title": "Grimorio",
        "menu.grimoireHome": "Resumen",
        "menu.class": "Clases",
        "menu.origins": "Orígenes",
        "menu.feats": "Dotes",
        "menu.equipment": "Equipo",
        "menu.spells": "Conjuros",
        "menu.monsters": "Monstruos",
        "menu.toolbox": "Caja de herramientas",
        "menu.rules": "Reglas",
        "menu.options": "Opciones",

        // ====== HUB ======
        "hub.title": "Explorar el Grimorio",
        "hub.class.desc": "Clases con selección de subclase embebida.",
        "hub.origins.desc": "Trasfondos y Especies juntos.",
        "hub.feats.desc": "Todas las dotes, agrupadas por categoría.",
        "hub.equipment.desc": "Monedas, Armas, Armaduras, Equipo, Vehículos, Servicios, Objetos mágicos, Fabricación.",
        "hub.spells.desc": "Todos los conjuros por nombre, con búsqueda.",
        "hub.monsters.desc": "Listado del bestiario.",
        "hub.toolbox.desc": "Viajes, Maldiciones, Entorno, Miedo/Estrés, Venenos, Trampas.",
        "hub.rules.desc": "Reglas generales y etiquetas.",

        // ====== CLASES ======
        "search.classes": "Buscar clases…",
        "classes.list": "Clases",
        "classes.details": "Detalle",
        "classes.pickOne": "Selecciona una clase para ver detalles y subclases.",
        "classes.subclasses": "Subclases",
        "subclasses.none": "No hay subclases disponibles.",
        "subclass.selected": "Subclase seleccionada",

        // ====== ORÍGENES ======
        "grimorio.origins": "Orígenes",
        "search.origins": "Buscar trasfondos o especies…",
        "loading.origins": "Cargando orígenes…",
        "error.origins": "Error cargando orígenes.",

        // ====== DOTES ======
        "search.feats": "Buscar dotes…",
        "loading.feats": "Cargando dotes…",
        "error.feats": "Error cargando dotes.",
        "empty.feats": "No hay dotes.",

        // ====== EQUIPO ======
        "grimorio.equipment": "Equipo",
        "equipment.coins": "Monedas",
        "equipment.weapons": "Armas",
        "equipment.armors": "Armaduras",
        "equipment.adventuringGear": "Equipo de aventura",
        "equipment.mountsVehicles": "Monturas y Vehículos",
        "equipment.services": "Servicios",
        "equipment.magicItems": "Objetos mágicos",
        "equipment.crafting": "Fabricación",

        "equipment.hint.coins": "Monedas y conversiones",
        "equipment.hint.weapons": "Simple/Marcial, propiedades y maestría",
        "equipment.hint.armors": "Ligera/Media/Pesada, escudos",
        "equipment.hint.adventuringGear": "Herramientas, kits y varios",
        "equipment.hint.mountsVehicles": "Movimiento terrestre/acuático/aéreo",
        "equipment.hint.services": "Alojamiento, comida, transporte",
        "equipment.hint.magicItems": "Sintonización, objetos malditos",
        "equipment.hint.crafting": "Reglas y costes de fabricación",

        // ====== TOOLBOX ======
        "grimorio.toolbox": "Caja de herramientas",
        "toolbox.travelPlaces": "Viajes y Lugares",
        "toolbox.cursesContagions": "Maldiciones y Contagios mágicos",
        "toolbox.environmentalEffects": "Efectos ambientales",
        "toolbox.fearStress": "Miedo y Estrés mental",
        "toolbox.poisons": "Venenos",
        "toolbox.traps": "Trampas",

        "toolbox.hint.travelPlaces": "Viajes, regiones y lugares",
        "toolbox.hint.cursesContagions": "Maldiciones, enfermedades mágicas",
        "toolbox.hint.environmentalEffects": "Clima, terreno y peligros",
        "toolbox.hint.fearStress": "Chequeos de miedo, locura",
        "toolbox.hint.poisons": "Tipos de veneno y efectos",
        "toolbox.hint.traps": "Diseño y ejemplos de trampas",

        // ====== LISTAS BÁSICAS POR TIPO ======
        "grimorio.classes": "Clases",
        "grimorio.feats": "Dotes",
        "grimorio.spells": "Conjuros",
        "grimorio.monsters": "Monstruos",
        "grimorio.rules": "Reglas",

        // ====== SEARCH PLACEHOLDERS ======
        "search.actions": "Buscar acciones…",
        "search.species": "Buscar especies…",
        "search.spells": "Buscar conjuros…",
        "search.items": "Buscar objetos…",
        "search.monsters": "Buscar monstruos…",
        "search.rules": "Buscar reglas…",
        "search.magicItems": "Buscar objetos mágicos…",

        // ====== ESTADOS (loading / error / empty) ======
        "loading.actions": "Cargando acciones…",
        "error.actions": "Error cargando acciones.",
        "empty.actions": "No hay acciones.",

        "loading.species": "Cargando especies…",
        "error.species": "Error cargando especies.",
        "empty.species": "No hay especies.",

        "loading.spells": "Cargando conjuros…",
        "error.spells": "Error cargando conjuros.",
        "empty.spells": "No hay conjuros.",

        "loading.monsters": "Cargando monstruos…",
        "error.monsters": "Error cargando monstruos.",
        "empty.monsters": "No hay monstruos.",

        "loading.items": "Cargando objetos…",
        "error.items": "Error cargando objetos.",
        "empty.items": "No hay objetos.",

        "loading.magicItems": "Cargando objetos mágicos…",
        "error.magicItems": "Error cargando objetos mágicos.",
        "empty.magicItems": "No hay objetos mágicos.",

        "loading.backgrounds": "Cargando trasfondos…",
        "error.backgrounds": "Error cargando trasfondos.",
        "empty.backgrounds": "No hay trasfondos.",

        "loading.classes": "Cargando clases…",
        "error.classes": "Error cargando clases.",
        "empty.classes": "No hay clases.",

        "loading.subclasses": "Cargando subclases…",
        "error.subclasses": "Error cargando subclases.",
        "empty.subclasses": "No hay subclases.",

        "loading.rules": "Cargando reglas…",
        "error.rules": "Error cargando reglas.",
        "empty.rules": "No hay reglas.",

        // ====== CAMPOS / LABELS COMUNES ======
        "spell.level": "Nivel",
        "common.source": "Fuente",
        "common.showDetails": "Mostrar detalles",
        "common.hideDetails": "Ocultar detalles",
        "common.comingSoon": "Sección en desarrollo.",

        // ====== OPTIONS ======
        "options.title": "Opciones",
        "options.language": "Idioma",
        "options.system": "Sistema",
        "options.theme": "Tema",
        "options.save": "Guardar",
    },
};
