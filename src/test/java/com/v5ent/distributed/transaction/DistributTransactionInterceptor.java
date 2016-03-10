package com.v5ent.distributed.transaction;

import java.lang.annotation.Annotation;
import java.lang.reflect.Method;
import java.util.ArrayList;
import java.util.List;

import org.apache.curator.framework.CuratorFramework;
import org.apache.curator.framework.recipes.cache.PathChildrenCache;
import org.apache.curator.framework.recipes.cache.PathChildrenCacheEvent;
import org.apache.curator.framework.recipes.cache.PathChildrenCacheListener;
import org.apache.curator.utils.CloseableUtils;
import org.apache.curator.utils.EnsurePath;
import org.apache.log4j.Logger;
import org.aspectj.lang.JoinPoint;
import org.aspectj.lang.ProceedingJoinPoint;
import org.springframework.util.StringUtils;

import com.v5ent.rapid4j.jta.TransactionLock;
import com.v5ent.rapid4j.jta.TransactionUtils;

public class DistributTransactionInterceptor{
	
	private static Logger logger=Logger.getLogger(DistributTransactionInterceptor.class);
	
	private ZookeeperClient zookeeperClient;

	/**
	 *切面方式对启用分布式事务的方法管理机制 
	 */
	public Object doAround(ProceedingJoinPoint pjp) throws Throwable {
		 Object obj =null;
		//获取方法参数中是否有TransactionLock 对象参数
        Object[] args = pjp.getArgs();
        TransactionLock lock=null;
        if (args.length>0&&getControllerMethodDescription(pjp)) {
        	for(Object o:args){
        		if(o instanceof TransactionLock){
        			lock=(TransactionLock) o; 
        		}       		
        	}
        }
       
        if(lock!=null){
        	//有TransactionLock 加入zk事务控制
    		logger.debug("distribut transaction starting -->");
    		CuratorFramework client =zookeeperClient.getClient();
    		PathChildrenCache cache = null;
    		TransactionResult result=new TransactionResult();
    		String path=lock.getParent()+TransactionUtils.generatorTransactionPath();
    		EnsurePath ensurePath = client.newNamespaceAwareEnsurePath(path);
    		ensurePath.ensure(client.getZookeeperClient());  
			try {
				try {
					cache = pathChildrenCache(client, lock.getParent(), true, result, lock.getCount());
					cache.start(PathChildrenCache.StartMode.BUILD_INITIAL_CACHE);
					// 执行方法体
					obj = pjp.proceed(args);
					client.setData().forPath(path, "0".getBytes());
				} catch (Exception e) {
					logger.debug("distribut transaction for methed -->");
					try {
						client.setData().forPath(path, "-1".getBytes());
					} catch (Exception ex) {
						throw new DistributTransactionException(ex.getMessage());
					}
					throw new DistributTransactionException(e.getMessage());
				}
				long count = lock.getTimeout();

				while (!result.isEnd()) {
					count -= 200;
					try {
						Thread.sleep(200);
					} catch (InterruptedException e) {
					}
					if (count <= 0) {
						logger.debug("distribut transaction timeout -->");
						client.setData().forPath(path, "-2".getBytes());
						throw new DistributTransactionException("distribut transaction timeout rollback!");
					}
				}
				if (!result.isResult()) {
					throw new DistributTransactionException("distribut transaction exception rollback!");
				}
			} catch (Exception e) {
				throw new DistributTransactionException(e.getMessage());
			} finally {
				if(cache!=null){
					CloseableUtils.closeQuietly(cache);
					logger.debug("distribut transaction closed PathChildrenCacheListener -->");
				}
			}
    		logger.debug("distribut transaction end -->");	
        }else{
        	
        	obj = pjp.proceed(args);
        	logger.debug(" nothing distribut transaction -->");	
        	
        }        
		return obj;
	}
	
	/**
	 * 获取watcher实例
	 * @param path 事务监听节点
	 * @param result 事务结果
	 * @param transactionCount 参与本次事务的服务数量
	 * @throws Exception
	 */
	public static PathChildrenCache pathChildrenCache(CuratorFramework client, final String path, Boolean cacheData,final TransactionResult result, final int transactionCount) throws Exception {
		final PathChildrenCache cached = new PathChildrenCache(client, path, cacheData);
		cached.getListenable().addListener(new PathChildrenCacheListener() {
			@Override
			public void childEvent(CuratorFramework client, PathChildrenCacheEvent event) throws Exception {
				PathChildrenCacheEvent.Type eventType = event.getType();
				switch (eventType) {
				case CONNECTION_RECONNECTED:
					cached.rebuild();
					break;
				case CONNECTION_LOST:
					logger.debug("Connection error,waiting -->");
					break;
				default:
					List<String> list = client.getChildren().forPath(path);
					logger.debug("zk notify event "+event.getType().name()+" finish count is "+list.size()+"-->");
					if (list.size() == transactionCount) {
						List<String> datas=new ArrayList<String>(5);
						for (String str : list) {
							String data = new String(client.getData().forPath(path + "/" + str));
							logger.debug("zk notify event "+event.getType().name()+" finish data is "+data+"-->");
							datas.add(data);
							if (StringUtils.isEmpty(data)) {
								result.setEnd(false);
								return;
							}
						}
						result.setResult(true);
						result.setEnd(true);
						for (String data : datas) {
							if ("-1".equals(data)||"-2".equals(data)) {
								result.setResult(false);
								break;
							}
						}
					}
				}
			}
		});
		return cached;
	}

	public ZookeeperClient getZookeeperClient() {
		return zookeeperClient;
	}

	public void setZookeeperClient(ZookeeperClient zookeeperClient) {
		this.zookeeperClient = zookeeperClient;
	}
	/**
	 * 获取方法上是否有DistributTransaction注解
	 * @param joinPoint
	 * @return
	 * @throws Exception
	 */
	public  static boolean getControllerMethodDescription(JoinPoint joinPoint)  throws Exception {
        String targetName = joinPoint.getTarget().getClass().getName();
        String methodName = joinPoint.getSignature().getName();
        Object[] arguments = joinPoint.getArgs();
        Class targetClass = Class.forName(targetName);
        Method[] methods = targetClass.getMethods();
         for (Method method : methods) {
             if (method.getName().equals(methodName)) {
            	 Annotation[] annotations = method.getAnnotations();
                 for (Annotation annotation : annotations) {
                     if(annotation instanceof DistributTransaction){
                    	 return true;
                     }
                 }
            }
        }
         return false;
    }
}

