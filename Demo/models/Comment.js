/**
 * Created by df on 2014/8/11.
 */
var mongoose=require('mongoose'),
    Schema=mongoose.Schema;

var CommentSchema=new Schema({
    comment:String,
    len:String
});
var Comment=mongoose.model('Comment',CommentSchema);

module.exports={
    CommentSchema:CommentSchema,
    Comment:Comment
}