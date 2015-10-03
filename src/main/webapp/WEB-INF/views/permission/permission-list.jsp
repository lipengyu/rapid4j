<%@ page language="java" pageEncoding="utf-8"%>
<script type="text/javascript" src="assets/plugins/angular/angular.min.js"  ></script>
<script type="text/javascript">
var appModule = angular.module('app', []);
appModule.controller('HelloController',function($scope,dateFilter){
	$scope.msg = "Hello world!";
	$scope.test = new Date();
	$scope.v = dateFilter($scope.test,'yyyy-MM-dd HH:mm:ss');
	$http.get('/rest/permission',{async:false}).success(function(data, status, headers, config) {
		$scope.permissions = data.result;
	 }).error(function(data, status, headers, config){
     	//
     });
	
});
</script>
 <div ng-app="app">
  <div ng-controller="HelloController">
		{{test}}<br>
		{{test|date:'yyyy-MM-dd HH:mm:ss'}}<br>
		{{v}}<br>
		<div style="border-style:groove;float:right;" ng-show="flag">
<ul> 
编号 - 名称 - 标记 - 描述
<li ng-repeat="o in permissions">{{o.id}} - {{o.permission_name}} - {{o.permission_sign}} - {{o.description}} </li></ul>
</div>
	</div>
  </div>