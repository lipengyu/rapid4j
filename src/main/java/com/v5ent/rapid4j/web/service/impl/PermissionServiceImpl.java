package com.v5ent.rapid4j.web.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.v5ent.rapid4j.core.entity.Criteria;
import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.core.generic.GenericDao;
import com.v5ent.rapid4j.core.generic.GenericServiceImpl;
import com.v5ent.rapid4j.core.sigmagrid.Grids;
import com.v5ent.rapid4j.core.sigmagrid.SigmaGrid;
import com.v5ent.rapid4j.web.dao.PermissionMapper;
import com.v5ent.rapid4j.web.model.Permission;
import com.v5ent.rapid4j.web.model.PermissionExample;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.model.RoleExample;
import com.v5ent.rapid4j.web.service.PermissionService;

/**
 * 权限Service实现类
 *
 * @author Mignet
 * @since 2014年6月10日 下午12:05:03
 */
@Service
public class PermissionServiceImpl extends GenericServiceImpl<Permission, Long> implements PermissionService {

	private static final Logger LOGGER = LoggerFactory.getLogger(PermissionServiceImpl.class);
	
    @Resource
    private PermissionMapper permissionMapper;


    @Override
    public GenericDao<Permission, Long> getDao() {
        return permissionMapper;
    }

    @Override
    public List<Permission> selectPermissionsByRoleId(Long roleId) {
        return permissionMapper.selectPermissionsByRoleId(roleId);
    }

	@Override
	public List<Permission> selectByExample(PermissionExample example,RowBounds rb) {
		return permissionMapper.selectByExampleAndPage(example,rb);
	}
	
	@Override
	public SigmaGrid<Permission> selectBySigmaGrid(SigmaGrid<Permission> sigma) {
		// TODO Auto-generated method stub
		Criteria example = new Criteria();
		// oracle排序
		example.setMysqlLength(sigma.getPageInfo().getPageSize());
		example.setMysqlOffset(sigma.getPageInfo().getPageSize() * (sigma.getPageInfo().getPageNum() - 1));
		// 组装排序信息
		StringBuilder order = new StringBuilder();
		for (int i = 0; i < sigma.getSortInfo().size(); i++) {
			String fieldName = sigma.getSortInfo().get(i).getFieldName();
			String sortOrder = sigma.getSortInfo().get(i).getSortOrder();
			// 升序或者降序的时候
			if (!"defaultsort".equals(sortOrder) && !"".equals(sortOrder))
				order.append(Grids.toClumn(fieldName)).append(' ').append(sortOrder).append(',');
		}
		// 去掉最后一个逗号并设置排序
		if (null != order) {
			example.setOrderByClause(order.substring(0, order.length() - 1));
		}

		// TODO:条件查询
		PermissionExample e = new PermissionExample();
		Page<Permission> page  = new Page<Permission>(1,10);
		List<Permission> list = this.permissionMapper.selectByExampleAndPage(e,page);
		sigma.setData(list);
		// 总数
		LOGGER.debug("count:{}", list.size());
		sigma.getPageInfo().setTotalRowNum(list.size());

		return sigma;
	}

	@Override
	@Transactional
	public void updateBySigmaGrid(SigmaGrid<Permission> sigma) {
		List<Permission> list = null;
		list = sigma.getInsertedRecords();
		if (null != list) {
			for (int i = 0; i < list.size(); i++) {
				this.permissionMapper.insert(list.get(i));
			}
		}
		list = sigma.getUpdatedFields();
		if (null != list) {
			for (int i = 0; i < list.size(); i++) {
				this.permissionMapper.updateByPrimaryKeySelective(list.get(i));
			}
		}
		list = sigma.getDeletedRecords();
		if (null != list) {
			for (int i = 0; i < list.size(); i++) {
				this.permissionMapper.deleteByPrimaryKey(list.get(i).getId());
			}
		}
	}
}
