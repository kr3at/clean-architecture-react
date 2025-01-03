export class User {
  constructor(
    public readonly id: string,
    public email: string,
    public username: string,
    private password: string,
    public readonly createdAt: Date,
    public updatedAt: Date
  ) {}

  updateUsername(newUsername: string): void {
    if (!this.isValidUsername(newUsername)) {
      throw new Error('Invalid username format');
    }
    this.username = newUsername;
    this.updatedAt = new Date();
  }

  private isValidUsername(username: string): boolean {
    return username.length >= 3 && username.length <= 30;
  }

  // Note que no exponemos directamente la contraseña
  validatePassword(password: string): boolean {
    return this.password === password; // En una implementación real, usaríamos bcrypt o similar
  }
}
