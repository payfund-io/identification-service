export enum HealthStatus {
  OK = 'ok',
  UP = 'up',
  DOWN = 'down',
}

export interface SignUpUserDTO {
  email: string;
  password: string;
  username: string;
  phone_number: number;
}

export interface signInUserDTO {
  email: string;
  password: string;
}


export enum AccountStatus {
  NOT_VERIFIED = 'not_verified',
  VERIFIED = 'verified',
  PENDING = 'pending',
}
