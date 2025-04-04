/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { AttachableType } from './AttachableType';
export type Attachment = {
    readonly created_at?: string;
    readonly updated_at?: string;
    attachable_type: AttachableType;
    /**
     * ID of the model this attachment is linked to.
     */
    attachable_id: string;
    /**
     * MD5 hash of the file for basic duplicate detection. This field is deprecated.
     */
    md5?: string;
    /**
     * Hash of the file for basic duplicate detection. It's still md5 lol.
     */
    hash?: string;
    filename: string;
    download_url?: string;
    upload_url?: string;
    title?: string | null;
    notes?: string | null;
    readonly mime?: string;
    readonly size?: number;
};

