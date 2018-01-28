import { Field, Model, Validate, enableDefaultDecorators } from "fusedb";

enableDefaultDecorators();

export class User extends Model<User> {

    @Field()
    public name: string;

    @Field() 
    @Validate({email: { message: "Is not a valid email"}})
    public email: string;

    @Field()
    public password: string;
}
