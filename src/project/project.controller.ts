import { Project } from './schemas/project.schema';
import { ProjectService } from './project.service';
import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Put,
    Query,
    Req,
    UnauthorizedException,
    UseGuards,
  } from '@nestjs/common';
  import { CreateProjectDto } from './dto/create-project.dto';
  import { UpdateProjectDto } from './dto/update-project.dto';
  
  import { Query as ExpressQuery } from 'express-serve-static-core';
  import { AuthGuard } from '@nestjs/passport';
  
  @Controller('projects')
  export class ProjectController {
    constructor(private projectService: ProjectService) {}
  
    @Get()
    async getAllProjects(@Query() query: ExpressQuery): Promise<Project[]> {
      return this.projectService.findAll(query);
    }
    @Post()
    async createProject(
      @Body()
      project: CreateProjectDto,
      @Req() req,
    ): Promise<Project> {
      try {
        console.log(req.user);
        
        // Create the project using the user information
        return this.projectService.create(project);
      } catch (error) {
        // Handle error when authentication fails
        console.error(error);
        throw new UnauthorizedException();
      }
    }
  
    @Get(':id')
    async getProject(
      @Param('id')
      id: string,
    ): Promise<Project> {
      return this.projectService.findById(id);
    }
  
    @Put(':id')
    async updateProject(
      @Param('id')
      id: string,
      @Body()
      project: UpdateProjectDto,
    ): Promise<Project> {
      return this.projectService.updateById(id, project);
    }
  
    @Delete(':id')
    async deleteProject(
      @Param('id')
      id: string,
    ): Promise<Project> {
      return this.projectService.deleteById(id);
    }
  }