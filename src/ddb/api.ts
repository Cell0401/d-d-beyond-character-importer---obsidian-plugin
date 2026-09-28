import { requestUrl } from "obsidian";

export interface DdbApiResponse<T = unknown> {
  data?: T;
  [key: string]: unknown;
}

export function extractCharacterId(input: string): string | null {
  const value = input.trim();
  const direct = value.match(/^\d+$/);
  if (direct) return direct[0];

  const fromUrl = value.match(/dndbeyond\.com\/characters\/(\d+)/i);
  return fromUrl?.[1] ?? null;
}

export async function fetchDdbCharacter<T = unknown>(idOrUrl: string): Promise<DdbApiResponse<T>> {
  const id = extractCharacterId(idOrUrl);
  if (!id) throw new Error("Invalid D&D Beyond character ID or URL.");

  const response = await requestUrl({
    url: `https://character-service.dndbeyond.com/character/v5/character/${id}`,
    headers: { Accept: "application/json" },
  });

  const body = response.json as DdbApiResponse<T>;
  if (!body?.data) {
    throw new Error("D&D Beyond returned an unexpected character response.");
  }
  return body;
}
