import "reflect-metadata";
import { container } from 'tsyringe';
import { ApiClient } from '../http/ApiClient';
import { EventBus } from '../events/EventBus';

// Repositories
import { PostRepositoryImpl } from '../../../domains/post/repository/implementation/PostRepositoryImpl';

// Mappers
import { PostMapper } from '../../../domains/post/repository/PostMapper';
import { UserMapper } from '../../../domains/user/repository/UserMapper';

// Use Cases - Post Domain
import { GetPostsByAuthorUseCase } from '../../../domains/post/useCases/GetPostsByAuthorUseCase';
import { UpdatePostFieldUseCase } from '../../../domains/post/useCases/UpdatePostFieldUseCase';

// Use Cases - User Domain
import { CreateUserUseCase } from '../../../domains/user/useCases/CreateUserUseCase';
import { CreatePostUseCase } from '../../../domains/user/useCases/CreatePostUseCase';
import { GetRecentNotificationsUseCase } from "../../../domains/notification/useCases/GetRecentNotificationsUseCase";

// Configuración del ApiClient
const apiClient = new ApiClient({
  baseURL: 'http://localhost:3000/'
});

// Registro de infraestructura core
container.registerInstance(ApiClient, apiClient);
container.registerSingleton(EventBus);

// Registro de Mappers
container.registerSingleton(PostMapper);
container.registerSingleton(UserMapper);

// Registro de Repositories
container.register('PostRepository', PostRepositoryImpl);
// container.register('UserRepository', UserRepositoryImpl);

// Registro de Use Cases - Post Domain
container.registerSingleton(CreatePostUseCase);
container.registerSingleton(GetPostsByAuthorUseCase);
container.registerSingleton(UpdatePostFieldUseCase);

// Registro de Use Cases - User Domain
container.registerSingleton(CreateUserUseCase);


container.registerSingleton(GetRecentNotificationsUseCase);
export { container };
