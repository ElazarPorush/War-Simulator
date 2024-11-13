export interface IOrganization {
    name: string,
    resources: {name: string, amount: number}[],
    budget: number
}