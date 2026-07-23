import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { CreatePassengerInput } from 'src/auth/gql/create-passenger.input';
import { LoginPassengerInput } from 'src/auth/gql/login-passenger.input';
import { CreateStaffInput } from 'src/staff/dto/create-staff.input';
import { AuthService } from 'src/auth/auth.service';
import { CreatePassengerResponseDto } from 'src/auth/dto/create-passenger-response.dto';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { CreateStaffResponseDto } from 'src/staff/dto/create-staff-response.dto';
import { LoginStaffResponseDto } from 'src/staff/dto/login-staff-response.dto';

@Resolver()
export class AuthResolver {
  constructor(private readonly authService: AuthService) {}

  @Mutation(() => CreatePassengerResponseDto)
  registerPassenger(@Args('createPassengerInput') createPassengerInput: CreatePassengerInput) {
    return this.authService.register(createPassengerInput);
  }

  @Mutation(() => LoginUserResponseDto)
  loginPassenger(@Args('loginPassengerInput') loginPassengerInput: LoginPassengerInput) {
    return this.authService.login(loginPassengerInput);
  }

  @Mutation(() => CreateStaffResponseDto)
  registerStaff(@Args('createStaffInput') createStaffInput: CreateStaffInput) {
    return this.authService.registerStaff(createStaffInput);
  }

  @Mutation(() => LoginStaffResponseDto)
  loginStaff(@Args('loginStaffInput') loginStaffInput: LoginPassengerInput) {
    return this.authService.loginStaff(loginStaffInput);
  }
}
