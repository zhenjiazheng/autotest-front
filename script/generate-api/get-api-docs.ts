import { writeFileSync } from 'fs';
import axios, { AxiosHeaders } from 'axios';

interface tagType {
    name: string;
    description: string;
}

interface swaggerResType {
    config: unknown;
    data: {
        paths: {
            [key: string]: {
                get: {
                    operationId: string;
                    parameters: [];
                    responses: unknown;
                    summary: string;
                    tags: string[];
                };
            };
        };
        tags: tagType[];
    };
    headers: AxiosHeaders;
    request: XMLHttpRequest;
    status: number;
}

async function writeAPI() {
    try {
        // 将需要用到的后端 swagger 接口地址放进来
        const apiList = ['http://192.168.3.201:8002/v3/api-docs?group=%E7%B3%BB%E7%BB%9F%E6%9C%8D%E5%8A%A1'];

        // 收集所有后端 swagger 返回的数据
        const res: any = await Promise.all(
            apiList.map(async items => {
                const response = await axios.get(items as string);
                if (!response) {
                    return [];
                }
                return response;
            }),
        );

        // 需要合并的路径对象
        let pathObj = {};
        // 需要合并的 tags 数组
        let tagsList: tagType[] = [];

        // 合并路径对象以及 tags 数组
        res.forEach((item: swaggerResType) => {
            pathObj = {
                ...pathObj,
                ...item.data.paths,
            };
            tagsList = [...tagsList, ...item.data.tags];
        });

        // 取第一个人的作为模板，将合并过的 paths 和 tags 替换了
        const conversionData = res.shift()?.data;
        conversionData.paths = pathObj;
        conversionData.tags = arrayDeduplicate(tagsList, 'name');

        const res2 = JSON.stringify(conversionData).replace(/\«|»|\s+/g, '_');

        const writeData = JSON.parse(res2);

        for (const key in writeData.paths) {
            const funName = key
                .split('/')
                .filter(item => item && item !== 'api' && item !== 'v1')
                .map((item, index) => {
                    if (index === 0) {
                        return item;
                    } else {
                        return `${item[0].toUpperCase()}${item.slice(1)}`;
                    }
                })
                .join('');

            const method = Object.keys(writeData.paths[key])[0];

            writeData.paths[key][method].operationId = `${funName}${method.toUpperCase()}`;
        }
        writeFileSync('./src/json/api.json', JSON.stringify(writeData));
    } catch (error) {
        console.log('出错了');
    }
}

writeAPI();

/**
 * 对象数组去重，根据key值
 * @param arr 需要去重的对象数组
 * @returns hashList 返回去重后的列表
 */
export function arrayDeduplicate(arr: any[], name: string) {
    const hash: any = {};
    let hashList = JSON.parse(JSON.stringify(arr));
    hashList = hashList.reduce((total: any, currentValue: any) => {
        if (!hash[currentValue[name]]) {
            hash[currentValue[name]] = true;
            total.push(currentValue);
        }
        return total;
    }, []);

    return hashList;
}
