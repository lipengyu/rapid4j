package com.v5ent.rapid4j.web.service.impl;

import java.util.List;

import javax.annotation.Resource;

import org.apache.ibatis.session.RowBounds;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Service;

import com.v5ent.rapid4j.core.datatable.DataTable;
import com.v5ent.rapid4j.core.datatable.DataTableReturn;
import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.core.generic.GenericDao;
import com.v5ent.rapid4j.core.generic.GenericServiceImpl;
import com.v5ent.rapid4j.web.dao.RoleMapper;
import com.v5ent.rapid4j.web.model.Role;
import com.v5ent.rapid4j.web.model.RoleExample;
import com.v5ent.rapid4j.web.service.RoleService;

/**
 * 角色Service实现类
 *
 * @author Mignet
 * @since 2014年6月10日 下午4:16:33
 */
@Service
public class RoleServiceImpl extends GenericServiceImpl<Role, Long> implements RoleService {

	private static final Logger LOGGER = LoggerFactory.getLogger(RoleServiceImpl.class);
	
    @Resource
    private RoleMapper roleMapper;

    @Override
    public GenericDao<Role, Long> getDao() {
        return roleMapper;
    }

    @Override
    public List<Role> selectRolesByUserId(Long userId) {
        return roleMapper.selectRolesByUserId(userId);
    }

	@Override
	public List<Role> selectByExample(RoleExample example, RowBounds rb) {
		 return roleMapper.selectByExampleAndPage(example,rb);
	}

	@Override
	public DataTableReturn selectByDatatables(DataTable dataTable) {
		RoleExample e = new RoleExample();
		RoleExample.Criteria criteria = e.createCriteria();
		DataTableReturn tableReturn = new DataTableReturn();
		tableReturn.setsEcho(1);
		LOGGER.debug(" 排序和模糊查询 ");

//		criteria.setMysqlLength(dataTable.getDisplayLength());
//		criteria.setMysqlOffset(dataTable.getDisplayStart());
		LOGGER.debug("%s,%s",dataTable.getDisplayStart(),dataTable.getDisplayLength());
		// 排序
		/*if (null != dataTable.getSortInfo()) {
			StringBuffer order = new StringBuffer();
			List<SortInfo> list = dataTable.getSortInfo();
			for (int i = 0; i < list.size(); i++) {
				SortInfo si = list.get(i);
				order.append(si.getColumnId()).append(' ').append(si.getSortOrder()).append(',');
			}
			LOGGER.debug("order:{}", order.toString());
			criteria.setOrderByClause(order.substring(0, order.length() - 1));
		}*/
		// 模糊查询
		/*if (StringUtils.isNotBlank(dataTable.getSearch())) {
			criteria.put("search", dataTable.getSearch());
		}*/
		Page<Role> page  = new Page<Role>(1,10);
		List<Role> list = this.roleMapper.selectByExampleAndPage(e,page);
		tableReturn.setAaData(list);

		tableReturn.setiTotalDisplayRecords(list.size());
		tableReturn.setiTotalRecords(list.size());

		return tableReturn;
	}

}
