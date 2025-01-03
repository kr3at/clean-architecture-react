export interface CreateUserDTO {
  email: string;
  username: string;
  password: string;
}

export interface UpdateUserDTO {
  username?: string;
  email?: string;
}

export interface UserResponseDTO {
  id: string;
  email: string;
  username: string;
  createdAt: Date;
  updatedAt: Date;
}
