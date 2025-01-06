import { inject, injectable } from 'tsyringe';
import { EventBus } from '../../../shared/infrastructure/events/EventBus';
import { User } from '../entity/User.entity';
import { UseCase } from '../../../shared/domain/UseCase.shared';
import { UserDTO } from '../dto/User.dto';

export interface CreateUserResult {
  user: User;
}

@injectable()
export class CreateUserUseCase implements UseCase<UserDTO.Create, CreateUserResult> {
  constructor(
    //@ts-ignore
    @inject('UserRepository') private userRepository: UserRepository,
    //@ts-ignore
    @inject(UserMapper) private userMapper: UserMapper,
    //@ts-ignore
    @inject(EventBus) private eventBus: EventBus
  ) {}

  async execute(params: UserDTO.Create): Promise<CreateUserResult> {
    // 1. Verificamos si ya existe un usuario con ese email
    const existingUser = await this.userRepository.findByEmail(params.email);
    if (existingUser) {
      throw new Error('Email already in use');
    }

    // 2. Creamos la entidad User usando nuestro mapper
    const user = this.userMapper.fromCreateDTO(params);

    // 3. Guardamos el usuario en el repositorio
    await this.userRepository.create(user);

    // 4. Emitimos un evento de usuario creado
    this.eventBus.emit('user.created', {
      userId: user.id,
      email: user.email,
      timestamp: new Date()
    });

    // 5. Retornamos el resultado
    return { user };
  }
}
