import type { LocaleId, LocaleDict } from "./locale.types";

export const LOCALES: LocaleId[] = ["en", "es"];

export const DICTS: Record<LocaleId, LocaleDict> = {
    en: {
        "grimoire.title": "Grimoire",
        "menu.actions": "Actions",
        "menu.backgrounds": "Backgrounds",
        "menu.classes": "Classes",
        "menu.feats": "Feats",
        "menu.items": "Items",
        "menu.magicItems": "Magic Items",
        "menu.monsters": "Monsters",
        "menu.rules": "Rules",
        "menu.species": "Species",
        "menu.spells": "Spells",
        "menu.subclasses": "Subclasses",
        "menu.options": "Options",
        "options.title": "Options",
        "options.language": "Language",
        "options.language_hint": "Changes the UI language and sorting order.",
        "locales.en": "English",
        "locales.es": "Spanish"
    },
    es: {
        "grimoire.title": "Grimorio",
        "menu.actions": "Acciones",
        "menu.backgrounds": "Trasfondos",
        "menu.classes": "Clases",
        "menu.feats": "Dotes",
        "menu.items": "Objetos",
        "menu.magicItems": "Objetos mágicos",
        "menu.monsters": "Monstruos",
        "menu.rules": "Reglas",
        "menu.species": "Especies",
        "menu.spells": "Conjuros",
        "menu.subclasses": "Subclases",
        "menu.options": "Opciones",
        "options.title": "Opciones",
        "options.language": "Idioma",
        "options.language_hint": "Cambia el idioma de la interfaz y el orden alfabético.",
        "locales.en": "Inglés",
        "locales.es": "Español"
    }
};