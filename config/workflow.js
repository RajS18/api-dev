import {Client as WorkflowClient} from '@upstash/workflow';
import {QSTASH_TOKEN, QSTASH_URL} from './env.js';

export const workflowClient = new WorkflowClient({
    baseUrl: QSTASH_URL, // Base URL for QStash
    token: QSTASH_TOKEN, // QStash token for authentication
    });
