import { LoginDto } from './dto/login.dto';
import { SignUpDto } from './dto/signup.dto';
import { AuthService } from './auth.service';
import { Body, Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    signUp(@Body() SignUpDto: SignUpDto): Promise<{ token: string }>{
        return this.authService.signUp(SignUpDto);
    }

    @Post('/login')
    login(@Body() loginDto: LoginDto): Promise<{ token: string }> {
      return this.authService.login(loginDto);
    }
}
