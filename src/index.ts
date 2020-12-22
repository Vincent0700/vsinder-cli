import { getMatchUsers } from './api';

(async () => {
  const result = await getMatchUsers();
  console.log(result);
})();
