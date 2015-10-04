<%@ page language="java" pageEncoding="utf-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<script type="text/javascript" src="assets/plugins/data-tables/jquery.dataTables.js"  ></script>
<script type="text/javascript" src="assets/plugins/data-tables/DT_bootstrap.js"  ></script>
 <link href="assets/plugins/data-tables/DT_bootstrap.css" rel="stylesheet" type="text/css" />
<script type="text/javascript" src="assets/js/role-list.js"></script>
<table id="example" class="display" >
        <thead>
            <tr>
                <th>Id</th>
                <th>roleName</th>
                <th>roleSign</th>
                <th>description</th>
            </tr>
        </thead>
 
        <tfoot>
            <tr>
             	 <th>Id</th>
                <th>roleName</th>
                <th>roleSign</th>
                <th>description</th>
            </tr>
        </tfoot>
    </table>
    
    <form id="form" style="display: none;">
		<table border="0px" style="font-size: 12px" width="630px">
			<input type="hidden" id="id" name="id" />
			<tr>
				<!-- 控制宽度 -->
				<td align="right" style="width: 80px;"><span style="color: red;">*</span> 内核引擎：</td>
				<td style="width: 200px;"><input type="text" id="engine" name="engine" /></td>
				<td><div id="engineTip"></div></td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
				<td colspan="2" valign="top"><div id="engineFixTip"></div></td>
			</tr>

			<tr>
				<td align="right"><span style="color: red;">*</span> 浏览器：</td>
				<td><input type="text" id="browser" name="browser" /></td>
				<td><div id="browserTip"></div></td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
				<td colspan="2" valign="top"><div id="browserFixTip"></div></td>
			</tr>

			<tr>
				<td align="right"><span style="color: red;">*</span> 平台：</td>
				<td><input type="text" id="platform" name="platform" /></td>
				<td><div id="platformTip"></div></td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
				<td colspan="2" valign="top"><div id="platformFixTip"></div></td>
			</tr>

			<tr>
				<td align="right"><span style="color: red;">*</span> 版本：</td>
				<td><input type="text" id="version" name="version" /></td>
				<td><div id="versionTip"></div></td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
				<td colspan="2" valign="top"><div id="versionFixTip"></div></td>
			</tr>

			<tr>
				<td align="right">CSS评级：</td>
				<td><input type="text" id="grade" name="grade" /></td>
				<td><div id="gradeTip"></div></td>
			</tr>
			<tr>
				<td align="right">&nbsp;</td>
				<td colspan="2" valign="top"><div id="gradeFixTip"></div></td>
			</tr>

			<tr>
				<td align="right">时间：</td>
				<td><input type="text" id="datetime" name="datetime" value="" /><b id="time" class="date"></b>
				</td>
				<td><div id="datetimeTip"></div></td>
			</tr>
			<tr>
				<td align="right" valign="top">&nbsp;</td>
				<td colspan="2" valign="top"><div id="datetimeFixTip"></div></td>
			</tr>

			<tr>
				<td align="right" valign="top">&nbsp;</td>
				<td colspan="2"><input id="submit" type="submit" class="ui-button ui-state-default ui-corner-all " value="保存" />&nbsp;&nbsp;&nbsp;&nbsp;<input
					class="ui-button ui-state-default ui-corner-all " type="reset" value="重置" />
			</tr>
		</table>
	</form>