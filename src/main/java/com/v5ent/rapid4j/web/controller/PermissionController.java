package com.v5ent.rapid4j.web.controller;

import java.util.List;

import javax.annotation.Resource;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.entity.Result;
import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.web.model.Permission;
import com.v5ent.rapid4j.web.model.PermissionExample;
import com.v5ent.rapid4j.web.model.PermissionExample.Criteria;
import com.v5ent.rapid4j.web.security.RoleSign;
import com.v5ent.rapid4j.web.service.PermissionService;

/**
 * 权限控制器<br>
 * 完全的Restful API
 * @author Mignet
 * @since 2014年5月28日 下午3:54:00
 **/
@Controller
@RequestMapping(value = "/permissions")
public class PermissionController {

	private static final Logger LOGGER = LoggerFactory.getLogger(PermissionController.class);
	
    @Resource
    private PermissionService permissionService;

    /**
     * select all <br>
     * Restful
     * @return
     */
    @RequestMapping(value="",   method=RequestMethod.GET)  
    @ResponseBody
    public Page<Permission> getPermissions(@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize) {
    	PermissionExample example = new PermissionExample();
    	Page<Permission> page = new Page<Permission>(pageNo,pageSize);
    	example.setOrderByClause("id");
    	List<Permission> users = permissionService.selectByExample(example,page);  
    	LOGGER.debug("PermissionService.selectList() :"+users);
        return page;
    }  
    
    /**
     * 基于权限标识的权限控制案例<br>
     * POST Restful
     */
    @RequestMapping(value = "", method = RequestMethod.POST)
    @ResponseBody
    @RequiresRoles(value = RoleSign.ADMIN)
    public Result create(Permission item) {
    		item.setId(null);
	    	//加入我们使用时间变量CreateTime作为salt
	    	int i = permissionService.insert(item);
	    	if(i==1){
	    		return new Result(true,201,"新增成功!");
	    	}else{
	    		return new Result(false,500,"新增失败");
	    	}
    }
    
    /**
     * 基于权限标识的权限控制案例<br>
     * PUT Restful
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.PUT)
    @ResponseBody
    @RequiresRoles(value = RoleSign.ADMIN)
    public Result update(Permission item) {
    		int i = permissionService.update(item);
    		if(i==1){
    			return new Result(true,200,"更新成功!");
    		}else{
    			return new Result(false,500,"更新失败");
    		}
    }
    
    /**
     *  DELETE Restful
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @RequiresRoles(value = RoleSign.ADMIN)
    public Result delete(@PathVariable("id") String id) {
    	int i = permissionService.delete(Long.valueOf(id));
    	if(i==1){
    		return new Result(true,"删除成功!");
    	}else{
    		return new Result(false,500,"删除失败");
    	}
    }
    /**
     *  GET Restful
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public Permission get(@PathVariable("id") String id) {
    	return permissionService.selectById(Long.valueOf(id));
    }
    
    @RequestMapping(value = "/check", method = RequestMethod.GET)
    @ResponseBody
    public boolean canUsed(@RequestParam("permissionName") String permissionName) {
    	PermissionExample example = new PermissionExample();
    	Criteria c = example.createCriteria();
    	c.andPermissionNameEqualTo(permissionName);
    	List<Permission> u =  permissionService.selectByExample(example);
    	if(u!=null&&u.size()>=1){
    		return false;
    	}else{
    		return true;
    	}
    }
    
    /**
     * dispatcher view
     * @return
     */
    @RequestMapping(value="/list",   method=RequestMethod.GET)  
    @RequiresRoles(value = RoleSign.ADMIN)
    public String permissions() {
    	return "sys/permission-list";
    }

}
