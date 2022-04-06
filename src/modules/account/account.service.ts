import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { TypeOrmCrudService } from '@nestjsx/crud-typeorm';
import { Repository } from 'typeorm';
import { Account } from './entities/account.entity';

@Injectable()
export class AccountService extends TypeOrmCrudService<Account> {
  constructor(
    @InjectRepository(Account) public repository: Repository<Account>,
  ) {
    super(repository);
  }
}
