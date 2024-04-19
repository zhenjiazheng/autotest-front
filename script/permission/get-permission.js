const axios = require('axios');
const fs = require('fs');

/**
 * 获取并写入配置
 */
async function getPermissionListAndWrite() {
    // 获取
    const res = await axios.get('http://192.168.3.30:8061/api/v1/user/permission/list?permissionType=1&roleId=1');

    // 权限
    const allPermissions = res.data.data.systemPermissions;

    // 转换
    const transformData = Object.fromEntries(createEntries(allPermissions));

    fs.writeFileSync('./src/json/permission.json', JSON.stringify(transformData));
}

/**
 * 根据权限创建 key-value[]
 */
function createEntries(list) {
    const res = [];
    console.log(list, 'list');

    for (let index = 0; index < list.length; index++) {
        const item = list[index];
        let keyValue;
        const children = item.children;

        if (children) {
            keyValue = [item.label, Object.fromEntries(createEntries(children))];
        } else {
            keyValue = [item.label, item.id];
        }

        res.push(keyValue);
    }

    return res;
}

getPermissionListAndWrite();
