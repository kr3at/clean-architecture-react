export namespace UserDTO {

  export interface Create {
    email: string;
    username: string;
    password: string;
  }

  export interface Update {
    username?: string;
    email?: string;
  }

  export interface UserResponse {
    id: string;
    email: string;
    username: string;
    createdAt: Date;
    updatedAt: Date;
  }
}
