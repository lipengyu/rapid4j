package com.v5ent.rapid4j.pattern;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class RegexParseLogTest {
	public static void main(String[] args) {
		//log4j.appender.FILE.layout.ConversionPattern=[%-5p] %d{yyyy-MM-dd HH\:mm\:ss} %C{8}@(%F\:%L)\:%m%n 
		//example:
		// [WARN ] 2016-03-11 15:51:51 net.sf.ehcache.config.CacheConfiguration@(CacheConfiguration.java:808):Cache 'null' is set to eternal but also has TTI/TTL set.  To avoid this warning, clean up the config removing conflicting values of eternal, TTI and TTL. Effective configuration for Cache 'null' will be eternal='true', timeToIdleSeconds='0', timeToLiveSeconds='0'.
	    String[] samples = {
	    	" [WARN ] 2016-03-11 15:51:51 net.sf.ehcache.config.CacheConfiguration@(CacheConfiguration.java:808):Cache 'null' is set to eternal but also has TTI/TTL set.  To avoid this warning, clean up the config removing conflicting values of eternal, TTI and TTL. Effective configuration for Cache 'null' will be eternal='true', timeToIdleSeconds='0', timeToLiveSeconds='0'."
//	        "1999-11-27 15:49:37,459 [thread-x] ERROR mypackage - Catastrophic system failure"
	    };

	    String regex = " \\[(.*) \\] (\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2}) ([^ ]*):(.*)$";
//	    String regex = "(\\d{4}-\\d{2}-\\d{2}) (\\d{2}:\\d{2}:\\d{2},\\d{3}) \\[(.*)\\] ([^ ]*) ([^ ]*) - (.*)$";

	    Pattern p = Pattern.compile(regex);
	    Matcher m = p.matcher(samples[0]);
	    if(m.matches()){
	    	for(int i =0;i<=m.groupCount();i++){
	    		System.out.println(m.group(i));
	    	}
	    }
	}
}
