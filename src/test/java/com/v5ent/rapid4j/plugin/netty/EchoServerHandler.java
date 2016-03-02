package com.v5ent.rapid4j.plugin.netty;
  
  import io.netty.channel.ChannelHandler.Sharable;
  import io.netty.channel.ChannelHandlerAdapter;
  import io.netty.channel.ChannelHandlerContext;
  
  /**
   * Handler implementation for the echo server.
   */
  @Sharable
  public class EchoServerHandler extends ChannelHandlerAdapter {
  
      public void channelRead(ChannelHandlerContext ctx, Object msg) {
          ctx.write(msg);
      }
  
      public void channelReadComplete(ChannelHandlerContext ctx) {
          ctx.flush();
      }
  
      @Override
      public void exceptionCaught(ChannelHandlerContext ctx, Throwable cause) {
          // Close the connection when an exception is raised.
          cause.printStackTrace();
          ctx.close();
      }
  }