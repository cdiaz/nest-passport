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
    @Validate({enum: UserRole})
    public role: UserRole;

    @Field()
    @Validate({enum: UserStatus})
    public status: UserStatus;
}
