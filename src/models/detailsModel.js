import mongoose from 'mongoose';

const detailsSchema = new mongoose.Schema({
    id: { type: String},
    username: { type: String, required: [true, "Please provide a username"] },
     email: { type: String, required: [true, "Please provide an email"] },
    fullName: { type: String, default: '' },
    phone: { type: String,default: '' },
    address: { type: String, default: ''},
    photo: { type: String,default: ''  },
    joinDate: { type: String, default: ''},
    statsprojects: { type: Number, default: 0  },
    statscontributions: { type: Number, default: 0 },
    statsstreak: { type: Number, default: 0 },
    role: { type: String, default: 0 },
});    

const Details = mongoose.models.Details || mongoose.model('Details', detailsSchema); 
export default Details;