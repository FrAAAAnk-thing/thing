import mongoose from "mongoose"

const appointmentSchema = new mongoose.Schema({
    userId: { type: String, required: true},
    docId: { type: String, default: true/*required: true */},
    slotDate: { type: String, required: true},
    userData: { type: Object, required: true},
    docData: { type: String, default: true/*required: true */},
    amount: { type: String, default: true/*required: true */},
    date: { type: Number, required: true},
    cancelled: { type: Boolean, default: false},
    payment: { type: Number, default: false},
    cancelled: { type: Boolean, default: false},
    isCompleted: { type: Boolean, default: false},
})

const appointmentModel = mongoose.models.appointment || mongoose.model('appointment', appointmentModel)

export default appointmentModel