export default class CreateUserDto{
    readonly id: number;
    readonly username: string;
    readonly password: string;
    readonly firstName: string;
    readonly lastName: string;
    readonly addedReviews: string;
    readonly addedTrails: string; 
}