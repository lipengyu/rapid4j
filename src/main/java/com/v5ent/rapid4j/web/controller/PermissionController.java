package com.v5ent.rapid4j.web.controller;

import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.apache.shiro.authz.annotation.RequiresRoles;
import org.codehaus.jackson.type.TypeReference;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.core.sigmagrid.SGReturn;
import com.v5ent.rapid4j.core.sigmagrid.SigmaGrid;
import com.v5ent.rapid4j.core.util.JsonUtils;
import com.v5ent.rapid4j.web.interceptors.DateConvertEditor;
import com.v5ent.rapid4j.web.model.Permission;
import com.v5ent.rapid4j.web.model.PermissionExample;
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
	 * Sigma Grid
	 * @param _gt_json
	 * @return
	 */
    @RequestMapping("/all")
	@ResponseBody
	public SGReturn selectAll(@RequestParam String _gt_json) {
		LOGGER.info(" _gt_json={}", _gt_json);
		SigmaGrid<Permission> sigma = JsonUtils.fromJsonToObject(_gt_json,
				new TypeReference<SigmaGrid<Permission>>() {
				});
		sigma = this.permissionService.selectBySigmaGrid(sigma);

		return new SGReturn(sigma.getData(), sigma.getPageInfo());
	}
    /**
	 * 增加、删除、修改
	 *
	 * @param gtjson
	 * @return
	 */
	@RequestMapping(value = "/save")
	@ResponseBody
	public Map<String, Object> updateBySigmaGrid(@RequestParam String _gt_json) {
		Map<String, Object> map = new HashMap<String, Object>();
		LOGGER.info(" gtjson={}", _gt_json);
		SigmaGrid<Permission> sigma = JsonUtils.fromJsonToObject(_gt_json,
				new TypeReference<SigmaGrid<Permission>>() {
				});
		try {
			this.permissionService.updateBySigmaGrid(sigma);
			map.put("success", true);
		} catch (Exception e) {
			LOGGER.error("Exception: ", e);
			map.put("success", false);
			map.put("exception", e);
		}
		return map;
	}
    
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
    	return "sys/permission-list";
    }

}
