// Primitivas y unions específicas de D&D 5e (SRD 5.2.1)

export type AbilityAbbr = "Str" | "Dex" | "Con" | "Int" | "Wis" | "Cha";

export type Skill =
    | "Acrobatics" | "Animal Handling" | "Arcana" | "Athletics"
    | "Deception" | "History" | "Insight" | "Intimidation"
    | "Investigation" | "Medicine" | "Nature" | "Perception"
    | "Performance" | "Persuasion" | "Religion" | "Sleight of Hand"
    | "Stealth" | "Survival";

export type Size = "Tiny" | "Small" | "Medium" | "Large" | "Huge" | "Gargantuan";

export type CreatureType =
    | "Aberration" | "Beast" | "Celestial" | "Construct" | "Dragon"
    | "Elemental" | "Fey" | "Fiend" | "Giant" | "Humanoid"
    | "Monstrosity" | "Ooze" | "Plant" | "Undead";

export type Alignment =
    | "LG" | "NG" | "CG"
    | "LN" | "N"  | "CN"
    | "LE" | "NE" | "CE"
    | "Unaligned";

export type Condition =
    | "Blinded" | "Charmed" | "Deafened" | "Exhaustion" | "Frightened"
    | "Grappled" | "Incapacitated" | "Invisible" | "Paralyzed"
    | "Petrified" | "Poisoned" | "Prone" | "Restrained"
    | "Stunned" | "Unconscious";

export type DamageType =
    | "Acid" | "Bludgeoning" | "Cold" | "Fire" | "Force" | "Lightning"
    | "Necrotic" | "Piercing" | "Poison" | "Psychic" | "Radiant"
    | "Slashing" | "Thunder";

export type SpeedType = "walk" | "burrow" | "climb" | "fly" | "swim";

export type Currency = "CP" | "SP" | "EP" | "GP" | "PP";

export type WeaponCategory = "Simple" | "Martial";
export type WeaponRangeKind = "Melee" | "Ranged";
export type WeaponProperty =
    | "Ammunition" | "Finesse" | "Heavy" | "Light" | "Loading"
    | "Range" | "Reach" | "Thrown" | "Two-Handed" | "Versatile";

export type MasteryProperty =
    | "Cleave" | "Graze" | "Nick" | "Push" | "Sap" | "Slow" | "Topple" | "Vex";

export type SpellSchool =
    | "Abjuration" | "Conjuration" | "Divination" | "Enchantment"
    | "Evocation" | "Illusion" | "Necromancy" | "Transmutation";

export type ActionTag = "Action" | "Bonus Action" | "Reaction";
export type RuleTag = ActionTag | "Area of Effect" | "Attitude" | "Condition" | "Hazard";

export interface Cost {
    amount: number;
    unit: Currency;
}

export interface RangeNumeric {
    normal: number;      // pies
    long?: number;       // pies (si aplica)
}

export interface TraitBlock {
    name: string;
    text: string;
}

/** Dónde se equipa el ítem (abrimos a custom con string & {}) */
export type EquipmentSlot =
    | "head" | "chest" | "hands" | "legs" | "feet"
    | "back" | "neck" | "ring" | "waist" | "wrist"
    | "weapon-hand" | "off-hand" | "two-hands"
    | (string & {}); // custom tags futuros (ej. "tail", "mount-slot")

/** Cómo se empuña/usa a nivel de manos */
export type Handedness = "one-hand" | "two-hands" | "versatile";

/** Sintonización (attunement) flexible para mágicos */
export interface Attunement {
    required: boolean;
    by?: string[];       // clases/roles/afinidades en texto libre ("Wizard", "Good")
    note?: string;       // texto libre p/expandir
}
