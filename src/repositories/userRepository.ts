import { Prisma, User } from "@prisma/client";

export interface UserRepository {
  findByEmail(email: string): Promise<User | null>
  createUser({name, email, password}: Prisma.UserCreateInput): Promise<User>;
}