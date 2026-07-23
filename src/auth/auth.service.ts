import { ConflictException, Injectable } from '@nestjs/common';
import { PassengersService } from 'src/passengers/passengers.service';
import { StaffService } from 'src/staff/staff.service';
import * as bcrypt from 'bcrypt';
import { CreatePassengerInput } from 'src/common/dto/create-passenger.input';
import { CreateStaffInput } from 'src/staff/dto/create-staff.input';
import { JwtService } from '@nestjs/jwt';
import { LoginUserResponseDto } from 'src/auth/dto/login-user-response.dto';
import { LoginStaffResponseDto } from 'src/staff/dto/login-staff-response.dto';
import { Role } from 'src/users/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengersService,
    private readonly staffService: StaffService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreatePassengerInput) {
    const existingPassenger = await this.passengerService.findOneByEmail(dto.email);
    if (existingPassenger) {
      throw new ConflictException('Passenger with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const passenger = await this.passengerService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      nationality: dto.nationality,
      passportNumber: dto.passportNumber,
    });
    const { password, ...result } = passenger;
    return result;
  }

  async validateUser(email: string, password: string) {
    const passenger = await this.passengerService.findOneByEmailWithPassword(email);
    if (passenger && (await bcrypt.compare(password, passenger.password))) {
      const { password: _, ...result } = passenger;
      return result;
    }
    return null;
  }

  async login(loginDto: { email: string; password: string }) {
    const passenger = await this.passengerService.findOneByEmailWithPassword(loginDto.email);
    if (!passenger) {
      throw new ConflictException('Passenger with this email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, passenger.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }
    const { password: _, ...result } = passenger;

    const payload = { email: passenger.email, sub: passenger.id, role: passenger.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...result,
      accessToken,
    } as LoginUserResponseDto;
  }

  async registerStaff(dto: CreateStaffInput) {
    const existingStaff = await this.staffService.findOneByEmail(dto.email);
    if (existingStaff) {
      throw new ConflictException('Staff with this email already exists');
    }
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const staff = await this.staffService.create({
      name: dto.name,
      email: dto.email,
      password: hashedPassword,
      role: dto.role,
    });
    const { password, ...result } = staff;
    return result;
  }

  async loginStaff(loginDto: { email: string; password: string }) {
    const staff = await this.staffService.findOneByEmailWithPassword(loginDto.email);
    if (!staff) {
      throw new ConflictException('Staff with this email does not exist');
    }
    const isPasswordValid = await bcrypt.compare(loginDto.password, staff.password);
    if (!isPasswordValid) {
      throw new ConflictException('Invalid password');
    }
    const { password: _, ...result } = staff;

    const payload = { email: staff.email, sub: staff.id, role: staff.role };
    const accessToken = this.jwtService.sign(payload);

    return {
      ...result,
      accessToken,
    } as LoginStaffResponseDto;
  }

  async allowRole(userId: number, role: Role) {
    switch (role) {
      case Role.admin:
      case Role.crew:
      case Role.security:
        const staff = await this.staffService.findOne(userId);
        if (!staff) {
          throw new ConflictException('Staff with this ID does not exist');
        }
        staff.role = role;
        return await this.staffService.update(userId, staff);
      case Role.passenger:
        const passenger = await this.passengerService.findOne(userId);
        if (!passenger) {
          throw new ConflictException('Passenger with this ID does not exist');
        }
        passenger.role = role;
        return await this.passengerService.update(userId, passenger);

      default:
        throw new ConflictException('Invalid role');
    }
  }
}
