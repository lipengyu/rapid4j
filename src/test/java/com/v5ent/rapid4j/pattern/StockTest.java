package com.v5ent.rapid4j.pattern;

import java.util.ArrayList;
import java.util.List;
import java.util.Observable;
import java.util.Observer;
import java.util.Random;

/**
 * American Stock Exchange market(ASE) has a list of stocks.A stock object has two perspective information,symbol and price.<br>
 * Class <b>StockMarket</b> is a class that represents the stock market.<br>Its constructor generates a collection of stocks using random numbers to build 3-letter stock symbols and random numbers for initial stock price.<br>
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
	private List<Stock> list;private int capacity;
	public StockMarket(int capacity){
		this.capacity=capacity;
		init();
	}
	private  List<Stock> init(){
		list= new ArrayList<Stock>();
		for(int i=0;i<capacity;i++){
			list.add(emitStock());
		}
		return list;
	}
	public void show(){
		System.out.println("-------------Welcome to American Stock Exchange-------------------");
		for(Stock s:list){s.show();}
		System.out.println("------------------------------------------------------------------------");
	}
	public void invest(){
		//让投资人巴菲特随机投资
        Investor inv = new Investor("巴菲特");
        for(Stock s:list){
        	//比如只投资价格是偶数的股票
        	if(Math.round(s.price)%2==0){
        		s.addObserver(inv);
        		System.out.println(String.format("[%s]投资了[%s]:[%.2f]", inv.name,s.symbol,s.price));
        	}
        }
	}
	//生成随机股票
    public Stock emitStock() {  
        String val = "";  Stock s;
        Random random = new Random();  
        for(int i = 0; i < 3; i++) {  
                int temp =  65;  //or 97
                val += (char)(random.nextInt(26) + temp);  
        }
        s = new Stock(val,random.nextFloat()*100);  
        
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
    	private Float price;
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
    	String name;
		@Override
		public void update(Observable o, Object arg) {
			Stock s = (Stock)o;
			System.out.println(String.format("[%s]获取到最新价格[%s]:[%.2f]",this.name, s.symbol,s.price));
		}
    	
    }
}