import { google } from "googleapis";
import { Credentials } from "google-auth-library";

export const oauth2Client = new google.auth.OAuth2(
  process.env.GOOGLE_CLIENT_ID2!,
  process.env.GOOGLE_CLIENT_SECRET2!,
  process.env.GOOGLE_REDIRECT_URI!
);

// Generate consent screen URL
export function getAuthUrl() {
  return oauth2Client.generateAuthUrl({
    access_type: "offline", // request refresh token
    scope: ["https://www.googleapis.com/auth/drive.file"],
    prompt: "consent",
  });
}

// Exchange code for tokens
export async function getTokens(code: string): Promise<Credentials> {
  const { tokens } = await oauth2Client.getToken(code);
  return tokens;
}
