/// <reference types="chai" />
/// <reference types="passport-strategy" />

import type { Strategy } from 'passport-strategy';
import type { createRequest, createResponse } from 'node-mocks-http';

declare namespace ChaiPassportStrategy {
  interface Test {
    request: (
      cb: (
        req: ReturnType<typeof createRequest>,
        res?: ReturnType<typeof createResponse>,
        ready?: () => void,
      ) => void,
    ) => Test;

    success: (cb: Strategy['success']) => Test;
    fail: (cb: Strategy['fail']) => Test;
    error: (cb: Strategy['error']) => Test;
    pass: (cb: Strategy['pass']) => Test;
    redirect: (cb: Strategy['redirect']) => Test;

    authenticate: (options?: unknown) => Test;
    finish: (cb: unknown) => Test;
  }

  interface Plugin extends Chai.ChaiPlugin {
    use: (strategy: Strategy) => Test;
  }
}


declare global {
  namespace Chai {
    interface ChaiStatic {
      passport: ChaiPassportStrategy.Plugin;
    }
  }
}

declare const chaiPassportStrategy: ChaiPassportStrategy.Plugin;
declare module 'chai-passport-strategy' {
  export = chaiPassportStrategy;
}