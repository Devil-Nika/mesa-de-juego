export type Section = {
    id: string;      // clave interna / ruta
    i18nKey: string; // clave de traducción
    route: string;
};

export const GRIMORIO_SECTIONS: Section[] = [
    { id: "actions",      i18nKey: "grimorio.actions",      route: "actions" },
    { id: "backgrounds",  i18nKey: "grimorio.backgrounds",  route: "backgrounds" },
    { id: "classes",      i18nKey: "grimorio.classes",      route: "classes" },
    { id: "feats",        i18nKey: "grimorio.feats",        route: "feats" },
    { id: "items",        i18nKey: "grimorio.items",        route: "items" },
    { id: "magic-items",  i18nKey: "grimorio.magicItems",   route: "magic-items" },
    { id: "monsters",     i18nKey: "grimorio.monsters",     route: "monsters" },
    { id: "rules",        i18nKey: "grimorio.rules",        route: "rules" },
    { id: "species",      i18nKey: "grimorio.species",      route: "species" },
    { id: "spells",       i18nKey: "grimorio.spells",       route: "spells" },
    { id: "subclasses",   i18nKey: "grimorio.subclasses",   route: "subclasses" }
];
