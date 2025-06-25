package fsa.training.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.*;

@Configuration
public class CorsConfig implements WebMvcConfigurer {

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**") // Cho phép mọi đường dẫn
                .allowedOrigins("http://localhost:3000") // Cho phép React gọi
                .allowedMethods("*")
                .allowedHeaders("*")
                .allowCredentials(true);
    }
}
