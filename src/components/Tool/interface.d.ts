import type { Column } from 'element-plus';
import type { XFormItemSchema } from '@/components/form/interface';

export interface FormModelItem {
    // isEditing: boolean;
    // isNew: boolean;
    data: Record<string | number | symbol, any>;
    formData: Record<string | number | symbol, any>;
}

export interface FormModel {
    model: FormModelItem[];
}

export interface ToolActions {
    runRow: (row: Record<string, string>) => void;
    deleteRow: (index: number) => void;
    // startEdit: (index: number) => void;
    // cancelEdit: (index: number) => void;
    // saveEdit: (index: number) => void;
}

/**
 * 表格列配置
 */
export interface ToolColumn {
    label: string;
    prop: string;
    // /** 是否可编辑 */
    edit?: boolean;
    /** 编辑时是否校验必填 */
    required?: boolean;
    width?: string;
}

export interface ToolAPIKeyMap {
    /** 查询时的当前页 key 值 */
    queryCurrentPageKey: string;
    /** 查询时的每页数量 key 值 */
    queryPageSizeKey: string;
    /** 返回时当前页 key 值 */
    returnCurrentPageKey: string;
    /** 返回时当前每页条数 key 值 */
    returnCurrentSizeKey?: string;
    /** 返回时的总数据量 key 值 */
    returnTotalKey: string;
    /** 返回时总页数 key 值 */
    returnPagesKey: string;
    /** 返回时的数据列表 key 值 */
    returnRecordKey: string;
}

/**
 * project 分页参数
 */
export interface ToolPagination {
    /** 每页数量 */
    limit: number;
    /** 当前页 */
    page: number;
    /** 总数据量 */
    total: number;
}

/**
 * project props
 */
export interface ToolProp {
    /** 容器宽度 */
    width?: string;
    /** 容器高度 */
    height?: string;
    /** el-card-header */
    header: string;
    /** el-card-shadow */
    shadow?: 'always' | 'never' | 'hover';
    /** card-body-style */
    bodyStyle?: Record<string, string>;
    /** 表格标题 */
    title?: string;
    /** 是否展示索引 */
    tooltipContent?: string;
    showIndex?: boolean;
    /** 每行的 key 值 */
    rowKey?: string;
    /** 表格行高度 */
    rowHeight?: number;
    /** 表头行高度 */
    headerHeight?: number;
    /** loading */
    loading?: boolean;
    /** 无数据提示 */
    emptyText?: string;
    /** 请求接口 */
    api?: any;
    /** 跳转router */
    redirect_path?: any;
    /** 请求接口参数 */
    apiParams?: Record<string, string | number>;
    /** 接口字段映射 */
    apiKeyMap?: ToolAPIKeyMap;
    /** 表格列配置 */
    columns: ToolColumn<any>[];
    /** 表格数据 */
    data?: Record<string, any>[];
    /** 是否为分页格式 */
    dividePage?: boolean;
    /** 分页设置 */
    paginationProp?: Record<string, number>;
    /** 是否懒加载 */
    lazy?: boolean;
    /** 滚动 */
    scroll?: boolean;
}

export interface SearchForm {
    type: string | number;
}


export type {FormModelItem, FormModel, ToolActions, ToolAPIKeyMap,
    ToolColumn, ToolPagination, ToolProp, SearchForm };
