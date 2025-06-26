package com.example.demo.infra.security;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfigurationSource;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity(prePostEnabled = true)
public class SecurityConfig {

    @Autowired
    private SecurityFilter securityFilter;

    @Autowired
    private CorsConfigurationSource corsConfigurationSource;

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity httpSecurity) throws Exception{
        return httpSecurity
                .cors(cors -> cors.configurationSource(corsConfigurationSource))
                .csrf(csrf -> csrf.disable())
                .sessionManagement(sess -> sess.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                .authorizeHttpRequests(authorize -> authorize
                        // Swagger
                        .requestMatchers("/swagger-ui.html", "/v3/api-docs/**", "/swagger-ui/**", "/v3/api-docs/swagger-config", "/swagger-resources/**", "/webjars/**")
                        .permitAll()

                        // CORS preflight
                        .requestMatchers(HttpMethod.OPTIONS, "/**")
                        .permitAll()

                        // WEBSOCKET ENDPOINTS - Crítico para producción
                        .requestMatchers("/ws/**", "/ws-sockjs/**", "/app/**", "/topic/**", "/queue/**")
                        .permitAll()

                        // Endpoints públicos de autenticación
                        .requestMatchers(HttpMethod.POST, "/usuarios/login", "/usuarios/register")
                        .permitAll()

                        // Endpoints públicos de recuperación de contraseña
                        .requestMatchers(HttpMethod.POST, "/usuarios/recover-password", "/usuarios/reset-password")
                        .permitAll()
                        .requestMatchers(HttpMethod.GET, "/usuarios/validate-reset-token")
                        .permitAll()

                        // CHAT ENDPOINTS - Temporalmente públicos para pruebas
                        .requestMatchers("/api/conversaciones/**", "/api/mensajes/**")
                        .permitAll()

                        // POST ENDPOINTS - Temporalmente públicos para pruebas
                        .requestMatchers("/api/posts/**", "/api/comments/**", "/api/reactions/**")
                        .permitAll()

                        // Health check para Render
                        .requestMatchers(HttpMethod.GET, "/actuator/health", "/health")
                        .permitAll()

                        // Todo lo demás requiere autenticación
                        .anyRequest().authenticated())
                .addFilterBefore(securityFilter, UsernamePasswordAuthenticationFilter.class)
                .build();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception{
        return authenticationConfiguration.getAuthenticationManager();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }
}