import mongoose from "mongoose";
const subSchema = mongoose.Schema(
    {
        name: {
            type:String,
            minLength: 3,
            maxLength: 100,
            required: [true, 'The name of the subscription is required!'],
            trim: true
        },
        price:{
            type:Number,
            required: [true, 'Price is required!'],
            min: [0, 'Price must be greater than 0!']
        },
        currency:{
            type: String,
            default: 'USD',
            enum: ['USD', 'GBP', 'JPY', 'INR']
        },
        paymentMethod:{
            required: true,
            type: String,
            trim: true
        },
        frequency:{
            type: String,
            enum: ['daily', 'monthly', 'weekly', 'annually']
        },
        category: {
            type: String,
            enum: ['finance', 'sport', 'entertainment', 'groceries', 'delivery', 'lifestyle', 'politics', 'news'],
            required: [true, 'Category is needed to be mentioned!'],
            trim:true
        },
        status:{
            type: String,
            enum: ['active','expired','cancelled'],
            default: 'active'
        },
        startDate:{
            type: Date,
            required: true,
            validate: {
                validator:(val)=>  val <= new Date(),
                message: 'Start Date must be less than the current date!'
            }
        },
        renewalDate:{
            type: Date,
            validate: {
                validator: function(val){return  val > this.startDate},
                message: 'Renewal Date must be greater than the current date!'
            }
        },
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            index: true
        }
    },
    {timestamp:true}
);
//auto calculate renewal date
subSchema.pre('save', function(next){
    if(!this.renewalDate){
        const periods = {
            'daily':1,
            'weekly':7,
            'monthly':30,
            'annually':365,
        };
        this.renewalDate = new Date(this.startDate);
        this.renewalDate.setDate(this.renewalDate.getDate() + periods[this.frequency]);

    }
    if(this.renewalDate < new Date()){
        this.status = 'expired';
    }
    next();
});
const Subscription = mongoose.model('Subscription',subSchema);
export default Subscription;