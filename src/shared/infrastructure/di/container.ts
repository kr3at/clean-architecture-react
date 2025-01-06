import "reflect-metadata";
import { container } from 'tsyringe';
import { ApiClient } from '../http/ApiClient';
import { EventBus } from '../events/EventBus';
import { PostMapper } from "../../../domains/post/repository/Post.mapper";
import { UserMapper } from "../../../domains/user/repository/User.mapper";
import { PostRepositoryImpl } from "../../../domains/post/repository/PostRepository.implementation";
import { CreatePostUseCase } from "../../../domains/post/useCases/CreatePostUseCase";
import { GetPostsByAuthorUseCase } from "../../../domains/post/useCases/GetPostsByAuthor.useCase";
import { UpdatePostFieldUseCase } from "../../../domains/post/useCases/UpdatePostField.useCase";
import { CreateUserUseCase } from "../../../domains/user/useCases/CreateUser.useCase";
import { GetRecentNotificationsUseCase } from "../../../domains/notification/useCases/GetRecentNotifications.useCase";

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
