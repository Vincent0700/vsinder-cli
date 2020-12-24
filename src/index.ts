import storage from 'node-persist';
import program from 'commander';
import moment from 'moment';
import inquirer from 'inquirer';
import Table from 'cli-table';
import ProgressBar from 'progress';
import { getMe, getMatches, getFeed, unmatch, match } from './api';
import { MatchItem } from './entities';
import * as pkg from '../package.json';
import chalk from 'chalk';

program.version(pkg.version);
program.description(pkg.description);

// [command] me
program
  .command('me')
  .description('show my profile')
  .action(async () => {
    const me = await getMe();
    const table = new Table({
      colWidths: [16, 64],
      colAligns: ['left', 'left']
    });
    const age = Math.floor((Date.now() - new Date(me.birthday).getTime()) / 31536000000);
    table.push([chalk.cyanBright('NAME'), me.displayName]);
    table.push([chalk.cyanBright('AGE'), age]);
    table.push([chalk.cyanBright('BIO'), me.bio]);
    table.push([chalk.cyanBright('FLAIR'), me.flair]);
    table.push([chalk.cyanBright('GOAL'), me.goal]);
    table.push([chalk.cyanBright('LIKES'), me.numLikes + ' likes']);
    console.log(table.toString());
  });

// [command] matches
program
  .command('matches')
  .description('show all matches')
  .action(async () => {
    const result = await getMatches();
    const count = result.length;
    console.log(chalk.yellowBright(`Found ${count} matches.`));
  });

// [command] unread
program
  .command('unread')
  .description('show unread messages')
  .action(async () => {
    const result = await getMatches();
    const unread = result
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

// [command] swiping
program
  .command('swiping')
  .description('start swiping')
  .action(async () => {
    let alwaysLike = false;
    while (true) {
      console.log(chalk.yellowBright('Searching ...'));
      const list = await getFeed();
      for (const p of list) {
        console.clear();
        console.log(
          chalk.magentaBright(p.displayName),
          chalk.cyanBright(p.age),
          chalk.white((p.flair ? '#' : '') + p.flair)
        );
        console.log(chalk.yellowBright(p.bio));
        console.log();

        let isLike = false;
        if (!alwaysLike) {
          const result = await inquirer.prompt({
            type: 'list',
            name: 'isLike',
            message: 'Like or not?',
            choices: [
              { name: chalk.redBright('LIKE'), value: 1 },
              { name: chalk.greenBright('DISLIKE'), value: 0 },
              { name: 'ALWAYS LIKE', value: 2 }
            ]
          });
          if (result.isLike === 0) isLike = false;
          else if (result.isLike === 1) isLike = true;
          else if (result.isLike === 2) alwaysLike = true;
        }
        const result = await match(p.id, alwaysLike || isLike);
        if (result.ok) {
          console.log(chalk.green('Success!' + (result.match ? ' Matched!' : '')));
          await new Promise((resolve) => {
            setTimeout(() => resolve(null), 1000);
          });
        }
      }
    }
  });

// [command] unmatches
program
  .command('unmatches')
  .description('cancel inactive matches')
  .action(async () => {
    const matches = await getMatches();
    const list = matches.filter((t: MatchItem) => {
      const lastTime = t.message ? t.message.createdAt : t.createdAt;
      return +new Date() - lastTime > 5 * 86400000;
    });
    const total = list.length;
    if (!total) {
      console.log(chalk.yellowBright(`No inactive matches.`));
      return;
    }
    const bar = new ProgressBar('[:bar] :percent', { total: total });
    const promises = list.map((t) =>
      unmatch(t.userId).then((data: any) => {
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
