package com.v5ent.rapid4j.test.dao;

import java.util.List;

import javax.annotation.Resource;

import org.junit.Test;

import com.v5ent.rapid4j.core.orm.paging.Page;
import com.v5ent.rapid4j.test.TestSupport;
import com.v5ent.rapid4j.web.dao.UserMapper;
import com.v5ent.rapid4j.web.model.User;

public class UserMapperTest extends TestSupport {
    @Resource
    private UserMapper userMapper;

    @Test
    public void test_selectByExampleAndPage() {
        start();
        Page<User> page = new Page<User>(1, 3);
        final List<User> users = userMapper.selectListByUsername("k", page);
        for (User user : users) {
            System.err.println(user);
        }
        end();
    }
}
