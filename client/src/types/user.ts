export interface IUser{
    _id: string
    username: string
    password: string
    organization: {
        name: string,
        resources: {name: string, amount: number}[],
        budget: number
    }
}