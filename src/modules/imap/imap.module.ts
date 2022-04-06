import { DynamicModule, Module } from '@nestjs/common';
import { Config } from 'imap';
import { Provider } from 'src/constance/provider';
import { ImapService } from './imap.service';

@Module({})
export class ImapModule {
  static forRoot(config: Partial<Config>): DynamicModule {
    return {
      module: ImapModule,
      providers: [
        { provide: Provider.IMAP_CONFIG, useValue: config },
        ImapService,
      ],
      exports: [ImapService],
      global: true,
    };
  }
}
