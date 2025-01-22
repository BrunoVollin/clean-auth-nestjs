// src/domain/entities/user.entity.ts
export class User {
    constructor(
      public id: string | null,
      public email: string,
      public password: string,
    ) {}
  }
  