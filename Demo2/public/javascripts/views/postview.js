/**
 * Created by df on 2014/8/22.
 */
var PostView=Backbone.View.extend({
    el:"#t",
    events:{
      "click .t1":"test1"
    },
    test1:function(){
        alert("test1");
    },
    initialize:function(){
        this.render();
    },
    render:function(){
        var p=new Post();
        p.fetch();
        $(this.$el).append("<h3>"+ p.get("name")+"</h3>");
        $(this.$el).append("<h3>"+ p.get("age")+"</h3>");
    }
});