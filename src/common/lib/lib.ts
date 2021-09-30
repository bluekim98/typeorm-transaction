import * as R from 'ramda';

export function makeWhere(
    dto: any,
    alias: string,
    index?: number,
    param?: string[],
): { where: string; param: string[]; index: number } {
    let where = '';

    if (!param) {
        param = [];
    }

    if (!index) {
        index = 0;
    }

    for (const [key, value] of Object.entries(dto)) {
        if (!R.isEmpty(value)) {
            if (where != '') where += ' AND ';

            if (key === 'AND' || key === 'OR') {
                where += '(';
                const child: any = value;
                // let childParam: any = [];
                child.forEach((val: any, i: number) => {
                    if (i > 0) {
                        where += ` ${key} `;
                    }

                    const tempResult = makeWhere(val, alias, index, param);
                    where += ` ${tempResult.where} `;
                    index = tempResult.index;
                    // childParam = R.merge(childParam, tempResult.param);
                });
                // param = R.merge(param, childParam);
                where += ')';
            } else {
                const result = makeWhereQuery(
                    key.includes('.') ? key : alias ? `${alias}.${key}` : key,
                    value,
                    param,
                    index,
                );
                index = result.index;
                where += result.query;
            }
        }
    }
    return { where, param, index };
}

function makeWhereQuery(
    keyValue: string,
    value: any | any[],
    param: string[],
    index: number,
) {
    let query: string;
    const key = `${keyValue}_${index}`;
    const column = keyValue.split('__')[0];
    const option = keyValue.split('__')[1];

    switch (option) {
        case 'not': {
            param[key] = value;
            query = `${column} <> :${key}`;
            break;
        }
        case 'in':
            param[key] = value;
            query = `${column} in (:...${key})`;
            break;
        case 'not_in':
            param[key] = value;
            query = `${column} not in (:...${key})`;
            break;
        case 'lt':
            param[key] = value;
            query = `${column} < :${key}`;
            break;
        case 'lte':
            param[key] = value;
            query = `${column} <= :${key}`;
            break;
        case 'gt':
            param[key] = value;
            query = `${column} > :${key}`;
            break;
        case 'gte':
            param[key] = value;
            query = `${column} >= :${key}`;
            break;
        case 'contains':
            param[key] = `%${value.toLowerCase()}%`;
            query = `${column} LIKE :${key}`;
            break;
        case 'not_contains':
            param[key] = `%${value.toLowerCase()}%`;
            query = `${column} not LIKE :${key}`;
            break;
        case 'starts_with':
            param[key] = `${value.toLowerCase()}%`;
            query = `${column} LIKE :${key}`;
            break;
        case 'not_starts_with':
            param[key] = `${value.toLowerCase()}%`;
            query = `${column} not LIKE :${key}`;
            break;
        case 'ends_with':
            param[key] = `%${value.toLowerCase()}`;
            query = `${column} LIKE :${key}`;
            break;
        case 'not_ends_with':
            param[key] = `%${value.toLowerCase()}`;
            query = `${column} not LIKE :${key}`;
            break;
        case 'json_contains':
            param[key] = value;
            query = `${column}::jsonb @> :${key}`;
            break;
        case 'json_filter':
            // not suppoet mysql
            break;
        case 'exist':
            // not suppoet mysql
            break;
        case 'between':
            param[`${key}_1`] = value[0];
            param[`${key}_2`] = value[1];
            query = `${column} between :${key}_1 and :${key}_2`;
            break;
        case 'search': {
            // not suppoet mysql
            break;
        }
        case 'not_include': {
            // not suppoet mysql
            break;
        }
        default: {
            if (typeof value === 'string' && value.split(':')[1] === 'name') {
                const filter = value.split(':')[1];
                query = `${column} = ${value.split(':')[0]}`;
                break;
            }

            param[key] = value;

            if (Array.isArray(value)) {
                query = `${column} IN (:...${key})`;
            } else {
                query = `${column} = :${key}`;
            }
        }
    }

    ++index;

    return { query, index };
}
