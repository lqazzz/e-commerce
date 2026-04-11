import { CanActivate, ExecutionContext, ForbiddenException, Injectable } from '@nestjs/common';
import { CustomerRole } from '../entities/customer.entity';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest<{ user?: { role?: CustomerRole } }>();

    if (request.user?.role !== 'admin') {
      throw new ForbiddenException('Admin access required');
    }

    return true;
  }
}
