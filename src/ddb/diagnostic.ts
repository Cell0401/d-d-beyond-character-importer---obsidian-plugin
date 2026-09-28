export interface CharacterDiagnostic {
  id: number | string;
  name: string;
  classes: string[];
  totalLevel: number;
  race: string;
}

export function toCharacterDiagnostic(raw: any): CharacterDiagnostic {
  const classes = Array.isArray(raw?.classes) ? raw.classes : [];
  return {
    id: raw?.id ?? "unknown",
    name: raw?.name ?? "Unknown character",
    classes: classes.map((entry: any) => entry?.definition?.name ?? "Unknown class"),
    totalLevel: classes.reduce((sum: number, entry: any) => sum + Number(entry?.level ?? 0), 0),
    race: raw?.race?.fullName ?? raw?.race?.baseRaceName ?? raw?.race?.baseName ?? "Unknown race",
  };
}
