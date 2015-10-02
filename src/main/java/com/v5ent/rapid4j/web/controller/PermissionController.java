package com.v5ent.rapid4j.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.web.model.Permission;
import com.v5ent.rapid4j.web.model.PermissionExample;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.model.RoleExample;
import com.v5ent.rapid4j.web.security.RoleSign;
import com.v5ent.rapid4j.web.service.PermissionService;

/**
 * 权限控制器
 * 
 * @author Mignet
 * @since 2014年5月28日 下午3:54:00
 **/
@Controller
@RequestMapping(value = "/permission")
public class PermissionController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PermissionController.class);
	
    @Resource
    private PermissionService permissionService;

    /**
     * 翻页的例子<br>
     * 针对前端组件获取后端的情形,angular
     * @return
     */
    @RequestMapping(value="",   method=RequestMethod.GET)  
    @ResponseBody
    public Page<Permission> getPermissions() {  
    	LOGGER.debug("------------TODO:传入翻页参数----------");
    	PermissionExample example = new PermissionExample();
    	Page<Permission> page = new Page<Permission>(1,10);
    	permissionService.selectByExample(example,page);  
        return page;
    }  
    
    @RequestMapping(value="/list",   method=RequestMethod.GET)  
    @RequiresRoles(value = RoleSign.ADMIN)
    public String permissions() {
    	return "permission/permission-list";
    }

}
