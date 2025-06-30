// useJwt.ts
import { jwtDecode } from "jwt-decode";

export interface JwtPayload {
  sub: string;
  name?: string;
  email?: string;
  exp?: number;
  [key: string]: any;
}

export function decodeToken(token: string): JwtPayload | null {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (err) {
    console.error("Invalid token", err);
    return null;
  }
}
