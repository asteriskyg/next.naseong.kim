import { NextApiRequest, NextApiResponse } from 'next'
import { setCookie } from 'cookies-next';
import axios from 'axios';

export default async function Handler(req: NextApiRequest, res: NextApiResponse) {
  const token = await axios.get(`https://dev.naseong.kim/api/auth/login?code=${req.query.code}`);

  setCookie('authorization', token.data.access, {
    req: req,
    res: res,
    domain: 'next.naseong.kim',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 30,
  });

  setCookie('refresh', token.data.refresh, {
    req: req,
    res: res,
    domain: 'next.naseong.kim',
    path: '/',
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    maxAge: 1000 * 60 * 60 * 24 * 7 * 2,
  });


  return res.redirect('/');
}