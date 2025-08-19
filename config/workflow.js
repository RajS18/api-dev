import {Client as WorkflowClient} from '@arcjet/workflow-client';
import {QSTASH_TOKEN, QSTASH_URL} from './env.js';

const workflowClient = new WorkflowClient({
    token: QSTASH_TOKEN, // QStash token for authentication
    baseUrl: QSTASH_URL, // Base URL for QStash
    });
export default workflowClient;