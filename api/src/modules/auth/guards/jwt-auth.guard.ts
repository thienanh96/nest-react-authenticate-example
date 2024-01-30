import { AuthGuard } from '@nestjs/passport';
import {
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';

@Injectable()
export class AuthenticationGuard extends AuthGuard('jwt') {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    const userFromToken = request.headers?.authorization
      ? jwtDecode(request.headers.authorization)
      : null;

    if (!userFromToken) {
      throw new UnauthorizedException();
    }

    request['user'] = userFromToken;

    return true;
  }
}
