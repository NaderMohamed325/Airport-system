import { Request } from 'express';

export interface GqlContext {
  req: Request & { user: { id: number; email: string; role: string } };
}
