import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const userSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6,
        trim:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        trim:true,
        lowercase:true,
    },
    createAt:{
        type:Date,
        default:Date.now,
    }
});

userSchema.pre('save', async function(next){
    if(!this.isModified('password')){
        return next();
    }
    try{
        const salt = await bcrypt.genSalt(10);
        this.password=await bcrypt.hash(this.password,salt);
        next();
    } catch (error){
        next(error);
    }
});

userSchema.methods.comparePassword=async function(candidatePassword){
    return bcrypt.compare(candidatePassword,this.password);
}

export default mongoose.model('User', userSchema);