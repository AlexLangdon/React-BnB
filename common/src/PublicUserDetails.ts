import { User } from "User";

export type PublicUserDetails = Pick<User, "username" | "email">;