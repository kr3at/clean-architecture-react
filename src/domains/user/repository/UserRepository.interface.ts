import { User } from "../entity/User.entity";

export interface UserRepository {
  // Métodos básicos CRUD
  create(user: User): Promise<void>;
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  update(user: User): Promise<void>;
  delete(id: string): Promise<void>;

  // Métodos específicos del dominio
  validateCredentials(email: string, password: string): Promise<User | null>;
}
