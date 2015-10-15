package com.v5ent.rapid4j.web.controller;

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
import org.apache.shiro.session.Session;
import org.apache.shiro.subject.Subject;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import com.v5ent.rapid4j.web.model.User;
import com.v5ent.rapid4j.web.service.UserService;

/**
 * 权限控制器
 * 
 * @author Mignet
 * @since 2014年5月28日 下午3:54:00
 **/
@Controller  
@RequestMapping(value="/auth")  
public class AuthController {

	private static final Logger LOGGER = LoggerFactory.getLogger(AuthController.class);
	
//    @Resource
//    private MenuService menuService;
    
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
			LOGGER.debug("已登陆 则跳到首页");
			return "redirect:/";
		}
		if (result.hasErrors()) {
			model.addAttribute("error", "参数错误！");
			LOGGER.debug("参数错误");
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
        //通常这个时候会给出当前用户所属角色的菜单
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

}
