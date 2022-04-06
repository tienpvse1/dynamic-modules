import { Inject, Injectable } from '@nestjs/common';
import { connect } from 'imap-simple';
import { Config } from 'imap';
import { Provider } from 'src/constance/provider';
import { find } from 'lodash';
import { simpleParser } from 'mailparser';
import { getRepository } from 'typeorm';
import { Webhook } from '../webhook/entities/webhook.entity';
import axios from 'axios';
@Injectable()
export class ImapService {
  constructor(@Inject(Provider.IMAP_CONFIG) private config: Config) {}

  async getEmail(user: string, password: string) {
    const connection = await connect({
      imap: {
        ...this.config,
        user,
        password,
      },
    });
    await connection.openBox('INBOX');

    const messages = await connection.search(
      ['UNSEEN', ['SINCE', new Date()]],
      {
        bodies: '',
        markSeen: true,
      },
    );
    messages.forEach((item) => {
      const all = find(item.parts, { which: '' });
      const id = item.attributes.uid;
      const idHeader = 'Imap-Id: ' + id + '\r\n';
      simpleParser(idHeader + all.body, async (err, mail) => {
        // access to the whole mail object
        const webhookRepository = getRepository(Webhook);
        const webhooks = await webhookRepository.find();
        if (webhooks.length > 0) await axios.post(webhooks[0].url, mail);
      });
    });
    connection.end();
  }
}
