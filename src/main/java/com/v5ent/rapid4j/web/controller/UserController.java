package com.v5ent.rapid4j.web.controller;

import java.util.Date;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.apache.shiro.SecurityUtils;
import org.apache.shiro.authc.AuthenticationException;
import org.apache.shiro.authc.AuthenticationToken;
import org.apache.shiro.authc.ExcessiveAttemptsException;
import org.apache.shiro.authc.IncorrectCredentialsException;
import org.apache.shiro.authc.LockedAccountException;
import org.apache.shiro.authc.UnknownAccountException;
import org.apache.shiro.authc.UsernamePasswordToken;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.apache.shiro.authz.annotation.RequiresRoles;
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.alibaba.dubbo.common.utils.StringUtils;
import com.v5ent.rapid4j.core.entity.Result;
import com.v5ent.rapid4j.core.feature.orm.mybatis.Page;
import com.v5ent.rapid4j.web.model.User;
import com.v5ent.rapid4j.web.model.UserExample;
import com.v5ent.rapid4j.web.security.PermissionSign;
import com.v5ent.rapid4j.web.security.RoleSign;
import com.v5ent.rapid4j.web.service.UserService;

/**
 * 用户控制器
 * 
 * @author Mignet
 * @since 2014年5月28日 下午3:54:00
 **/
@Controller
@RequestMapping(value = "/user")
public class UserController {

	private static final Logger LOGGER = LoggerFactory.getLogger(UserController.class);
	
    @Resource
    private UserService userService;

    /**
     * 用户登录
     * 
     * @param user
     * @param result
     * @return
     */
    @RequestMapping(value = "/login", method = RequestMethod.POST)
    public String login(@Validated User user, BindingResult result, Model model, HttpServletRequest request) {
    	AuthenticationToken token =new UsernamePasswordToken(user.getUsername(), user.getPassword());
    	Subject currentUser = SecurityUtils.getSubject();
		// 已登陆 则跳到首页
		if (currentUser.isAuthenticated()) {
			return "redirect:/";
		}
		if (result.hasErrors()) {
			model.addAttribute("error", "参数错误！");
			return "login";
		}
        try {
            // 身份验证
            currentUser.login(token);
        }  catch ( UnknownAccountException uae ) {
        } catch ( IncorrectCredentialsException ice ) { 
        } catch ( LockedAccountException lae ) { 
        } catch ( ExcessiveAttemptsException eae ) { 
        }catch (AuthenticationException e) {
            // 身份验证失败
            model.addAttribute("error", "用户名或密码错误 ！");
            return "login";
        }
        // 验证成功在Session中保存用户信息
        final User authUserInfo = userService.selectByUsername(user.getUsername());
        Session session = currentUser.getSession(true);
        session.setAttribute("userInfo", authUserInfo);
        return "redirect:/";
    }

    /**
     * 用户登出
     * 
     * @param session
     * @return
     */
    @RequestMapping(value = "/logout", method = RequestMethod.GET)
    public String logout() {
    	Subject currentUser = SecurityUtils.getSubject();
    	Session session = currentUser.getSession();
        session.removeAttribute("userInfo");
        // 登出操作
        currentUser.logout();
        return "login";
    }

    /**
     * 基于角色 标识的权限控制案例
     */
    @RequestMapping(value = "/admin")
    @ResponseBody
    @RequiresRoles(value = RoleSign.ADMIN)
    public String admin() {
        return "拥有admin角色,能访问";
    }

    /**
     * 基于角色 比如拥有admin角色，才可以查看用户列表
     */
    @RequestMapping(value="",   method=RequestMethod.GET)  
    @RequiresRoles(value = RoleSign.ADMIN)
    public String users(Model model) {
    	/*UserExample example = new UserExample();
    	Page<User> page = new Page<User>(1,10);
    	List<User> users = userService.selectByExample(example,page);  
    	LOGGER.debug("userService.selectList() size:"+users);
    	model.addAttribute("users",users);*/
    	return "sys/user-list";
    }
    
    @RequestMapping(value="/list",   method=RequestMethod.GET)  
    @ResponseBody
    public Page<User> userLists(@RequestParam("pageNo") int pageNo,@RequestParam("pageSize") int pageSize) {
    	UserExample example = new UserExample();
    	Page<User> page = new Page<User>(pageNo,pageSize);
    	List<User> users = userService.selectByExample(example,page);  
    	LOGGER.debug("userService.selectList() size:"+users);
    	return page;
    }

    /**
     * 基于权限标识的权限控制案例<br>
     * 这里使用PUT请求并且路径是/{id}才是Restful的
     */
    @RequestMapping(value = "/create", method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions(value = PermissionSign.USER_CREATE)
    public Result create(User item) {
    	if(item.getId()==0){
	    	item.setCreateTime(new Date());
	    	int i = userService.insert(item);
	    	if(i==1){
	    		return new Result(true,"新增用户成功!");
	    	}else{
	    		return new Result(false,500,"新增失败");
	    	}
    	}else{
    		int i = userService.update(item);
	    	if(i==1){
	    		return new Result(true,"更新用户成功!");
	    	}else{
	    		return new Result(false,500,"更新失败");
	    	}
    	}
    }
    
    /**
     * 这里使用POST或者PATCH请求并且路径是/{id}才是Restful的
     * @param item
     * @return
     */
    @RequestMapping(value = "/update", method = RequestMethod.POST)
    @ResponseBody
    @RequiresPermissions(value = PermissionSign.USER_CREATE)
    public Result update(User item) {
    	int i = userService.update(item);
    	if(i==1){
    		return new Result(true,"更新用户成功!");
    	}else{
    		return new Result(false,500,"更新失败");
    	}
    }
    
    /**
     *  这里使用DELETE请求并且路径是/{id}才是Restful的
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseBody
    @RequiresPermissions(value = PermissionSign.USER_CREATE)
    public Result delete(@PathVariable("id") String id) {
    	User u  =userService.selectById(Long.valueOf(id));
    	Subject currentUser = SecurityUtils.getSubject();
    	if(currentUser.getPrincipal().equals(u.getUsername())){
    		return new Result(false,401,"不允许删除自己的用户!");
    	}
    	int i = userService.delete(Long.valueOf(id));
    	if(i==1){
    		return new Result(true,"删除用户成功!");
    	}else{
    		return new Result(false,500,"删除失败");
    	}
    }
    /**
     *  这里使用GET请求并且路径是/{id}才是Restful的
     * @param id
     * @return
     */
    @RequestMapping(value = "/{id}", method = RequestMethod.GET)
    @ResponseBody
    public User get(@PathVariable("id") String id) {
    	return userService.selectById(Long.valueOf(id));
    }
}
