import storage from 'node-persist';
import program from 'commander';
import { getMatchUsers } from './api';
import * as pkg from '../package.json';

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
        displayName: t.displayName,
        message: t.message
      }));
    console.log(unread);
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
