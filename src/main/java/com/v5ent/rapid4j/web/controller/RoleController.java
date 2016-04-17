package com.v5ent.rapid4j.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;

import org.apache.commons.lang.StringUtils;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.datatable.DataTable;
import com.v5ent.rapid4j.core.datatable.DataTableReturn;
import com.v5ent.rapid4j.core.result.JQReturn;
import com.v5ent.rapid4j.core.util.JsonUtils;
import com.v5ent.rapid4j.web.interceptors.DateConvertEditor;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.rbac.PermissionSign;
import com.v5ent.rapid4j.web.rbac.RoleSign;
import com.v5ent.rapid4j.web.service.RoleService;

/**
 * 角色控制器
 *
 * @author Mignet
 * @since 2014年5月28日 下午3:54:00
 **/
@Controller
@RequestMapping(value = "/role")
public class RoleController {

	private static final Logger LOGGER = LoggerFactory.getLogger(RoleController.class);

    @Resource
    private RoleService roleService;

	/**
	 * 日期转换
	 *
	 * @param binder
	 */
	@InitBinder
	public void initBinder(WebDataBinder binder) {
		binder.registerCustomEditor(Date.class, new DateConvertEditor());
		binder.registerCustomEditor(String.class, new StringTrimmerEditor(true));
	}

    /**
     * 基于角色 比如拥有admin角色，才可以查看角色列表.
     */
    @RequestMapping(value="",   method=RequestMethod.GET)
    @RequiresRoles(value = RoleSign.ADMIN)
    public String roles(Model model) {
//    	List<Role> roles =new ArrayList<Role> roleService.selectList();//empty
//    	LOGGER.debug("roleService.selectList() size:"+roles);
//    	model.addAttribute("roles",roles);
    	return "sys/role-list";
    }

    /**
     * 翻页的例子<br>
     * 针对前端组件获取后端的情形
     * @return
     */
    @RequestMapping(value="/list", method = RequestMethod.POST)
    @ResponseBody
	public DataTableReturn getRoles(@RequestParam String  _dt_json) {
		LOGGER.debug("role list _dt_json={}", _dt_json);
		DataTable dataTable = JsonUtils.fromJsonToObject(_dt_json, DataTable.class);
		DataTableReturn tableReturn = roleService.selectByDatatables(dataTable);
		return tableReturn;
	}

    /**
     * 基于权限标识的权限控制
     */
    @RequestMapping(value = "/create")
    @ResponseBody
    @RequiresPermissions(value = PermissionSign.ROLE_CREATE)
    public String create() {
        return "拥有role:create权限,能访问";
    }

    @RequestMapping("/save")
	@ResponseBody
	public Object saveOrUpdate(Role role) {
		if (StringUtils.isBlank(role.getRoleName())) {
			return new JQReturn(false, "角色名称不能为空!");
		}
		try {
			return this.roleService.update(role);
		} catch (Exception e) {
			LOGGER.error("Exception: ", e);
			return new JQReturn(false, "系统繁忙，请稍候再试!");
		}
	}

	@RequestMapping("/del/{id}")
	@ResponseBody
	public Object delete(@PathVariable Integer id) {
		if (id == null) {
			return new JQReturn(false, "主键不能为空!");
		}
		try {
			if (this.roleService.delete(id) == 1) {
				return new JQReturn(true, "删除成功!");
			} else {
				return new JQReturn(false, "删除失败!");
			}
		} catch (Exception e) {
			LOGGER.error("Exception: ", e);
			return new JQReturn(false, "系统繁忙，请稍候再试!");
		}
	}

}
