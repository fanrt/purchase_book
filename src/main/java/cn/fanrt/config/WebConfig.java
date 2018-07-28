package cn.fanrt.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.core.io.ClassPathResource;
import org.springframework.web.servlet.ViewResolver;
import org.springframework.web.servlet.config.annotation.DefaultServletHandlerConfigurer;
import org.springframework.web.servlet.config.annotation.EnableWebMvc;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurerAdapter;
import org.springframework.web.servlet.view.InternalResourceViewResolver;
import org.springframework.web.servlet.view.velocity.VelocityConfigurer;
import org.springframework.web.servlet.view.velocity.VelocityViewResolver;
import org.thymeleaf.spring4.SpringTemplateEngine;
import org.thymeleaf.templateresolver.ServletContextTemplateResolver;
import org.thymeleaf.templateresolver.TemplateResolver;

@Configuration
@EnableWebMvc
@ComponentScan("cn.fanrt")
public class WebConfig extends WebMvcConfigurerAdapter {

  @Bean
  public VelocityConfigurer viewResolver() {
    VelocityConfigurer velocityConfigurer = new VelocityConfigurer();
    velocityConfigurer.setResourceLoaderPath("/WEB-INF/views/");
    velocityConfigurer.setConfigLocation(new ClassPathResource("velocity.properties"));
    return velocityConfigurer;
  }

  @Bean
  public VelocityViewResolver templateResolver() {
    VelocityViewResolver velocityViewResolver = new VelocityViewResolver();
    velocityViewResolver.setPrefix("/");
    velocityViewResolver.setSuffix(".vm");
    velocityViewResolver.setCache(false);
    velocityViewResolver.setContentType("text/html;charset=utf-8");
    return velocityViewResolver;
  }
  
  @Override
  public void configureDefaultServletHandling(DefaultServletHandlerConfigurer configurer) {
    configurer.enable();
  }
  
  @Override
  public void addResourceHandlers(ResourceHandlerRegistry registry) {
    // TODO Auto-generated method stub
    super.addResourceHandlers(registry);
  }

}
