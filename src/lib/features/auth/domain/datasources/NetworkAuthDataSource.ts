import { AuthToken } from "../service/AuthService";

abstract class NetworkAuthDataSource {
    abstract login(username: string, password: string): Promise<AuthToken>;
    abstract register(username: string, password: string): Promise<AuthToken>;
    abstract logout(): Promise<void>;
}

export default NetworkAuthDataSource;