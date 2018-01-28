import { ArgumentMetadata, BadRequestException, Pipe, PipeTransform } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';

@Pipe()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value, metadata: ArgumentMetadata) {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }
    const object = plainToClass(metatype, Object.assign({}, value));
    const errors = await validate(object, { skipMissingProperties: false });
    if (errors.length > 0) {
      throw new BadRequestException('Properties : ' + errors.map((error) => 
      `${error.property}`).join(' '));
    }
    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.find((type) => metatype === type);
  }
}
