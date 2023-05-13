import { IsOptional,IsString } from 'class-validator';
  export class UpdateProjectDto {
    @IsOptional()
    @IsString()
    readonly name: string;
  
    @IsOptional()
    @IsString()
    readonly description: string;
  
  }