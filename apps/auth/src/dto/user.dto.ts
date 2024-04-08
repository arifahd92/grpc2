import { IsInt, IsString, IsNotEmpty } from 'class-validator';
import { User } from '../proto/auth';
/**
 * When a class implements an interface in TypeScript, it must have at least the same
 *  properties as the interface, but it can have additional properties or methods beyond
 *  those defined in the interface.
 */
export class UserDto implements User {
  @IsInt()
  id: number;

  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  role: string;

  // Additional property not present in User interface
  extraField: string;
}
