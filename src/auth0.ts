
import { createRemoteJWKSet, jwtVerify } from "jose";

const AUTH0_DOMAIN = "dev-qcfguwv7uyogdyng.us.auth0.com";
const AUTH0_ISSUER = `https://${AUTH0_DOMAIN}/`;
const AUTH0_AUDIENCE =
  "https://gsc-mcp-server-180590969315.europe-west3.run.app/mcp/";

const JWKS = createRemoteJWKSet(
  new URL(`${AUTH0_ISSUER}.well-known/jwks.json`)
);

export async function verifyAuth0Token(
  authorizationHeader: string | undefined
): Promise<boolean> {
  if (!authorizationHeader?.startsWith("Bearer ")) {
    return false;
  }

  const token = authorizationHeader.slice(7);

  try {
    const { payload } = await jwtVerify(token, JWKS, {
      issuer: AUTH0_ISSUER,
      audience: AUTH0_AUDIENCE,
      algorithms: ["RS256"],
    });

    const scopes =
      typeof payload.scope === "string"
        ? payload.scope.split(" ")
        : [];

    return scopes.includes("use:mcp");
  } catch (error) {
    console.error("Auth0 token verification failed:", error);
    return false;
  }
}
