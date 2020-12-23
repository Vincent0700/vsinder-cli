import storage from 'node-persist';
import program from 'commander';
import moment from 'moment';
import Table from 'cli-table';
import { getMatchUsers } from './api';
import * as pkg from '../package.json';
import chalk from 'chalk';

program.version(pkg.version);
program.description(pkg.description);

program
  .command('unread')
  .description('show unread messages')
  .action(async () => {
    const result = await getMatchUsers();
    const unread = result.matches
      .filter((t) => !t.read)
      .map((t) => ({
        name: t.displayName,
        message: t.message,
        time: t.createdAt
      }))
      .sort((a, b) => {
        const t1 = a.message ? a.message.createdAt : a.time;
        const t2 = b.message ? b.message.createdAt : b.time;
        return t2 - t1;
      });
    const table = new Table({
      colWidths: [32, 50, 20],
      colAligns: ['left', 'left', 'left']
    });
    table.push(['NAME', 'MESSAGE', 'TIME'].map((s) => chalk.cyanBright(s)));
    unread.forEach((t) => {
      if (!t.message) {
        table.push([t.name, '[new match]', moment(t.time).toNow(true)]);
      } else {
        table.push([t.name, t.message.text, moment(t.message.createAt).toNow(true)]);
      }
    });
    console.log(table.toString());
  });
(async (): Promise<void> => {
  await storage.init({
    dir: './cache',
    parse: JSON.parse,
    encoding: 'utf8',
    logging: false,
    expiredInterval: 86400000,
    forgiveParseErrors: true
  });

  program.parse(process.argv);
})();
