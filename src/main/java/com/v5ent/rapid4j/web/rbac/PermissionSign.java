package com.v5ent.rapid4j.web.rbac;

/**
 * 权限标识配置类, <br>
 * 与 permission 权限表 中的 permission_sign 字段 相对应 <br>
 * 使用:
 * 
 * <pre>
 * &#064;RequiresPermissions(value = PermissionConfig.USER_CREATE)
 * public String create() {
 *     return &quot;拥有user:create权限,能访问&quot;;
 * }
 * </pre>
 * 
 * @author Mignet
 * @since 2014年6月17日 下午3:58:51
 **/
public class PermissionSign {

    /**
     * 用户新增权限 标识
     */
    public static final String USER_CREATE = Resource.USER+OperationType.CREATE;

    /**
     * 用户删除权限 标识
     */
    public static final String USER_DELETE = "user:delete";
    
    /**
     * 角色新增权限 标识
     */
    public static final String ROLE_CREATE = "role:create";

    /**
     * 角色删除权限 标识
     */
    public static final String ROLE_DELETE = "role:delete";

    /**
     * 添加更多...
     */

}
