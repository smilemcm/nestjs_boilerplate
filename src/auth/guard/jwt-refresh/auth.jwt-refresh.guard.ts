import { AuthGuard } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ENUM_AUTH_STATUS_CODE_ERROR } from 'src/auth/auth.constant';
import { DebuggerService } from 'src/debugger/service/debugger.service';

@Injectable()
export class JwtRefreshGuard extends AuthGuard('jwtRefresh') {
    constructor(private readonly debuggerService: DebuggerService) {
        super();
    }

    handleRequest<TUser = any>(
        err: Record<string, any>,
        user: TUser,
        info: string
    ): TUser {
        if (err || !user) {
            this.debuggerService.error(
                info,
                'JwtRefreshGuard',
                'handleRequest',
                err
            );

            throw new UnauthorizedException({
                statusCode:
                    ENUM_AUTH_STATUS_CODE_ERROR.AUTH_GUARD_JWT_REFRESH_TOKEN_ERROR,
                message: 'http.clientError.unauthorized',
            });
        }

        return user;
    }
}
