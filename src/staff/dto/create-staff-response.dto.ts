import { Staff } from 'src/staff/entities/staff.entity';
import { ObjectType, OmitType } from '@nestjs/graphql';

@ObjectType()
export class CreateStaffResponseDto extends OmitType(Staff, ['password'] as const) {}
