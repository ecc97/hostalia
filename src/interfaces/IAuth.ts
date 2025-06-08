export interface ILoginRequest {
    email: string;
    password: string;
}

export interface IRegisterRequest {    
    fullName: string;
    email: string;
    password: string;
    phone: string;
    confirmPassword: string;
}

export interface ILoginResponse {
    message: string;
    sessionId: string;
    userId: string;
    name: string;
    email: string;
}

export interface IRegisterResponse {
    message: string;
    userId: string;
    userDocumentId: string;
    fullName: string;
    email: string;
    phone: string;
}