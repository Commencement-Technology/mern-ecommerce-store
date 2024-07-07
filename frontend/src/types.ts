export type FormValues = {
  username?: string;
  email: string;
  password: string;
};

export interface UserInfo {
  _id: string;
  username: string;
  email: string;
}

export interface IApiResponse {
  status: number;
  response?: {
    data?: {
      error?: string;
    };
  };
}
