import { GetServerSidePropsContext } from 'next/types';
import axios from 'axios';
import CookieManager from './cookieManager';

interface Me {
  displayName: string;
  email: string;
  profileImageUrl: string;
  profileBackgroundUrl: string;
  twitchUserId: number;
  userType: string;
  follow: Date | undefined;
  subscription: number | undefined;
}

export default class Identity {
  context: GetServerSidePropsContext | undefined;
  cookie: CookieManager;

  constructor(context?: GetServerSidePropsContext) {
    this.context = context;
    this.cookie = new CookieManager(context);
  }
  
  /**
   * 로그인 한 사용자의 정보를 가져옵니다.
   * @example
   * const identity = new Identity(context);
   * const me = await identity.get();
   */
  async get(): Promise<Me | null> {
    try {
      const identity = await axios.get('https://dev.naseong.kim/api/user/detail', {
        headers: {
          Cookie: `Authorization=${this.cookie.get('authorization') ?? ''}`,
        }
      });
      return identity.data;
    } catch(e) {
      return null;
    }
  }

  /**
   * 리프레시 토큰을 이용해 액세스 토큰을 재발급합니다.
   * @example
   * const identity = new Identity(context);
   * const result = await identity.refresh();
   */

  async refresh(): Promise<boolean> {
    try {
      const token = await axios.get('https://dev.naseong.kim/api/auth/refresh', {
        headers: {
          Cookie: `Refresh=${this.cookie.get('Refresh') ?? ''}`,
        }
      });

      this.cookie.set('authorization', token.data.access, 1000 * 60 * 30);
      this.cookie.set('refresh', token.data.refresh, 1000 * 60 * 60 * 24 * 7 * 2);

      return true;
    } catch {
      return false;
    }
  }
}
