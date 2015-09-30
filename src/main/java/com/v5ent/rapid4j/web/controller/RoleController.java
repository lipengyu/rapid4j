package com.v5ent.rapid4j.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.model.RoleExample;
import com.v5ent.rapid4j.web.security.PermissionSign;
import com.v5ent.rapid4j.web.security.RoleSign;
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
     * 基于角色 比如拥有admin角色，才可以查看用户列表
     */
    @RequestMapping(value="",   method=RequestMethod.GET)  
    @RequiresRoles(value = RoleSign.ADMIN)
    public String users(Model model) {
    	RoleExample example = new RoleExample();
    	Page<Role> page = new Page<Role>(1,10);
    	List<Role> roles = roleService.selectByExample(example,page);  
    	LOGGER.debug("roleService.selectList() size:"+roles);
    	model.addAttribute("roles",roles);
    	return "role/role-list";
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
}
