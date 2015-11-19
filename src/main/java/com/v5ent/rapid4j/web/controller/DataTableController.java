package com.v5ent.rapid4j.web.controller;

import java.util.Date;

import org.apache.commons.lang.StringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.propertyeditors.StringTrimmerEditor;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.WebDataBinder;
import org.springframework.web.bind.annotation.InitBinder;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.v5ent.rapid4j.core.datatable.DataTable;
import com.v5ent.rapid4j.core.datatable.DataTableReturn;
import com.v5ent.rapid4j.core.result.JQReturn;
import com.v5ent.rapid4j.core.util.JsonUtils;
import com.v5ent.rapid4j.web.interceptors.DateConvertEditor;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.service.RoleService;

/**
 * datatables
 * 
 * @author Mignet
 * @date 2011-7-27 上午9:44:24
 */
@RequestMapping("/datatable")
@Controller
public class DataTableController {
	private static final Logger logger = LoggerFactory.getLogger(DataTableController.class);

	@Autowired
	private RoleService ajaxService;

	private DataTable dataTable;

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

	@RequestMapping("/all")
	@ResponseBody
	public Object select(@RequestParam("_dt_json") String dtjson) {
		logger.info("String dtjson=" + dtjson);

		this.dataTable = JsonUtils.fromJsonToObject(dtjson, DataTable.class);

		DataTableReturn tableReturn = this.ajaxService.selectByDatatables(dataTable);

		return tableReturn;
	}

	@RequestMapping("/save")
	@ResponseBody
	public Object saveOrUpdate(Role ajax) {
		if (StringUtils.isBlank(ajax.getRoleName())) {
			return new JQReturn(false, "角色名称不能为空!");
		}
		try {
			return this.ajaxService.update(ajax);
		} catch (Exception e) {
			logger.error("Exception: ", e);
			return new JQReturn(false, "系统繁忙，请稍候再试!");
		}
	}

	@RequestMapping("/del/{id}")
	@ResponseBody
	public Object delete(@PathVariable Long id) {
		if (id == null) {
			return new JQReturn(false, "主键不能为空!");
		}
		try {
			if (this.ajaxService.delete(id) == 1) {
				return new JQReturn(true, "删除成功!");
			} else {
				return new JQReturn(false, "删除失败!");
			}
		} catch (Exception e) {
			logger.error("Exception: ", e);
			return new JQReturn(false, "系统繁忙，请稍候再试!");
		}
	}
}
