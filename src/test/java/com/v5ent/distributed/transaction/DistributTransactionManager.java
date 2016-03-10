package com.v5ent.distributed.transaction;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;

import org.apache.curator.framework.CuratorFramework;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.DisposableBean;

import com.v5ent.rapid4j.jta.TransactionHandler;
import com.v5ent.rapid4j.jta.TransactionLock;

/**
 * 分布式事务执行者
 * @author qhq
 *
 */
public class DistributTransactionManager implements DisposableBean{
	private static Logger logger=Logger.getLogger(DistributTransactionManager.class);
	
	private TransactionLock transactionLock;
	
	private CuratorFramework client;
	
	private List<TransactionHandler> transactionHandlers=new ArrayList<TransactionHandler>(5);
	
	private ExecutorService pool = Executors.newFixedThreadPool(4);
	
	public DistributTransactionManager(ZookeeperClient zkclient) {
		transactionLock=new TransactionLock();
		this.client=zkclient.getClient();
		
		transactionLock.setZkConnection(this.client.getZookeeperClient().getCurrentConnectionString());
	}
	
	
	public DistributTransactionManager pushTransactionHandler(TransactionHandler handler){
		transactionHandlers.add(handler);
		return this;
	}
	
	public void startTransaction(){
		transactionLock.setCount(transactionHandlers.size());
		try {
			for(int i=0;i<transactionHandlers.size();i++){
				final TransactionHandler handler=transactionHandlers.get(i);
				if(i==transactionHandlers.size()-1){
					handler.execute(transactionLock);
				}else{
					pool.execute(new Runnable() {					
						@Override
						public void run() {
							try {
								handler.execute(transactionLock);
							} catch (Exception e) {
								logger.debug("sync distribut transaction fail -->");
							}						
						}
					});
				}
			}
		} catch (Exception e) {
			 throw new DistributTransactionException(e.getMessage());
		}finally{
			try {
				if(client.checkExists().forPath(transactionLock.getParent())!=null){
					client.delete().deletingChildrenIfNeeded().forPath(transactionLock.getParent());
					logger.debug("delete distribut transaction success -->");
				}			
			} catch (Exception e) {
				 logger.debug("delete distribut transaction fail -->");
			}
		}	
	}


	@Override
	public void destroy() throws Exception {
		try {
			if(client.checkExists().forPath(transactionLock.getParent())!=null){
				client.delete().deletingChildrenIfNeeded().forPath(transactionLock.getParent());
				logger.debug("delete distribut transaction success -->");
			}			
		} catch (Exception e) {
			 logger.debug("delete distribut transaction fail -->");
		}
		
	}  
	
	public static DistributTransactionManager getDistributTransactionManager(){
		Object o=ZookeeperClient.getApplicationContext().getBean(DistributTransactionManager.class);
		return (DistributTransactionManager) o;
	}
}
