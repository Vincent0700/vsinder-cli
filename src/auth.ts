import open from 'open';
import express from 'express';

function authenticate(): Promise<{}> {
  return new Promise((resolve) => {
    const app = express();
    const server = app.listen(54321, () => {
      console.log('[VSINDER] Waiting for Github authentication.');
    });
    app.get('/callback/:accessToken/:refreshToken', (req, res) => {
      const { accessToken, refreshToken } = req.params;
      res.send('Success!');
      req.destroy();
      server.close();
      resolve({ accessToken, refreshToken });
      console.log('[VSINDER] Login successfully.');
    });
    open('https://api.vsinder.com/auth/github');
  });
}

export default authenticate;
