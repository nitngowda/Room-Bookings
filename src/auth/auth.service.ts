import * as bcrypt from 'bcrypt';
import { Injectable, UnauthorizedException, Logger, Inject, forwardRef } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);

    constructor(
        @Inject(forwardRef(() => UsersService)) 
        private readonly usersService: UsersService,
        private readonly jwtService: JwtService
    ) {}

    async validateUser(email: string, password: string): Promise<any> {
        this.logger.debug(`Validating user with email: ${email}`);

        const user = await this.usersService.findOneByEmail(email); 

        if (!user) {
            this.logger.warn(`User not found with email: ${email}`);
            throw new UnauthorizedException('Invalid email or password');
        }

        this.logger.debug(`User found: ${JSON.stringify(user.get({ plain: true }))}`);

        if (!password || !user.password) {
            this.logger.error(`Password is missing for user: ${email}`);
            throw new UnauthorizedException('Invalid email or password');
        }

        const passwordValid = await bcrypt.compare(password, user.password);
        if (!passwordValid) {
            this.logger.warn(`Invalid password for user: ${email}`);
            throw new UnauthorizedException('Invalid email or password');
        }

        this.logger.debug(`Password validated successfully for user: ${email}`);

        const { password: _, ...result } = user.get({ plain: true });
        return result;
    }

    async login(email: string, password: string) {
        this.logger.debug(`Login attempt for email: ${email}`);

        const user = await this.validateUser(email, password);
        this.logger.debug(`Login successful for user: ${email}`);

        const payload = { sub: user.id, email: user.email, role: user.role };
        const token = this.jwtService.sign(payload);

        return {
            message: 'Login successful',
            token,
            user,
        };
    }
}
