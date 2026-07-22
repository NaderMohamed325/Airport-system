import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from './constants';

export class JwtStrategy extends PassportStrategy(Strategy) {
  validate(args: any): Promise<false | unknown | null> | false | unknown | null {
    return undefined;
  }

}
