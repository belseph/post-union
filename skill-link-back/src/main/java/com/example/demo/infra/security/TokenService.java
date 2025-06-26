package com.example.demo.infra.security;

import com.auth0.jwt.JWT;
import com.auth0.jwt.algorithms.Algorithm;
import com.auth0.jwt.exceptions.JWTCreationException;
import com.auth0.jwt.exceptions.JWTVerificationException;
import com.auth0.jwt.interfaces.DecodedJWT;
import com.example.demo.user.model.User;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;

@Service
public class TokenService {

    @Value("${jwt.secret}")
    private String secret;

    public String generateToken(User user){
        try{
            Algorithm algorithm = Algorithm.HMAC256(secret);
            return JWT.create()
                    .withIssuer("Skill Link Project")
                    .withClaim("id", user.getId())
                    .withClaim("role", user.getRole().toString())
                    .withExpiresAt(generateExpirationDate())
                    .sign(algorithm);
        }catch (JWTCreationException e){
            return null;
        }
    }

    public Long getUserId(String token){
        if(token == null){
            throw new RuntimeException("Token is null");
        }
        DecodedJWT verifier = null;
        try {
            Algorithm algorithm = Algorithm.HMAC256(secret);
            verifier = JWT.require(algorithm)
                    .withIssuer("Skill Link Project")
                    .build()
                    .verify(token);
        } catch (JWTVerificationException e) {
            System.out.println("JWT Verification Exception: " + e.getMessage());
            throw new RuntimeException("Invalid token: " + e.getMessage());
        }
        Long id = verifier.getClaim("id").asLong();
        if(id == null){
            throw new RuntimeException("Invalid token: User ID not found");
        }
        return id;
    }

    public Instant generateExpirationDate(){
        return LocalDateTime.now().plusHours(1).toInstant(ZoneOffset.of("-06:00"));
    }

}
