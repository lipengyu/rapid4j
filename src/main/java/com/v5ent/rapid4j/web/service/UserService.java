package com.v5ent.rapid4j.web.service;

import java.util.List;

import org.apache.ibatis.session.RowBounds;

import com.v5ent.rapid4j.core.generic.GenericService;
import com.v5ent.rapid4j.web.model.User;

/**
 * 用户 业务 接口
 * 
 * @author Mignet
 * @since 2014年7月5日 上午11:53:33
 **/
public interface UserService extends GenericService<User, Integer> {

    /**
     * 用户验证
     * 
     * @param user
     * @return
     */
    User authentication(User user);


    /**
     * 根据用户名查询用户列表
     * @param username
     * @param page
     * @return
     */
	List<User> selectListByName(String username, RowBounds page);

	/**
     * 根据用户名查询用户
     * @param username
     * @param page
     * @return
     */
	User selectByUsername(String username);
}
