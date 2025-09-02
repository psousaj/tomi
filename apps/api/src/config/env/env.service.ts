import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { EnvType } from '@tomi/validation'

@Injectable()
export class EnvService {
    constructor(private configService: ConfigService<EnvType>) { }
    get<T extends keyof EnvType>(key: T) {
        return this.configService.get<EnvType[T]>(key, { infer: true });
    }
}
