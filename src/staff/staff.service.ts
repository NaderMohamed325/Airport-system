import { Injectable } from '@nestjs/common';
import { CreateStaffInput } from './dto/create-staff.input';
import { UpdateStaffInput } from './dto/update-staff.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Staff } from 'src/staff/entities/staff.entity';
import { PaginationInput } from 'src/utils/pagination.dto';
import { StaffFilterInput } from './dto/gql/staff.filter.input';
import { StaffSortInput } from './dto/gql/staff.sort.input';

@Injectable()
export class StaffService {
  constructor(@InjectRepository(Staff) private readonly staffRepository: Repository<Staff>) {}

  async create(createStaffInput: CreateStaffInput) {
    const staff = this.staffRepository.create(createStaffInput);
    return await this.staffRepository.save(staff);
  }

  async findOneByEmail(email: string): Promise<Staff | null> {
    return await this.staffRepository.findOne({ where: { email } });
  }

  async findOneByEmailWithPassword(email: string): Promise<Staff | null> {
    return await this.staffRepository.createQueryBuilder('staff').addSelect('staff.password').where('staff.email = :email', { email }).getOne();
  }

  async findAll(pagination: PaginationInput, filter?: StaffFilterInput, sort?: StaffSortInput) {
    const query = this.staffRepository.createQueryBuilder('staff');

    if (filter) {
      if (filter.name) {
        query.andWhere('staff.name LIKE :name', { name: `%${filter.name}%` });
      }
      if (filter.email) {
        query.andWhere('staff.email = :email', { email: filter.email });
      }
      if (filter.role) {
        query.andWhere('staff.role = :role', { role: filter.role });
      }
    }

    query.orderBy(`staff.${sort?.sortBy ?? 'name'}`, sort?.order ?? 'ASC');

    const [data, total] = await query
      .skip((pagination.page - 1) * pagination.limit)
      .take(pagination.limit)
      .getManyAndCount();

    return {
      data,
      total,
      page: pagination.page,
      totalPages: Math.ceil(total / pagination.limit),
    };
  }

  findOne(id: number): Promise<Staff | null> {
    return this.staffRepository.findOneBy({ id });
  }

  async update(id: number, updateStaffInput: UpdateStaffInput) {
    const { id: _, ...data } = updateStaffInput;
    await this.staffRepository.update(id, data);
    return this.findOne(id);
  }

  async remove(id: number) {
    return this.staffRepository.delete(id);
  }
}
