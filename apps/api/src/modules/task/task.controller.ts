import { Controller, Get, Post, Body, Patch, Param, Delete, Query } from '@nestjs/common';
import { TaskService } from './task.service';
import type { CreateTaskDto } from './dto/create-task.dto';
import type { UpdateTaskDto } from './dto/update-task.dto';
import { ZodValidationPipe } from 'src/common/pipes/zod-validation.pipe';
import { taskSchema, updateTaskSchema } from '@tomi/validation'
import { ApiTags, ApiOperation, ApiResponse, ApiParam, ApiQuery } from '@nestjs/swagger';

@ApiTags('Task')
@Controller('task')
export class TaskController {
  constructor(private readonly taskService: TaskService) { }

  @Post()
  @ApiOperation({ summary: 'Create a new task' })
  @ApiResponse({ status: 201, description: 'A tarefa foi criada com sucesso.' })
  @ApiResponse({ status: 400, description: 'Bad Request.' })
  create(@Body(new ZodValidationPipe(taskSchema)) createTaskDto: CreateTaskDto) {
    return this.taskService.create(createTaskDto);
  }

  @Get()
  @ApiOperation({ summary: 'Find all tasks for a user' })
  @ApiQuery({ name: 'user', required: true, description: 'The ID of the user' })
  @ApiResponse({ status: 200, description: 'Return all tasks for a user.' })
  findAll(@Query('user') userId: string) {
    return this.taskService.findAllByUser(userId);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Find a task by ID' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task' })
  @ApiResponse({ status: 200, description: 'Return the task.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  findOne(@Param('id') id: string) {
    return this.taskService.findOne(+id);
  }

  @Patch(':id')
  @ApiOperation({ summary: 'Update a task' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully updated.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  update(@Param('id') id: string, @Body(new ZodValidationPipe(updateTaskSchema)) updateTaskDto: UpdateTaskDto) {
    return this.taskService.update(+id, updateTaskDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiParam({ name: 'id', required: true, description: 'The ID of the task' })
  @ApiResponse({ status: 200, description: 'The task has been successfully deleted.' })
  @ApiResponse({ status: 404, description: 'Task not found.' })
  remove(@Param('id') id: string) {
    return this.taskService.remove(+id);
  }
}
