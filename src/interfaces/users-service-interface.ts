export interface IUsersService {
    signup(username: string, email: string, password: string): any;
    getInventory(userId: any): any;
}