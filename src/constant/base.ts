/**
 * 连接错误信息提示
 */
export enum HTTP_ERROR_NOTICE {
    /** 连接超时 */
    TIME_OUT = '连接超时',

    /** 未知错误 */
    UNKNOWN = '未知错误',

    /** 404 */
    NOT_FOUND = '访问地址不存在',

    /** 服务端错误 */
    SERVER_ERROR = '服务器错误',

    /** 网络连接错误 */
    NETWORK_ERROR = '网络错误，请检测本地或访问地址是否正常。',

    /** 登录过期 */
    EXPIRE = '登录过期，即将跳转至登录页',
}

/**
 * 操作提示
 */
export enum OPERATION_NOTICE {
    /** 暂无数据 */
    NO_DATA = '暂无数据',

    /** 勾选 */
    SELECT_NONE = '未选中数据',
    SELECT_A_LEAST_ONE = '至少勾选一条数据！',
    SELECT_A_MOST_ONE = '请勾选且至多勾选一条数据！',

    /** 新增 */
    CREATE_SUCCESS = '新增成功',
    CREATE_ERROR = '新增失败',

    /** 编辑 */
    EDIT_SUCCESS = '编辑成功',
    EDIT_ERROR = '编辑失败',

    /** 导入 */
    IMPORT_FILE_TYPE_ERROR = '导入文件类型错误',
    IMPORT_SUCCESS = '导入成功',
    IMPORT_ERROR = '导入失败',

    /** 导出 */
    EXPORT_SUCCESS = '导出成功',
    EXPORT_ERROR = '导出失败',

    /** 上传 */
    UPLOAD_SUCCESS = '上传成功',
    UPLOAD_ERROR = '上传失败',

    /** 下载 */
    DOWNLOAD_SUCCESS = '下载成功',
    DOWNLOAD_ERROR = '下载失败',

    /** 操作 */
    OPERATE_SUCCESS = '操作成功',
    OPERATE_ERROR = '操作失败',

    /** 删除 */
    DELETE_CONFIRM = '是否确认删除？',
    DELETE_SUCCESS = '删除成功',
    DELETE_ERROR = '删除失败',

    /** 重置 */
    RESET_CONFIRM = '是否确认重置？',
    RESET_SUCCESS = '重置成功',
    RESET_ERROR = '重置失败',

    /** 退出 */
    LOGOUT_CONFIRM = '是否确认退出？',
    LOGOUT_SUCCESS = '退出成功',
    LOGOUT_ERROR = '退出失败',
}

export const ToolOptions: any = [
    {
        label: '硬件监控',
        value: 1,
    },
    {
        label: 'IEC104',
        value: 2,
    },
    {
        label: 'B协议',
        value: 3,
    },
    {
        label: '其他',
        value: 0,
    },
    // 1: "硬件监控任务",
    // 2: "IEC104任务",
    // 3: "B协议任务",
    // default: '其他'
];

export const ReqMethodsOption: any = [
    {
        label: 'POST',
        value: 1,
    },
    {
        label: 'GET',
        value: 2,
    },
    {
        label: 'PUT',
        value: 3,
    },
    {
        label: 'DELETE',
        value: 4,
    },
    {
        label: 'PATCH',
        value: 5,
    },
];
