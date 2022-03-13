module.exports = {
    multiMongooseToObject: function(mongooses){
        return mongooses.map(mongoose => mongoose.toObject())
    }
}