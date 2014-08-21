/**
 * Created by df on 2014/7/16.
 */
var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var _PostSchema=new Schema({
    name:String,
    email:String,
    website:String,
    createdate:{
        type:Date,
        default:Date.now()
    }
});

_PostSchema.path('name').set(function(v){
   return v.toUpperCase();
});

_PostSchema.pre('save',function(next){
    console.log(this.get('name'));
    next();
});

_PostSchema.statics.findbyName=function(name,cb){
    this.find({name:new RegExp(name,'i')},cb);
};

_PostSchema.virtual('name.full').get(function(){
    return this.name+"sdfsdf";
});

var Post=mongoose.model('Post',_PostSchema);

module.exports={
    PostSchema:_PostSchema,
    Post:Post
}