import { nanoid } from "nanoid";

export function generateShareId(): string {
  return nanoid(10);
}

export function getShareUrl(shareId: string): string {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
  return `${baseUrl}/share/${shareId}`;
}
