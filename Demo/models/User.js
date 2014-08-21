/**
 * Created with JetBrains WebStorm.
 * User: zhangli
 * Date: 14-4-29
 * Time: 下午9:43
 * To change this template use File | Settings | File Templates.
 */
var mongoose=require("mongoose");
var Schema=mongoose.Schema;

var _User=new Schema({
   name:String,
   email:String
});


var PersonSchema = new Schema({
    name    : String,
    age     : Number,
    stories : [{ type: Schema.Types.ObjectId, ref: 'Story' }]
});

var StorySchema = new Schema({
    _creator : { type: Schema.Types.ObjectId, ref: 'Person' },
    title    : String,
    fans     : [{ type: Schema.Types.ObjectId, ref: 'Person' }]
});

var Story  = mongoose.model('Story', StorySchema);
var Person = mongoose.model('Person', PersonSchema);

exports.User=mongoose.model("User", _User);