//Simple module import will not work with import syntax, we import it using createRequire from 'module'
//This is because the Upstash Workflow package is not written in a way that it can be imported using import syntax
// What does this 'createRequire' do?
// It allows us to use the CommonJS 'require' syntax in an ES module context.

//In order to import it using modules import syntax,
import { createRequire } from 'module';
import Subscription from '../models/subscription.model.js';
import dayjs from 'dayjs';
import { sendEmailReminder } from '../utils/send-email.js';
const require = createRequire(import.meta.url);
const {serve} = require('@upstash/workflow/express');
const remiders = [10,5,2,1];

export const sendRemiders = serve( async (context) => {
    // This function will be executed when the workflow is triggered
    // You can access the context object to get information about the workflow execution
    
    const { subscriptionId } = context.requestPayload
    //sleep for 10 seconds
    
    const subscription = await gfetchSubscription(context, subscriptionId);

    if (!subscription || subscription.status !== "active") {
        console.error('Subscription not found or inactive:', subscriptionId);
        return;
    }


    const renewalDate = dayjs(subscription.renewalDate);
    if(renewalDate.isBefore(dayjs())) {
        console.log('Subscription is already expired:', subscription._id);
        return;
    }

    // Here you can implement the logic to send reminders
    console.log(`Sending reminder for subscription ${subscription._id} to user ${subscription.user.name} (${subscription.user.email})`);

    for (const reminder of remiders) {
        const remiderDate = renewalDate.subtract(reminder, 'day');
        if (remiderDate.isAfter(dayjs())) {
            await sleepUntilRemider(context, `Reminder:: ${reminder} days before`, remiderDate);
        }
        if(dayjs().isSame(remiderDate, 'day'))
            await triggerRemider(context, `${reminder} days before reminder`, subscription);
    }
})


const gfetchSubscription = async (context, subId) => {
    return await context.run('get subscription', async () => {
        return await Subscription.findById(subId).populate('user', 'name email');
    });
}

const sleepUntilRemider = async (context, label, reminderDate) => {
    console.log(`Sleeping until ${label} reminder date: ${reminderDate}`);
    await context.sleepUntil(label, reminderDate.toDate());
}

const triggerRemider = async (context, label, subs) => {
    return await context.run(label, async ()=>{
        console.log(`Triggering reminder: ${label}`);
        await sendEmailReminder({
            to: subs.user.email,   
            type: label,
            subs: subs
        });
    });
}