import { EdgeDto } from '.';

export class ServiceStatusDto<T = any> {
    status: boolean;
    data?: T | T[];
    edge?: EdgeDto;
    error?: any;
}
