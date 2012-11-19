$(document).ready(function(){function r(e,r,i){t=r,n=i}var e=null,t=null,n=[];module("Backbone.Router",{setup:function(){Backbone.history=null,e=new i({testing:101}),Backbone.history.interval=9,Backbone.history.start({pushState:!1}),t=null,n=[],Backbone.history.on("route",r)},teardown:function(){Backbone.history.stop(),Backbone.history.off("route",r)}});var i=Backbone.Router.extend({count:0,routes:{noCallback:"noCallback",counter:"counter","search/:query":"search","search/:query/p:page":"search",contacts:"contacts","contacts/new":"newContact","contacts/:id":"loadContact","splat/*args/end":"splat","*first/complex-:part/*rest":"complex",":entity?*args":"query","*anything":"anything"},initialize:function(e){this.testing=e.testing,this.route("implicit","implicit")},counter:function(){this.count++},implicit:function(){this.count++},search:function(e,t){this.query=e,this.page=t},contacts:function(){this.contact="index"},newContact:function(){this.contact="new"},loadContact:function(){this.contact="load"},splat:function(e){this.args=e},complex:function(e,t,n){this.first=e,this.part=t,this.rest=n},query:function(e,t){this.entity=e,this.queryArgs=t},anything:function(e){this.anything=e}});test("Router: initialize",function(){equal(e.testing,101)}),asyncTest("Router: routes (simple)",4,function(){window.location.hash="search/news",setTimeout(function(){equal(e.query,"news"),equal(e.page,undefined),equal(t,"search"),equal(n[0],"news"),start()},10)}),asyncTest("Router: routes (two part)",2,function(){window.location.hash="search/nyc/p10",setTimeout(function(){equal(e.query,"nyc"),equal(e.page,"10"),start()},10)}),test("Router: routes via navigate",2,function(){Backbone.history.navigate("search/manhattan/p20",{trigger:!0}),equal(e.query,"manhattan"),equal(e.page,"20")}),test("Router: routes via navigate for backwards-compatibility",2,function(){Backbone.history.navigate("search/manhattan/p20",!0),equal(e.query,"manhattan"),equal(e.page,"20")}),test("Router: route precedence via navigate",6,function(){_.each([{trigger:!0},!0],function(t){Backbone.history.navigate("contacts",t),equal(e.contact,"index"),Backbone.history.navigate("contacts/new",t),equal(e.contact,"new"),Backbone.history.navigate("contacts/foo",t),equal(e.contact,"load")})}),test("Router: doesn't fire routes to the same place twice",function(){equal(e.count,0),e.navigate("counter",{trigger:!0}),equal(e.count,1),e.navigate("/counter",{trigger:!0}),e.navigate("/counter",{trigger:!0}),equal(e.count,1),e.navigate("search/counter",{trigger:!0}),e.navigate("counter",{trigger:!0}),equal(e.count,2),Backbone.history.stop(),e.navigate("search/counter",{trigger:!0}),e.navigate("counter",{trigger:!0}),equal(e.count,2),Backbone.history.start(),equal(e.count,3)}),test("Router: use implicit callback if none provided",function(){e.count=0,e.navigate("implicit",{trigger:!0}),equal(e.count,1)}),asyncTest("Router: routes via navigate with {replace: true}",function(){var t=window.history.length;e.navigate("search/manhattan/start_here"),e.navigate("search/manhattan/then_here"),e.navigate("search/manhattan/finally_here",{replace:!0}),equal(window.location.hash,"#search/manhattan/finally_here"),window.history.go(-1),setTimeout(function(){equal(window.location.hash,"#search/manhattan/start_here"),start()},500)}),asyncTest("Router: routes (splats)",function(){window.location.hash="splat/long-list/of/splatted_99args/end",setTimeout(function(){equal(e.args,"long-list/of/splatted_99args"),start()},10)}),asyncTest("Router: routes (complex)",3,function(){window.location.hash="one/two/three/complex-part/four/five/six/seven",setTimeout(function(){equal(e.first,"one/two/three"),equal(e.part,"part"),equal(e.rest,"four/five/six/seven"),start()},10)}),asyncTest("Router: routes (query)",5,function(){window.location.hash="mandel?a=b&c=d",setTimeout(function(){equal(e.entity,"mandel"),equal(e.queryArgs,"a=b&c=d"),equal(t,"query"),equal(n[0],"mandel"),equal(n[1],"a=b&c=d"),start()},10)}),asyncTest("Router: routes (anything)",1,function(){window.location.hash="doesnt-match-a-route",setTimeout(function(){equal(e.anything,"doesnt-match-a-route"),start(),window.location.hash=""},10)}),asyncTest("Router: fires event when router doesn't have callback on it",1,function(){try{var t=!1,n=function(){t=!0};e.bind("route:noCallback",n),window.location.hash="noCallback",setTimeout(function(){equal(t,!0),start(),window.location.hash=""},10)}catch(r){ok(!1,"an exception was thrown trying to fire the router event with no router handler callback")}}),test("#933, #908 - leading slash",function(){var e=new Backbone.History;e.options={root:"/root"},equal(e.getFragment("/root/foo"),"foo"),e.options.root="/root/",equal(e.getFragment("/root/foo"),"foo")}),test("#1003 - History is started before navigate is called",function(){var e=new Backbone.History;e.navigate=function(){ok(Backbone.History.started)},Backbone.history.stop(),e.start()}),test("Router: route callback gets passed non-decoded values",function(){var t="has%2Fslash/complex-has%23hash/has%20space";Backbone.history.navigate(t,{trigger:!0}),equal(e.first,"has%2Fslash"),equal(e.part,"has%23hash"),equal(e.rest,"has%20space")}),asyncTest("Router: correctly handles URLs with % (#868)",3,function(){window.location.hash="search/fat%3A1.5%25",setTimeout(function(){window.location.hash="search/fat",setTimeout(function(){equal(e.query,"fat"),equal(e.page,undefined),equal(t,"search"),start()},50)},50)})})