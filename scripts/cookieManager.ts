import { GetServerSidePropsContext } from 'next/types';
import { getCookie, setCookie } from 'cookies-next';
import { OptionsType } from 'cookies-next/lib/types';

export default class CookieManager {
  context: GetServerSidePropsContext | undefined;

  constructor(context: GetServerSidePropsContext | undefined) {
    this.context = context;
  }

  get(name: string) {
    return getCookie(name, this.context);
  }

  set(name: string, value: string, age: number) {
    const contextData = this.context ? {
      req: this.context.req,
      res: this.context.res,
    } : {};

    const options = {
      domain: 'next.naseong.kim',
      path: '/',
      httpOnly: true,
      secure: true,
      sameSite: 'strict',
      maxAge: age,
    } as OptionsType;

    return setCookie(name, value, Object.assign({}, contextData, options));
  }
}
