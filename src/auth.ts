import open from 'open';
import express from 'express';

export interface AuthData {
  accessToken: string;
  refreshToken: string;
}

/**
 * Github login
 * @returns {Promise<AuthData>}
 */
export function authenticate(): Promise<AuthData> {
  return new Promise((resolve) => {
    const app = express();
    const server = app.listen(54321, () => {
      console.log('Waiting for Github authentication.');
    });
    app.get('/callback/:accessToken/:refreshToken', (req, res) => {
      const { accessToken, refreshToken } = req.params;
      res.send('Success!');
      req.destroy();
      server.close();
      resolve({ accessToken, refreshToken });
      console.log('Login successfully.');
    });
    open('https://api.vsinder.com/auth/github');
  });
}
