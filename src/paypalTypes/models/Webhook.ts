/* generated using openapi-typescript-codegen -- do not edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { WebhookDelivery } from './WebhookDelivery';
import type { WebhookResponse } from './WebhookResponse';
import type { WebhookTrigger } from './WebhookTrigger';
export type Webhook = {
    readonly created_at?: string;
    readonly updated_at?: string;
    /**
     * Boolean to indicate if the webhook is active
     */
    active?: boolean;
    /**
     * A title for the webhook for easy recognition.
     */
    title: string;
    /**
     * A 24-character secret for the webhook. It's generated by Firefly III when saving a new webhook. If you submit a new secret through the PUT endpoint it will generate a new secret for the selected webhook, a new secret bearing no relation to whatever you just submitted.
     */
    readonly secret?: string;
    trigger: WebhookTrigger;
    response: WebhookResponse;
    delivery: WebhookDelivery;
    /**
     * The URL of the webhook. Has to start with `https`.
     */
    url: string;
};

