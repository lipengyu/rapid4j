package com.v5ent.rapid4j.plugin.jedis;

import java.io.Serializable;
import java.util.Date;

public class User  implements Serializable{
    /**
	 * 序列化
	 */
	private static final long serialVersionUID = 40904219175691506L;

	private Integer id;

    private String username;

    private String state;

    private Date createTime;

    private String description;

    public User(){
    }
    
	public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username == null ? null : username.trim();
    }

    public String getState() {
        return state;
    }

    public void setState(String state) {
        this.state = state == null ? null : state.trim();
    }

    public Date getCreateTime() {
        return createTime;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description == null ? null : description.trim();
    }
    
    @Override
    public String toString() {
        return "User [id=" + id + ", username=" + username + ", state=" + state + ", createTime=" + createTime + "]";
    }
}