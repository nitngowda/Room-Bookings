import { Controller, Post, Body, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  private readonly logger = new Logger(AuthController.name);

  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    this.logger.debug(`Received login request: ${JSON.stringify(loginDto)}`);

    const result = await this.authService.login(loginDto.email, loginDto.password);

    this.logger.debug(`Login successful for email: ${loginDto.email}`);
    
    return {
      message: 'Login successful',
      token: result.token,  // Returning JWT token
      user: result.user,    // Returning user details (without password)
    };
  }
}
