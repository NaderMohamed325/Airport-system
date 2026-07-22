import { ConflictException, Injectable } from '@nestjs/common';
import { PassengersService } from 'src/passengers/passengers.service';
import * as bcrypt from 'bcrypt';
import { CreatePassengerDto } from './dto/create.passenger.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly passengerService: PassengersService,
    private readonly jwtService: JwtService,
  ) {}

  async register(dto: CreatePassengerDto) {
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
    const payload = { email: passenger.email, sub: passenger.id, role: passenger.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
