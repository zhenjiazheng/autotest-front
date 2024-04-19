import type { Column } from 'element-plus';

export interface FormModelItem {
    isEditing: boolean;
    isNew: boolean;
    data: Record<string | number | symbol, any>;
    formData: Record<string | number | symbol, any>;
}

export interface FormModel {
    model: FormModelItem[];
}

export interface EditActions {
    addRow: (row?: Record<string, any>) => void;
    deleteRow: (index: number) => void;
    startEdit: (index: number) => void;
    cancelEdit: (index: number) => void;
    saveEdit: (index: number) => void;
}


export type {FormModelItem, FormModel, EditActions, ProjectAPIKeyMap,
    ProjectEditColumn, ProjectPagination, ProjectProp };
