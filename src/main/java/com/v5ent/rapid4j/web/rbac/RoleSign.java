package com.v5ent.rapid4j.web.rbac;

/**
 * 角色标识配置类, <br>
 * 与 role 角色表中的 role_sign 字段 相对应 <br>
 * 使用:
 * 
 * <pre>
 * &#064;RequiresRoles(value = RoleSign.ADMIN)
 * public String admin() {
 *     return &quot;拥有admin角色,能访问&quot;;
 * }
 * </pre>
 * 
 * @author Mignet
 * @since 2014年6月17日 下午3:58:51
 **/
public class RoleSign {

    /**
     * 普通后台管理员 标识
     */
    public static final String ADMIN = "admin";

    /**
     * 客户经理 标识
     */
    public static final String CONSULTANT = "consultant";

    /**
     * VIP客户 标识
     */
    public static final String VIP_USER = "vip_user";

    /**
     * 供应商 标识
     */
    public static final String SUPPLIER = "supplier";

    /**
     * 添加更多...
     */

}
