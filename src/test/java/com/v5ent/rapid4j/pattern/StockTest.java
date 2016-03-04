package com.v5ent.rapid4j.pattern;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Observer;
import java.util.Random;

/**
 * American Stock Exchange market(ASE) has a list of stocks.A stock object has two perspective information,symbol and price.<br>
 * Class <b>StockMarket</b> is a class that represents the stock market.<br>
 * Its constructor generates a collection of stocks using random numbers to build 3-letter stock symbols and random numbers for initial stock price.<br>
 * Implement a Java application when the stock price has been changed,all those investors who are interested in the stock market will be notified by receiving the most recent price.<br>
 * Create a driver class to test your implementation.
 * @author Mignet
 *
 */
public class StockTest {
	public static void main(String[] args) {
		StockMarket market = new StockMarket(10);
		market.show();
		market.invest();
		market.shuffle();
		market.show();
	}
}

class StockMarket{
	private List<Stock> list;
	private int capacity;
	public StockMarket(int capacity){
		this.capacity=capacity;
		init(this.capacity);
	}
	private  List<Stock> init(int n){
		list= new ArrayList<Stock>();
		for(int i=0;i<n;i++){
			list.add(emitStock());
		}
		return list;
	}
	/**
	 * 股票看板
	 */
	public void show(){
		System.out.println("-------------Welcome to American Stock Exchange-------------------");
		for(Stock s:list){s.show();}
		System.out.println("------------------------------------------------------------------------");
	}
	/**
	 * 让投资人随机投资
	 */
	public void invest(){
        Investor inv1 = new Investor("巴菲特");
        Investor inv2 = new Investor("索罗斯");
        //让投资人随机投资
        for(Stock s:list){
        	//比如巴菲特只投资价格是偶数的股票
        	if(Math.round(s.price)%2==0){
        		s.addObserver(inv1);
        		System.out.println(String.format("[%s]投资了[%s]:[%.2f]", inv1.name,s.symbol,s.price));
        	}
        	//比如索罗斯只投资价格是3的倍数的股票
        	if(Math.round(s.price)%3==0){
        		s.addObserver(inv2);
        		System.out.println(String.format("[%s]投资了[%s]:[%.2f]", inv2.name,s.symbol,s.price));
        	}
        }
	}
	//生成随机股票
    private Stock emitStock() {  
        StringBuilder val = new StringBuilder();  Stock s;
        Random random = new Random();  
        for(int i = 0; i < 3; i++) {  
                int temp =  65;  //or 97
                val .append((char)(random.nextInt(26) + temp));  
        }
        s = new Stock(val.toString(),random.nextFloat()*100);  
        
        return s;
    }  
    
    public void shuffle(){
		for(Stock s:list){
			s.shuffle();
		}
	}
    
    class Stock extends Observable {
        public Stock(String symbol, float price) {
    		this.symbol=symbol;
    		this.price=price;
    	}
        public void show(){
        	System.out.println(String.format("[%s]:[%.2f]", this.symbol,this.price));
        }
    	private String symbol;
    	private float price;
        //价格随机波动
        public void shuffle(){
        	this.price = this.price+new Random().nextInt(10)-5;
        	this.setChanged();
        	this.notifyObservers();
        }
    }
    class Investor implements Observer{
    	public Investor(String name){
    		this.name = name;
    	}
    	private String name;
		@Override
		public void update(Observable o, Object arg) {
			Stock s = (Stock)o;
			System.out.println(String.format("[%s]获取到[%s]的最新价格[%.2f]",this.name, s.symbol,s.price));
		}
    	
    }
}