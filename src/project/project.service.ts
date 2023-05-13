import { InjectModel } from '@nestjs/mongoose';
import { Project } from './schemas/project.schema';
import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { Query } from 'express-serve-static-core';
import * as mongoose from 'mongoose';
@Injectable()
export class ProjectService {
    constructor(
        @InjectModel(Project.name)
        private projectModel: mongoose.Model<Project>,
      ) {}


      async findAll(query: Query): Promise<Project[]> {
        const resPerPage = 2;
        const currentPage = Number(query.page) || 1;
        const skip = resPerPage * (currentPage - 1);
    
        const keyword = query.keyword
          ? {
              title: {
                $regex: query.keyword,
                $options: 'i',
              },
            }
          : {};
    
        const projects = await this.projectModel
          .find({ ...keyword })
          .limit(resPerPage)
          .skip(skip);
        return projects;
      }

      async create(project: Project): Promise<Project> {
        const data = Object.assign(project);
    
        const res = await this.projectModel.create(data);
        return res;
      }

      async findById(id: string): Promise<Project> {
        const isValidId = mongoose.isValidObjectId(id);
    
        if (!isValidId) {
          throw new BadRequestException('Please enter correct id.');
        }
    
        const project = await this.projectModel.findById(id);
    
        if (!project) {
          throw new NotFoundException('Project not found.');
        }
    
        return project;
      }

      async updateById(id: string, project: Project): Promise<Project> {
        const existProject =  await this.projectModel.findByIdAndUpdate(id, project, {
          new: true,
          runValidators: true,
        });
        if (!existProject) {
            throw new NotFoundException(`Student #${id} not found`);
          }
          return existProject;
      }
    
      async deleteById(id: string): Promise<Project> {
        const project = await this.projectModel.findByIdAndDelete(id);
        if (!project) {
            throw new NotFoundException(`Student #${id} not found`);
          }
          return project;
      }
      
      

}