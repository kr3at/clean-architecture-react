import { injectable } from 'tsyringe';
import { Mapper } from '../../../shared/infrastructure/mappers/Mapper.interface';
import { User } from '../entity/User.entity';
import { UserDTO } from '../dto/User.dto';

@injectable()
export class UserMapper implements Mapper<User, UserDTO.UserResponse> {
  toDomain(raw: UserDTO.UserResponse): User {
    return new User(
      raw.id,
      raw.email,
      raw.username,
      '', // La contraseña no viene en el DTO de respuesta por seguridad
      new Date(raw.createdAt),
      new Date(raw.updatedAt)
    );
  }

  fromDomain(entity: User): UserDTO.UserResponse {
    return {
      id: entity.id,
      email: entity.email,
      username: entity.username,
      createdAt: entity.createdAt,
      updatedAt: entity.updatedAt
    };
    // Nota cómo explícitamente NO incluimos la contraseña en la respuesta
  }

  // Método adicional específico para la creación
  fromCreateDTO(dto: UserDTO.Create): User {
    return new User(
      crypto.randomUUID(), // Generamos un nuevo ID
      dto.email,
      dto.username,
      dto.password, // La contraseña solo se usa al crear el usuario
      new Date(),
      new Date()
    );
  }
}
