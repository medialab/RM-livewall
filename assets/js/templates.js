this["RM"] = this["RM"] || {};
this["RM"]["list"] = Handlebars.template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return "\n  <div class=\"section\">\n    <div class=\"title\">\n\n      <h4 class=\"col-sm-4\">#ResetModernity! <a href=\"\">"
    + container.escapeExpression(((helper = (helper = helpers.key || (data && data.key)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"key","hash":{},"data":data}) : helper)))
    + "</a></h4>\n      <p class=\"col-sm-8\">Tweet your contribution using <a href=\"\">#ResetModernity!</a> hashtag <br/>and <a href=\"\">#[procedure][piece]</a> (ex. <a href=\"\">#D2</a>) to refer to items from the exhibition.</p>\n    </div>\n"
    + ((stack1 = helpers.each.call(alias1,depth0,{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "  </div>\n\n";
},"2":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {}, alias2=helpers.helperMissing;

  return "      "
    + ((stack1 = (helpers.newLine || (depth0 && depth0.newLine) || alias2).call(alias1,(data && data.index),{"name":"newLine","hash":{},"fn":container.program(3, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n        <div class=\"col-sm-4 embedContainer\">\n          <a href=\""
    + container.escapeExpression(((helper = (helper = helpers.url || (depth0 != null ? depth0.url : depth0)) != null ? helper : alias2),(typeof helper === "function" ? helper.call(alias1,{"name":"url","hash":{},"data":data}) : helper)))
    + "\" class=\"embed\"></a>\n        </div>\n      "
    + ((stack1 = (helpers.newLine || (depth0 && depth0.newLine) || alias2).call(alias1,(data && data.index),{"name":"newLine","hash":{},"fn":container.program(5, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "")
    + "\n";
},"3":function(container,depth0,helpers,partials,data) {
    return "<div class=\"row line\">";
},"5":function(container,depth0,helpers,partials,data) {
    return "</div>";
},"compiler":[7,">= 4.0.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : {};

  return container.escapeExpression(((helper = (helper = helpers.debug || (depth0 != null ? depth0.debug : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(alias1,{"name":"debug","hash":{},"data":data}) : helper)))
    + "\n\n"
    + ((stack1 = helpers.each.call(alias1,(depth0 != null ? depth0.procedures : depth0),{"name":"each","hash":{},"fn":container.program(1, data, 0),"inverse":container.noop,"data":data})) != null ? stack1 : "");
},"useData":true});