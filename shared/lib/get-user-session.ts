import { getServerSession } from "next-auth";
import { authOptions } from "../constants/auth-options";

/**
 * Retrieves the user session from the server.
 *
 * @returns The user object from the session if available, otherwise null.
 */

export const getUserSession = async () => {
  const session = await getServerSession(authOptions);

  return session?.user ?? null;
};
