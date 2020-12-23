import storage from 'node-persist';
import program from 'commander';
import moment from 'moment';
import inquirer from 'inquirer';
import Table from 'cli-table';
import ProgressBar from 'progress';
import { getMatchUsers, unmatchUser } from './api';
import * as pkg from '../package.json';
import chalk from 'chalk';

program.version(pkg.version);
program.description(pkg.description);

// [command] matches
program
  .command('matches')
  .description('show all matches')
  .action(async () => {
    const result = await getMatchUsers();
    const count = result.matches.length;
    console.log(chalk.yellowBright(`Found ${count} matches.`));
  });

// [command] unread
program
  .command('unread')
  .description('show unread messages')
  .action(async () => {
    const result = await getMatchUsers();
    const unread = result.matches
      .filter((t) => !t.read && t.message)
      .map((t) => ({ name: t.displayName, message: t.message }))
      .sort((a, b) => b.message.createdAt - a.message.createdAt);
    const count = unread.length;
    console.log(chalk.yellowBright(`Found ${count} unread messages.`));
    if (!count) return;
    const table = new Table({
      colWidths: [30, 45, 18],
      colAligns: ['left', 'left', 'left']
    });
    table.push(['NAME', 'LATEST MESSAGE', 'TIME'].map((s) => chalk.cyanBright(s)));
    unread.forEach((t) => {
      table.push([t.name, t.message.text, moment(t.message.createdAt).toNow(true)]);
    });
    console.log(table.toString());
  });

// [command] unmatches
program
  .command('unmatches')
  .description('cancel inactive matches')
  .action(async () => {
    const { matches } = await getMatchUsers();
    const list = matches.filter((t) => +new Date() - t.createdAt > 43200000 && !t.message);
    const total = list.length;
    if (!total) {
      console.log(chalk.yellowBright(`No inactive matches.`));
      return;
    }
    const bar = new ProgressBar('[:bar] :percent', { total: total });
    const promises = list.map((t) =>
      unmatchUser(t.userId).then((data: any) => {
        if (data && data.ok) bar.tick();
        if (bar.complete) {
          console.log(chalk.yellowBright(`Successfully cancel ${total} inactive matches.`));
        }
      })
    );
    await Promise.all(promises);
  });

// parse args
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
