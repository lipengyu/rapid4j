package com.v5ent.rapid4j.web.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;

import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.core.generic.GenericService;
import com.v5ent.rapid4j.core.sigmagrid.SigmaGrid;
import com.v5ent.rapid4j.web.model.Permission;
import com.v5ent.rapid4j.web.model.PermissionExample;

/**
 * 权限 业务接口
 * 
 * @author Mignet
 * @since 2014年6月10日 下午12:02:39
 **/
public interface PermissionService extends GenericService<Permission, Long> {

    /**
     * 通过角色id 查询角色 拥有的权限
     * 
     * @param roleId
     * @return
     */
    List<Permission> selectPermissionsByRoleId(Long roleId);

	List<Permission> selectByExample(PermissionExample example, RowBounds rb);

	/**
	 * TODO:>Common
	 * @param sigma
	 * @return
	 */
	SigmaGrid<Permission> selectBySigmaGrid(SigmaGrid<Permission> sigma);
	
	/**
	 * save and update and delete
	 * @param sigma
	 */
	void updateBySigmaGrid(SigmaGrid<Permission> sigma) ;

}
