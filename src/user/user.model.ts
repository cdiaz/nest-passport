import { Field, Model, Validate, enableDefaultDecorators } from "fusedb";
import { UserRole, UserStatus} from './enum'

enableDefaultDecorators();

export class User extends Model<User> {

    @Field()
    public name: string;

    @Field() 
    @Validate({email: { message: "Is not a valid email"}})
    public email: string;

    @Field()
    public password: string;

    @Field()
    public role: UserRole;

    @Field()
    public status: UserStatus;
}
