package com.v5ent.rapid4j.web.dao;

import java.util.List;

import org.apache.ibatis.session.RowBounds;

import com.v5ent.rapid4j.core.generic.GenericDao;
import com.v5ent.rapid4j.web.model.Permission;

public interface PermissionMapper extends GenericDao<Permission, Integer>{
    int deleteByPrimaryKey(Integer id);

    int insert(Permission record);

    int insertSelective(Permission record);

    Permission selectByPrimaryKey(Integer id);

    int updateByPrimaryKeySelective(Permission record);

    int updateByPrimaryKey(Permission record);

    /**
     * 通过角色id 查询角色 拥有的权限
     * 
     * @param roleId
     * @return
     */
	List<Permission> selectPermissionsByRoleId(Integer roleId);

	List<Permission> selectList(RowBounds page);

	List<Permission> selectByName(String permissionName);
}