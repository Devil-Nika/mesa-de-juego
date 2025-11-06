export type LocaleId = "en" | "es";

export type LocaleDict = {
    // 🔑 todas tus claves i18n (keys) -> string
    // p.ej. "grimoire.title": string; "menu.class": string; ...
    // (ya las tenés definidas en el proyecto)
    [K in
        | "grimoire.title"
        | "menu.grimoireHome"
        | "menu.class"
        | "menu.origins"
        | "menu.feats"
        | "menu.equipment"
        | "menu.spells"
        | "menu.monsters"
        | "menu.toolbox"
        | "menu.rules"
        | "menu.options"
        | "hub.title"
        | "hub.class.desc"
        | "hub.origins.desc"
        | "hub.feats.desc"
        | "hub.equipment.desc"
        | "hub.spells.desc"
        | "hub.monsters.desc"
        | "hub.toolbox.desc"
        | "hub.rules.desc"
        | "nav.home"
        | "nav.encounter"
        | "nav.builder"
        | "nav.grimoire"
        | "nav.options"
        | "home.title"
        | "home.subtitle"
    // ... añade aquí el resto de keys que ya usas …
    ]: string;
};
