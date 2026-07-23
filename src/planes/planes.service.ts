import { Injectable } from '@nestjs/common';
import { CreatePlaneInput } from './dto/create-plane.input';
import { UpdatePlaneInput } from './dto/update-plane.input';
import { InjectRepository } from '@nestjs/typeorm';
import { Plane } from 'src/planes/entities/plane.entity';
import { Staff } from 'src/staff/entities/staff.entity';
import { Repository } from 'typeorm';
import { PaginationInput } from 'src/utils/pagination.dto';
import { PlaneFilterInput } from './dto/gql/plane.filter.input';
import { PlaneSortInput } from './dto/gql/plane.sort.input';

@Injectable()
export class PlanesService {
  constructor(@InjectRepository(Plane) private readonly planeRepository: Repository<Plane>) {}

  async create(createPlaneInput: CreatePlaneInput, userId: number) {
    const plane = this.planeRepository.create(createPlaneInput);
    plane.createdBy = await this.planeRepository.manager.findOneByOrFail(Staff, { id: userId });
    return await this.planeRepository.save(plane);
  }

  async findAll(pagination: PaginationInput, filter?: PlaneFilterInput, sort?: PlaneSortInput) {
    const query = this.planeRepository.createQueryBuilder('plane');

    if (filter) {
      if (filter.model) {
        query.andWhere('plane.model LIKE :model', { model: `%${filter.model}%` });
      }
    }

    query.orderBy(`plane.${sort?.sortBy ?? 'createdAt'}`, sort?.order ?? 'ASC');

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

  async findOne(id: number) {
    return await this.planeRepository.findOneBy({ id });
  }

  async update(id: number, updatePlaneInput: UpdatePlaneInput) {
    await this.planeRepository.update(id, updatePlaneInput);
    return await this.planeRepository.findOneBy({ id });
  }

  async remove(id: number) {
    await this.planeRepository.delete(id);
    return { deleted: true };
  }
}
