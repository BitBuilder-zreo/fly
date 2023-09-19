import { MockMethod } from 'vite-plugin-mock';
import { resultError, resultSuccess, getRequestToken, requestParams } from '../_util';

export function createFakeUserList() {
  return [
    {
      userId: '1',
      username: 'vben',
      realName: 'Vben Admin',
      avatar: '',
      desc: 'manager',
      password: '123456',
      token: 'fakeToken1',
      homePath: '/dashboard/analysis',
      roles: [
        {
          roleName: 'Super Admin',
          value: 'super',
        },
      ],
    },
    {
      userId: '2',
      username: 'test',
      password: '123456',
      realName: 'test user',
      avatar: '',
      desc: 'tester',
      token: 'fakeToken2',
      homePath: '/dashboard/workbench',
      roles: [
        {
          roleName: 'Tester',
          value: 'test',
        },
      ],
    },
  ];
}

const fakeCodeList: any = {
  '1': ['1000', '3000', '5000'],

  '2': ['2000', '4000', '6000'],
};


function defineToken() {

  return [
    {
      account: 'vben',
      password: '123456',
      token: 'fakeToken1',
    },
    {
      account: 'test',
      password: '123456',
      token: 'fakeToken2',
    }
  ]
}

export default [
  // mock user login
  {
    url: '/basic-api/fly/auth/login',
    timeout: 200,
    method: 'post',
    response: ({ body }) => {
      const { account, password } = body;
      const checkToken = defineToken().find(
        (item) => item.account === account && password === item.password,
      );

      if (!checkToken) {
        return resultError('Incorrect account or password！');
      }
      const { token } = checkToken;

      return resultSuccess({
        token: token,
        refreshToken: token,
        expireTime: (new Date()).getTime() + 1000 * 60 * 60 * 24 * 7,
      });
    },
  },
  {
    url: '/basic-api/getUserInfo',
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('The corresponding user information was not obtained!');
      }
      return resultSuccess(checkUser);
    },
  },
  {
    url: '/basic-api/getPermCode',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      const codeList = fakeCodeList[checkUser.userId];

      return resultSuccess(codeList);
    },
  },
  {
    url: '/basic-api/logout',
    timeout: 200,
    method: 'get',
    response: (request: requestParams) => {
      const token = getRequestToken(request);
      if (!token) return resultError('Invalid token');
      const checkUser = createFakeUserList().find((item) => item.token === token);
      if (!checkUser) {
        return resultError('Invalid token!');
      }
      return resultSuccess(undefined, { message: 'Token has been destroyed' });
    },
  },
  {
    url: '/basic-api/testRetry',
    statusCode: 405,
    method: 'get',
    response: () => {
      return resultError('Error!');
    },
  },
] as MockMethod[];
