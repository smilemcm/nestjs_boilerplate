import { Injectable } from '@nestjs/common';
import { Model, Types } from 'mongoose';
import { ConfigService } from '@nestjs/config';
import { DatabaseEntity } from 'src/database/database.decorator';
import { ILogger } from '../logger.interface';
import { ENUM_LOGGER_LEVEL } from '../logger.constant';
import { LoggerDocument, LoggerEntity } from '../schema/logger.schema';

@Injectable()
export class LoggerService {
    private readonly testMode: boolean;

    constructor(
        @DatabaseEntity(LoggerEntity.name)
        private readonly loggerModel: Model<LoggerDocument>,
        private readonly configService: ConfigService
    ) {
        this.testMode = this.configService.get<string>('app.env') === 'testing';
    }

    async info({
        action,
        description,
        user,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        if (this.testMode) {
            return;
        }

        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.INFO,
            user: new Types.ObjectId(user),
            anonymous: user ? false : true,
            action,
            description,
            tags,
        });
        return create.save();
    }

    async debug({
        action,
        description,
        user,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        if (this.testMode) {
            return;
        }

        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.DEBUG,
            user: new Types.ObjectId(user),
            anonymous: user ? false : true,
            action,
            description,
            tags,
        });
        return create.save();
    }

    async warning({
        action,
        description,
        user,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        if (this.testMode) {
            return;
        }

        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.WARM,
            user: new Types.ObjectId(user),
            anonymous: user ? false : true,
            action,
            description,
            tags,
        });
        return create.save();
    }

    async fatal({
        action,
        description,
        user,
        tags,
    }: ILogger): Promise<LoggerDocument> {
        if (this.testMode) {
            return;
        }

        const create = new this.loggerModel({
            level: ENUM_LOGGER_LEVEL.FATAL,
            user: new Types.ObjectId(user),
            anonymous: user ? false : true,
            action,
            description,
            tags,
        });
        return create.save();
    }
}
