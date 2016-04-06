package com.v5ent.rapid4j.web.dao;

import java.util.List;

import org.apache.ibatis.annotations.Param;

import com.v5ent.rapid4j.core.datatable.DataTable;
import com.v5ent.rapid4j.core.generic.GenericDao;
import com.v5ent.rapid4j.core.orm.paging.Page;
import com.v5ent.rapid4j.web.model.Role;

public interface RoleMapper extends GenericDao<Role, Integer>{
    int deleteByPrimaryKey(Integer id);

    int insert(Role record);

    int insertSelective(Role record);

    Role selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Role record);

    int updateByPrimaryKey(Role record);
    
    /**
     * 通过用户id 查询用户 拥有的角色
     * 
     * @param id
     * @return
     */
    List<Role> selectRolesByUserId(Integer userId);

    /**
     * 封装DataTable对象查询
     * @param dt
     * @param page
     * @return
     */
	List<Role> selectBySearchInfo(@Param("dt")DataTable dt/*, Page<Role> page*/);

}